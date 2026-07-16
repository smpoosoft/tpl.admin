<template>
  <DataTable ref="dtRef" :value="value" dataKey="id" v-model:selection="selectedItems" :size="sizeVal" scrollable
    scrollHeight="flex" stripedRows sort-mode="multiple" removable-sort selection-mode="multiple" highlight-on-select
    :row-class="rowClass" :virtual-scroller-options="vsOptions" class="dataTableWrapper fullH"
    :class="['w-full', { 'shadow-active': hasScrollOffset, 'is-empty': value.length === 0 }]" style="container-type: size; height: 100%"
    @row-dblclick="onRowDblClick">
    <Column v-if="!hideRowCheckBox" selection-mode="multiple" header-style="width: 3rem" />
    <Column v-for="col in visibleColumns" :key="colKey(col)" :field="col.field" :header="col.header" sortable
      :frozen="col.field === 'actions'" :align-frozen="col.field === 'actions' ? 'right' : undefined"
      :header-style="col.headerStyle" :footer="footerFor(col)">
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
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
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
  size?: 'small' | 'large';
  value: any[];
  /** 隐藏操作列 */
  hideOptCol?: boolean;
  /** 合计行：field -> 合计值；仅渲染其中的可见列，其余列空占位 */
  footers?: Record<string, string | number>;
  /** 隐藏行选择复选框 */
  hideRowCheckBox?: boolean;
}

const props = defineProps<TDataTableProps>();
const emit = defineEmits<{
  rowDblClick: [row: any];
}>();
const selectedItems = defineModel<any[]>('selection', { default: () => [] });

// ===== size 归一化 =====
// 对外支持 'small' | 'large'（默认档不传），统一成 PrimeVue 的 size 取值
const sizeVal = computed(() => props.size);

// size → itemSize 初始映射（基于 aura theme 的 padding + 1px border + line-height 估算）
// small: padding 0.125rem*2≈4px + border 1px + line-height 20px ≈ 25px
// 默认:  padding 0.5rem*2≈16px + border 1px + line-height 20px ≈ 37px
// large: padding 0.75rem*2≈24px + border 1px + line-height 20px ≈ 45px
const SIZE_ITEM_SIZE: Record<string, number> = { small: 25, large: 45 };
const initialItemSize = computed(() => SIZE_ITEM_SIZE[props.size ?? ''] ?? 37);

// 挂载后实测到的真实行高（覆盖初始估算值，消除抖动）
const measuredItemSize = ref<number | null>(null);
const itemSize = computed(() => measuredItemSize.value ?? initialItemSize.value);
const vsOptions = computed(() => ({ itemSize: itemSize.value }));

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

// 是否显示合计行：footers 已传且至少有一个可见列在 footers 中
const hasFooter = computed(
  () => !!props.footers && visibleColumns.value.some((c) => typeof props.footers![colKey(c)] !== 'undefined')
);

// 返回某列的合计文案：可见且在 footers 中返回字符串值，其余空占位；未启用合计行时返回 undefined
const footerFor = (col: ColumnProps): string | undefined => {
  if (hasFooter.value) {
    const v = props.footers?.[colKey(col)];
    return !v ? '' : String(v);
  }
};

// 合计行合并：合计行前 N 个单元格（选择列存在时为 3，否则为 2）合并成“合计”单元格
const mergeFooterCells = () => {
  if (!hasFooter.value) return;
  nextTick(() => {
    const root = (dtRef.value as any)?.$el as HTMLElement | null;
    if (!root) return;
    // scrollable 表 + frozen 表的 footer 都需合并
    const rows = Array.from(root.querySelectorAll('.p-datatable-tfoot tr')) as HTMLTableRowElement[];
    for (const tr of rows) {
      const cells = Array.from(tr.children) as HTMLTableCellElement[];
      if (cells.length === 0) continue;
      // 选择列存在 → footer 格数 = 数据列数 + 1
      const hasSelection = cells.length === visibleColumns.value.length + 1;
      const mergeN = hasSelection ? 3 : 2;
      if (cells.length < mergeN) continue;
      // 已合并过的不再处理（cells[0] 带有 colspan）
      if (cells[0]!.hasAttribute('colspan')) continue;
      const first = cells[0]!;
      first.textContent = '合计';
      first.setAttribute('colspan', String(mergeN));
      tr.classList.add('mergeTextCell');
      for (let k = 1; k < mergeN; k++) cells[k]?.remove();
    }
  });
};

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
let resizeObserver: ResizeObserver | null = null;

const onScroll = () => {
  hasScrollOffset.value = (scrollEl?.scrollLeft ?? 0) > 0;
};

// 实测首行真实高度，校正 itemSize（消除初始估算误差 + 内容撑高如 w-8 头像）
const measureRowHeight = () => {
  nextTick(() => {
    const row = document.querySelector('.p-datatable .p-virtualscroller tbody tr') as HTMLElement | null;
    if (row && row.offsetHeight > 0) {
      measuredItemSize.value = row.offsetHeight;
    }
  });
};

onMounted(() => {
  scrollEl = document.querySelector('.p-datatable .p-virtualscroller') as HTMLElement | null;
  if (scrollEl) {
    scrollEl.addEventListener('scroll', onScroll);
  }
  measureRowHeight();
  mergeFooterCells();
  // size 切换 / 数据变化后重测行高 + 重新合并合计行
  watch(sizeVal, () => { measuredItemSize.value = null; measureRowHeight(); mergeFooterCells(); });
  watch(() => props.value, () => { measuredItemSize.value = null; measureRowHeight(); mergeFooterCells(); });
  watch([hasFooter, visibleColumns], () => mergeFooterCells());
  // 监听容器尺寸变化，触发重绘
  const root = document.querySelector('.p-datatable') as HTMLElement | null;
  if (root) {
    resizeObserver = new ResizeObserver(() => {
      // 触发重绘
    });
    resizeObserver.observe(root);
  }
});

onUnmounted(() => {
  scrollEl?.removeEventListener('scroll', onScroll);
  resizeObserver?.disconnect();
});
</script>

<style lang="scss" scoped>
.dataTableWrapper {
  container-type: size;
}

/* 冻结列阴影：仅在水平滚动后才显示 */
.shadow-active :deep(.p-datatable-frozen-column) {
  transition: box-shadow 200ms ease;
  box-shadow: -4px 0 9px -4px rgba(0, 0, 0, 0.15);
}

/* 合计行整行样式锚点（类挂在 footer 的 <tr> 上）—— 在此改造其样式 */
:deep(.mergeTextCell) {
  font-size: 12px;
  font-weight: 300;
}

/* 合并单元格居中 */
:deep(.mergeTextCell td[colspan]) {
  text-align: center;
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

.widthFit {
  width: auto !important;
  min-width: 0 !important;
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

/* 空数据时隐藏虚拟滚动条的滑块（保留占位防止布局偏移） */
.dataTableWrapper.is-empty :deep(.p-virtualscroller) {
  overflow-y: hidden !important;
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
