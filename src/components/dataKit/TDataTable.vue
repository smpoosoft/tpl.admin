<template>
  <DataTable ref="dtRef" :value="value" dataKey="id" v-model:selection="selectedItems" :size scrollable
    scrollHeight="flex" stripedRows sort-mode="multiple" removable-sort selection-mode="multiple" highlight-on-select
    resizable-columns column-resize-mode="expand" :row-class="rowClass" :virtual-scroller-options="{ itemSize: 49 }"
    :class="['w-full', { 'shadow-active': hasScrollOffset }]" style="container-type: size; height: 100%"
    @row-dblclick="onRowDblClick">
    <Column selection-mode="multiple" header-style="width: 3rem" />
    <Column v-for="col in visibleColumns" :key="colKey(col)" :field="col.field" :header="col.header" sortable
      :frozen="col.field === 'actions'" :align-frozen="col.field === 'actions' ? 'right' : undefined"
      :header-style="col.headerStyle">
      <template #body="slotProps">
        <template v-if="col.field === 'name'">
          <div class="flex items-center gap-2">
            <span
              class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold bg-primary-100 text-primary-600">{{
                slotProps.data.avatar }}</span>
            <span class="font-medium">{{ slotProps.data.name }}</span>
            <span class="text-sm text-surface-500">{{ slotProps.data.id }}</span>
          </div>
        </template>
        <template v-else-if="col.field === 'tag'">
          <Tag :value="slotProps.data.tag" :severity="tagSeverity(slotProps.data.tagClass)" />
        </template>
        <template v-else-if="col.field === 'actions'">
          <slot name="opt-col" :data="slotProps.data">
            <div class="flex items-center justify-center gap-1">
              <Button icon="pi pi-pencil" severity="secondary" text rounded size="small" />
              <Button icon="pi pi-trash" severity="danger" text rounded size="small" />
            </div>
          </slot>
        </template>
        <template v-else>
          {{ slotProps.data[colKey(col)] }}
        </template>
      </template>
    </Column>

    <template #empty>
      <TEmptyData description="暂无数据" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
// ===== 外部依赖 =====
import { ref, computed, onMounted, onUnmounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import TEmptyData from '@/components/dataKit/TEmptyData.vue';
import type { ColumnProps } from 'primevue/column';

// ===== Props & 事件 =====
interface TDataTableProps {
  columns: ColumnProps[];
  visibleFields: string[];
  size?: string;
  value: any[];
  /** 隐藏操作列 */
  hideOptCol?: boolean;
}

const props = defineProps<TDataTableProps>();
const emit = defineEmits<{
  rowDblClick: [row: any];
}>();
const selectedItems = defineModel<any[]>('selection', { default: () => [] });

// ===== 内部状态 =====
// DataTable 实例引用（用于滚动检测）、水平滚动偏移标记
const dtRef = ref<InstanceType<typeof DataTable> | null>(null);
const hasScrollOffset = ref(false);

// 通过 row-class 回调为选中行添加高亮 class（虚拟滚动下 PrimeVue 不自动追加）
const rowClass = (data: any) => {
  return selectedItems.value.some((item: any) => item.id === data.id) ? 'p-datatable-row-selected' : '';
};

// ===== 计算属性 =====
// 根据 visibleFields 过滤出可见列，hideOptCol 时排除 actions 列
const visibleColumns = computed(() =>
  props.columns.filter((col) => {
    if (props.hideOptCol && colKey(col) === 'actions') return false;
    return props.visibleFields.includes(colKey(col));
  })
);

// ===== 标签 severity 映射 =====
// tagClass → PrimeVue Tag severity 的转换表
const TAG_SEVERITY_MAP: Record<string, string> = {
  'tag-vip': 'warn',
  'tag-new': 'info',
  'tag-regular': 'success',
  'tag-lost': 'danger',
  'tag-intent': 'contrast'
};

const tagSeverity = (tagClass: string): string => {
  return TAG_SEVERITY_MAP[tagClass] ?? 'secondary';
};

// ===== 工具函数 =====
// 从 ColumnProps 中提取 field 字符串（排除 function 和 undefined 类型）
const colKey = (col: { field?: string | ((item: any) => string) | undefined }): string => {
  return typeof col.field === 'string' ? col.field : '';
};

// 行双击事件：向上抛出当前行数据
const onRowDblClick = (event: any) => {
  emit('rowDblClick', event.data as any);
};

// ===== 水平滚动检测 =====
// 监听 VirtualScroller 的 scroll 事件，偏移量 > 0 时冻结列显示阴影
let scrollEl: HTMLElement | null = null;

const onScroll = () => {
  hasScrollOffset.value = (scrollEl?.scrollLeft ?? 0) > 0;
};

onMounted(() => {
  scrollEl = document.querySelector('.p-datatable .p-virtualscroller') as HTMLElement | null;
  if (scrollEl) {
    scrollEl.addEventListener('scroll', onScroll);
  }
});

onUnmounted(() => {
  scrollEl?.removeEventListener('scroll', onScroll);
});
</script>

<style lang="scss" scoped>
/* 冻结列阴影：仅在水平滚动后才显示 */
.shadow-active :deep(.p-datatable-frozen-column) {
  transition: box-shadow 200ms ease;
  box-shadow: -4px 0 9px -4px rgba(0, 0, 0, 0.15);
}

:root.dark .shadow-active :deep(.p-datatable-frozen-column) {
  box-shadow: -4px 0 9px -4px rgba(0, 0, 0, 0.35);
}

/* 操作列表头居中 */
:deep(.p-datatable-frozen-column .p-datatable-column-header-content) {
  justify-content: center !important;
}

/* 操作列表头居中 */
.p-datatable :deep(.p-datatable-column-header-content) {
  justify-content: center;
}

/* 列宽规则：有 headerStyle.width 的列溢出省略，无宽度的列自适应内容 */
.p-datatable :deep(.p-datatable-scrollable-table) {
  table-layout: auto;
}

.p-datatable :deep(.p-datatable-scrollable-table td),
.p-datatable :deep(.p-datatable-scrollable-table th),
.p-datatable :deep(.p-datatable-frozen td),
.p-datatable :deep(.p-datatable-frozen th) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* flex 布局列（客户、操作）不受溢出省略影响 */
.p-datatable :deep(.p-datatable-scrollable-table td:has(.flex)),
.p-datatable :deep(.p-datatable-frozen td:has(.flex)) {
  overflow: visible;
  text-overflow: clip;
}

/* 行悬停 + 选择色 */
:deep(.p-datatable-table-container .p-virtualscroller .p-datatable-table tbody tr),
:deep(.p-datatable-frozen tbody tr) {
  transition: background-color 150ms ease;
}

:deep(.p-datatable-table-container .p-virtualscroller .p-datatable-table tbody tr:hover),
:deep(.p-datatable-frozen tbody tr:hover) {
  background-color: var(--p-primary-100);
}

:deep(.p-datatable-row-selected) {
  color: var(--p-primary-50) !important;
  background-color: var(--p-primary-900) !important;
}

:root.dark :deep(.p-datatable-table-container .p-virtualscroller .p-datatable-table tbody tr:hover),
:root.dark :deep(.p-datatable-frozen tbody tr:hover) {
  background-color: color-mix(in srgb, var(--p-primary-800) 30%, transparent);
}

:root.dark :deep(.p-datatable-row-selected) {
  background-color: color-mix(in srgb, var(--p-primary-400) 40%, transparent) !important;
}
</style>
