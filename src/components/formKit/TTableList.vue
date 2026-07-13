<template>
  <div class="tableListWrapper fullWH" data-fs-bg>
    <div class="tableListHeader flexY gapX1">
      <Tabs :value="activeFilter" @update:value="(val) => $emit('update:activeFilter', val as string)">
        <TabList>
          <Tab v-for="tab in filterTabs" :key="tab.key" :value="tab.key">
            {{ tab.label }} ({{ tab.count }})
          </Tab>
        </TabList>
      </Tabs>
      <span class="flexSplit"></span>
      <ButtonGroup>
        <Button size="small" @click="tableSize = 'large'">大</Button>
        <Button size="small" @click="tableSize = 'normal'">中</Button>
        <Button size="small" @click="tableSize = 'small'">小</Button>
        <Button size="small" @click="autoColsWidth">列宽匹配</Button>
      </ButtonGroup>

      <TSearchBar :model-value="searchKeyword" @update:model-value="(val) => $emit('update:searchKeyword', val)" />
      <Button iconOnly variant="outlined" size="small" @click="setCols">
        <TIcon name="columnsSet" :size="16" clickAble />
      </Button>
      <Popover ref="popoverRef" class="w-72" pt:content="p-0!">
        <div
          class="flex items-center justify-between gap-2 px-4 py-3 border-b border-surface-200 dark:border-surface-700">
          <span class="text-sm font-semibold">列选择</span>
          <Button type="button" variant="text" size="small" severity="secondary" @click="reset">
            <TIcon name="refresh" :size="16" />
            重置
          </Button>
        </div>
        <div class="py-2 max-h-80 overflow-auto" @dragover.prevent @drop="onColDrop">
          <div v-for="(col, index) of columns" :key="colKey(col)"
            class="flex items-center gap-2 px-3 py-1.5 mx-1 rounded-md cursor-move select-none transition-drop" :class="[
              dragIndex === index ? 'opacity-40' : '',
              dragOverIndex === index && dragIndex !== index ? 'drop-target' : 'hover:bg-surface-100 dark:hover:bg-surface-800'
            ]" draggable="true" @dragstart="onColDragStart($event, index)"
            @dragover.prevent="onColDragOver($event, index)" @dragend="onColDragEnd"
            @dragenter.prevent="onColDragEnter($event, index)">
            <span class="flex text-surface-400 dark:text-surface-500">
              <i class="pi pi-bars" />
            </span>
            <Checkbox v-model="visibleFields" :value="colKey(col)" :inputId="colKey(col)" />
            <label :for="colKey(col)" class="text-sm cursor-pointer">{{ col.header }}</label>
          </div>
        </div>
      </Popover>
      <Button iconOnly variant="outlined" size="small" @click="setFullScreen">
        <TIcon :name="isFullScreen ? 'fullScreenExit' : 'fullScreen'" :size="16" clickAble />
      </Button>
    </div>

    <div class="tableListContent">
      <TDataTable v-model:selection="selectedItems" :columns :visible-fields="visibleFields" :value="dataList"
        :size="tableSize" :hide-opt-col="hideOptCol" @row-dbl-click="(row) => $emit('rowDblClick', row)">
        <template #opt-col="{ data }">
          <slot name="opt-col" :data="data" />
        </template>
      </TDataTable>
    </div>

    <div class="tableListFooter flexY">
      <div class="footerLeft">
        共 {{ totalCount }} 条记录，已选 {{ selectedItems.length }} 项
      </div>
      <span class="flexSplit"></span>
      <span class="footerRight">占位</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== 外部依赖 =====
import { ref, onMounted, onUnmounted } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TSearchBar from '@/components/dataKit/TSearchBar.vue';
import Button from 'primevue/button';
import ButtonGroup from 'primevue/buttongroup';
import TIcon from '@/components/widget/TIcon.vue';
import Popover from 'primevue/popover';
import Checkbox from 'primevue/checkbox';
import TDataTable from '@/components/dataKit/TDataTable.vue';
import type { ColumnProps } from 'primevue/column';

// ===== Props 定义 =====
interface TTableListProps {
  filterTabs: { key: string; label: string; count: number }[];
  dataList: any[];
  totalCount: number;
  defaultColumns: ColumnProps[];
  activeFilter: string;
  searchKeyword: string;
  /** 隐藏操作列 */
  hideOptCol?: boolean;
}

// ===== Props 实例化 & 事件 =====
const props = defineProps<TTableListProps>();

defineEmits<{
  (e: 'update:activeFilter', value: string): void;
  (e: 'update:searchKeyword', value: string): void;
  (e: 'rowDblClick', row: any): void;
}>();

// ===== 内部状态 =====
// 表格行高尺寸（small / normal / large），由顶部按钮组控制
const tableSize = ref<'large' | 'normal' | 'small'>('normal');
// 列定义（支持拖拽重排）、可见列 field 集合、行选择结果
const columns = ref<ColumnProps[]>([...props.defaultColumns]);
const visibleFields = ref<string[]>(props.defaultColumns.map(col => col.field as string));
const selectedItems = ref<any[]>([]);

// UI 引用：列设置弹窗、拖拽状态、全屏状态
const popoverRef = ref<InstanceType<typeof Popover> | null>(null);
const dragIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);
const isFullScreen = ref(false);

// ===== 列拖拽重排 =====
// 基于 HTML5 Drag and Drop API，重排逻辑在 drop 事件中执行
const onColDragStart = (event: DragEvent, index: number) => {
  dragIndex.value = index;
  event.dataTransfer!.effectAllowed = 'move';
  const el = event.currentTarget as HTMLElement | null;
  if (el) {
    event.dataTransfer!.setDragImage(el, event.offsetX, event.offsetY);
  }
};

const onColDragEnter = (event: DragEvent, index: number) => {
  event.preventDefault();
  if (dragIndex.value !== null && dragIndex.value !== index) {
    dragOverIndex.value = index;
  }
};

const onColDragOver = (event: DragEvent, index: number) => {
  event.preventDefault();
  event.dataTransfer!.dropEffect = 'move';
  if (dragIndex.value !== null && dragIndex.value !== index) {
    dragOverIndex.value = index;
  }
};

const onColDrop = (event: DragEvent) => {
  event.preventDefault();
  if (dragIndex.value !== null && dragOverIndex.value !== null && dragIndex.value !== dragOverIndex.value) {
    const item = columns.value.splice(dragIndex.value, 1)[0]!;
    columns.value.splice(dragOverIndex.value, 0, item);
  }
  dragIndex.value = null;
  dragOverIndex.value = null;
};

const onColDragEnd = () => {
  dragIndex.value = null;
  dragOverIndex.value = null;
};

const setCols = (e: MouseEvent | TouchEvent) => {
  popoverRef.value?.toggle?.(e);
};

const reset = () => {
  visibleFields.value = props.defaultColumns.map(col => col.field as string);
  columns.value = [...props.defaultColumns];
};

const colKey = (col: { field?: string | ((item: any) => string) | undefined }): string => {
  return typeof col.field === 'string' ? col.field : '';
};

const setFullScreen = () => {
  const el = document.querySelector('.tableListWrapper') as HTMLElement | null;
  if (!el) return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    el.requestFullscreen();
  }
};

const autoColsWidth = () => {
  columns.value = columns.value.map((col) => {
    if (!col.headerStyle) return col;
    const { width: __, ...rest } = col.headerStyle;
    return { ...col, headerStyle: Object.keys(rest).length ? rest : {} };
  });
  // 清除拖拽列宽时 PrimeVue 写入的内联 width
  document.querySelectorAll('.p-datatable-header-cell, .p-datatable-frozen-column').forEach((el) => {
    (el as HTMLElement).style.width = '';
  });
  document.querySelectorAll('.p-datatable-table td, .p-datatable-frozen td').forEach((el) => {
    (el as HTMLElement).style.width = '';
  });
};

const onFullScreenChange = () => {
  isFullScreen.value = !!document.fullscreenElement;
};

onMounted(() => {
  document.addEventListener('fullscreenchange', onFullScreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFullScreenChange);
});
</script>

<style lang="scss" scoped>
.tableListWrapper {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}

.tableListHeader {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.tableListContent {
  min-height: 0;
  overflow: hidden;
}

.tableListFooter {
  display: flex;
  align-items: center;
  padding: 4px 0;
  font-size: 12px;
  color: var(--p-text-muted-color);
}

.transition-drop {
  transition: transform 150ms ease, opacity 150ms ease, background-color 150ms ease;
}

.drop-target {
  background-color: var(--p-primary-50);
  outline: 2px dashed var(--p-primary-400);
  outline-offset: -2px;
}

:root.dark .drop-target {
  background-color: color-mix(in srgb, var(--p-primary-900) 30%, transparent);
}
</style>
