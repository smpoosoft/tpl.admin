<template>
  <div ref="wrapperRef" class="tableListWrapper fullWH" data-fs-bg>
    <div class="tableListHeader flexY gapX1">
      <Tabs v-if="!disableFastDataTypeFilter" :value="activeFilter"
        @update:value="(val) => $emit('update:activeFilter', val as string)">
        <TabList>
          <Tab v-for="tab in filterTabs" :key="tab.key" :value="tab.key">
            {{ tab.label }} ({{ tab.count }})
          </Tab>
        </TabList>
      </Tabs>
      <span class="flexSplit"></span>

      <TSearchBar :model-value="searchKeyword" @update:model-value="(val) => $emit('update:searchKeyword', val)"
        @onFilterMore="showFilterForm = true" />
      <Button iconOnly variant="outlined" size="small" v-tooltip.top="'列设置'" @click="setCols">
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
      <Button iconOnly variant="outlined" size="small" v-tooltip.top="'切换全屏'" @click="setFullScreen">
        <TIcon :name="isFullScreen ? 'fullScreenExit' : 'fullScreen'" :size="16" clickAble />
      </Button>
      <Button iconOnly variant="outlined" size="small" v-tooltip.top="'滚动到最左边'" @click="scrollXLeft">
        <TIcon name="prev" :size="16" clickAble />
      </Button>
      <Button iconOnly variant="outlined" size="small" v-tooltip.top="'滚动到最右边'" @click="scrollXRight">
        <TIcon name="next" :size="16" clickAble />
      </Button>
    </div>

    <div ref="tableContentRef" class="tableListContent">
      <TDataTable v-model:selection="selectedItems" :columns :visible-fields="visibleFields" :value="dataList"
        :size="tableSize" :hide-opt-col="hideOptCol" :footers="footers"
        @row-dbl-click="(row) => $emit('rowDblClick', row)">
        <template #opt-col="{ data }">
          <slot name="opt-col" :data="data" />
        </template>
      </TDataTable>
    </div>

    <div class="tableListFooter flexY">
      <span class="selectTools flexXY handLike gapX1">
        <span @click="selectAll">全选</span>
        <span @click="clearSelection">取消</span>
        <span @click="invertSelection">反选</span>
      </span>
      <Divider layout="vertical" class="mX2" />
      <div class="footerLeft fontW4">
        共 {{ totalCount }} 条记录，已选 {{ selectedItems.length }} 项
      </div>
      <span class="flexSplit"></span>
      <TFastDateFilter v-if="!disableFastDateFilter" v-model="dateFilterRange" />
    </div>

    <template>
      <div class="flex justify-center">
        <Dialog v-model:visible="showFilterForm" dismissableMask draggable modal header="Edit Profile"
          :style="{ width: '28rem' }">
          <div class="flex flex-col gap-6">
            <slot name="filterForm"></slot>
          </div>
        </Dialog>
      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
import type { ColumnProps } from 'primevue/column';
import type { TTableSize } from '@/types/uiKite';
import { ref, onMounted, onUnmounted } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TSearchBar from '@/components/dataKit/TSearchBar.vue';
import Button from 'primevue/button';
import TFastDateFilter from '@/components/homeKit/TFastDateFilter.vue';
import TIcon from '@/components/widget/TIcon.vue';
import Divider from 'primevue/divider';
import Popover from 'primevue/popover';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import TDataTable from '@/components/dataKit/TDataTable.vue';

// ===== Props 定义 =====
interface TTableListProps {
  filterTabs: { key: string; label: string; count: number }[];
  dataList: any[];
  totalCount: number;
  defaultColumns: ColumnProps[];
  activeFilter: string;
  searchKeyword: string;
  /** 表格行高尺寸 */
  tableSize?: TTableSize
  /** 隐藏操作列 */
  hideOptCol?: boolean;
  /** 合计行：field -> 合计值 */
  footers?: Record<string, string | number>;
  /** 是否禁用快速数据类型筛选条 */
  disableFastDataTypeFilter?: boolean;
  /** 是否禁用快速日期筛选条 */
  disableFastDateFilter?: boolean;
}

// ===== Props 实例化 & 事件 =====
const props = defineProps<TTableListProps>();

defineEmits<{
  (e: 'update:activeFilter', value: string): void;
  (e: 'update:searchKeyword', value: string): void;
  (e: 'rowDblClick', row: any): void;
}>();

// ===== 内部状态 =====
// 表格行高尺寸（small / undefined / large），由顶部按钮组控制
// 列定义（支持拖拽重排）、可见列 field 集合、行选择结果
const columns = ref<ColumnProps[]>([...props.defaultColumns]);
const visibleFields = ref<string[]>(props.defaultColumns.map(col => col.field as string));
const selectedItems = ref<any[]>([]);
const dateFilterRange = ref<[string, string] | undefined>();
const showFilterForm = ref(false);

// ===== 选择操作（全选 / 取消 / 反选） =====
/** 全选：将当前 dataList 中所有行加入选中集合 */
const selectAll = () => {
  selectedItems.value = [...props.dataList];
};
/** 取消选择：清空选中集合 */
const clearSelection = () => {
  selectedItems.value = [];
};
/** 反选：对 dataList 中的所有行执行选中状态取反 */
const invertSelection = () => {
  const selectedIds = new Set(selectedItems.value.map((i: any) => i.id));
  selectedItems.value = props.dataList.filter((i: any) => !selectedIds.has(i.id));
};

// UI 引用：弹窗、拖拽状态、全屏状态、容器 ref
const popoverRef = ref<InstanceType<typeof Popover> | null>(null);
const dragIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);
const isFullScreen = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);
const tableContentRef = ref<HTMLElement | null>(null);

// ===== 列拖拽重排 =====
// 基于 HTML5 Drag and Drop API，重排逻辑在 drop 事件中执行
/** 拖拽开始：记录起始列索引，设置拖拽鬼影与允许 move 效果 */
const onColDragStart = (event: DragEvent, index: number) => {
  dragIndex.value = index;
  event.dataTransfer!.effectAllowed = 'move';
  const el = event.currentTarget as HTMLElement | null;
  if (el) {
    event.dataTransfer!.setDragImage(el, event.offsetX, event.offsetY);
  }
};

/** 拖拽进入：阻止默认行为，记录悬停的目标列索引 */
const onColDragEnter = (event: DragEvent, index: number) => {
  event.preventDefault();
  if (dragIndex.value !== null && dragIndex.value !== index) {
    dragOverIndex.value = index;
  }
};

/** 拖拽经过：阻止默认行为以允许 drop，标记 dropEffect 与目标列索引 */
const onColDragOver = (event: DragEvent, index: number) => {
  event.preventDefault();
  event.dataTransfer!.dropEffect = 'move';
  if (dragIndex.value !== null && dragIndex.value !== index) {
    dragOverIndex.value = index;
  }
};

/** 拖拽释放：将起始列插入到目标索引位置，完成重排 */
const onColDrop = (event: DragEvent) => {
  event.preventDefault();
  if (dragIndex.value !== null && dragOverIndex.value !== null && dragIndex.value !== dragOverIndex.value) {
    const item = columns.value.splice(dragIndex.value, 1)[0]!;
    columns.value.splice(dragOverIndex.value, 0, item);
  }
  dragIndex.value = null;
  dragOverIndex.value = null;
};

/** 拖拽结束：清空拖拽状态（覆盖正常结束与异常中止两种情况） */
const onColDragEnd = () => {
  dragIndex.value = null;
  dragOverIndex.value = null;
};

/** 切换列设置 Popover 的显示/隐藏 */
const setCols = (e: MouseEvent | TouchEvent) => {
  popoverRef.value?.toggle?.(e);
};

/** 重置列显隐与顺序到 defaultColumns 初始状态 */
const reset = () => {
  visibleFields.value = props.defaultColumns.map(col => col.field as string);
  columns.value = [...props.defaultColumns];
};

/** 取列的 field 字符串；field 为函数或未定义时返回空串 */
const colKey = (col: { field?: string | ((item: any) => string) | undefined }): string => {
  return typeof col.field === 'string' ? col.field : '';
};

/** 切换全屏：进入则 requestFullscreen，已在全屏则 exitFullscreen */
const setFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    wrapperRef.value?.requestFullscreen();
  }
};

/** 将表格水平滚动条平滑移到最左端 */
const scrollXLeft = () => {
  const el = tableContentRef.value?.querySelector('.p-virtualscroller');
  if (!el) return;
  el.scrollTo({ left: 0, behavior: 'smooth' });
};

/** 将表格水平滚动条平滑移到最右端 */
const scrollXRight = () => {
  const el = tableContentRef.value?.querySelector('.p-virtualscroller');
  if (!el) return;
  el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
};

/** 全屏状态变化回调：根据 document.fullscreenElement 同步 isFullScreen */
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

.selectTools {
  >span {
    color: var(--p-primary-500);
    transition: color 150ms ease;

    &:hover {
      font-weight: 500;
      color: var(--p-primary-900);
    }
  }
}

:root.dark .selectTools>span:hover {
  color: var(--p-primary-300);
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
