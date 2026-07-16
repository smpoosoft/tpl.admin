<template>
  <div class="dataTableWrapper">
    <DataTable ref="dtRef" :value="value" dataKey="id" v-model:selection="selectedItems" :size="sizeVal"
      stripedRows scrollable :scroll-height="scrollHeight" selection-mode="multiple"
      :row-class="rowClass" class="w-full" :class="{ 'shadow-active': hasScrollOffset }"
      meta-key-selection @row-click="onRowClick">
      <Column selection-mode="multiple" header-style="width: 64px; min-width: 64px" />
      <Column v-for="col in visibleColumns" :key="colKey(col)" :field="col.field" :header="col.header"
        :frozen="col.field === 'actions'" :align-frozen="col.field === 'actions' ? 'right' : undefined"
        :style="getColumnStyle(col)">
        <template #body="slotProps">
          <template v-if="col.field === 'attachment'">
            <TIcon name="attachment" :size="14" class="attachmentIcon" />
          </template>
          <template v-else-if="col.field === 'actions'">
            <slot name="opt-col" :data="slotProps.data">
              <div class="flex items-center justify-center gap-1 actions-cell">
                <Button icon="pi pi-trash" severity="danger" text rounded size="small"
                  @click="onDeleteRow(slotProps.data)" />
              </div>
            </slot>
          </template>
          <template v-else-if="col.editType">
            <component :is="getCellComponent(col.editType).component"
              v-model="slotProps.data[colKey(col)]"
              v-bind="{ ...getCellComponent(col.editType).defaultProps, ...getCellProps(col) }"
              fluid
            />
          </template>
          <template v-else>
            {{ slotProps.data[colKey(col)] }}
          </template>
        </template>
      </Column>

      <template #empty>
        <TEmptyData description="暂无数据，点击新增按钮添加" />
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import TEmptyData from '@/components/dataKit/TEmptyData.vue';
import TIcon from '@/components/widget/TIcon.vue';
import type { ColumnProps } from 'primevue/column';
import type { TFormItemType } from '@/components/formKit/TForm/types';
import { useFormTableCell } from '@/components/formKit/TForm/useFormTableCell';

export interface TDataTableEditColumn extends ColumnProps {
  editType?: TFormItemType;
  editProps?: Record<string, any>;
  width?: number;
}

interface TDataTableEditProps {
  columns: TDataTableEditColumn[];
  visibleFields: string[];
  size?: 'small' | 'large';
  value: any[];
  maxHeight?: string;
}

const ROW_HEIGHT_SMALL = 36;
const ROW_HEIGHT_LARGE = 44;
const HEADER_HEIGHT = 40;
const SCROLLBAR_EXTRA = 2;

const props = withDefaults(defineProps<TDataTableEditProps>(), {
  maxHeight: '480px'
});
const emit = defineEmits<{
  deleteRow: [row: any];
  update: [data: any[]];
}>();
const selectedItems = defineModel<any[]>('selection', { default: () => [] });

const sizeVal = computed(() => props.size);

const dtRef = ref<InstanceType<typeof DataTable> | null>(null);
const hasScrollOffset = ref(false);

const rowHeight = computed(() => sizeVal.value === 'small' ? ROW_HEIGHT_SMALL : ROW_HEIGHT_LARGE);

const scrollHeight = computed(() => {
  const contentH = HEADER_HEIGHT + props.value.length * rowHeight.value + SCROLLBAR_EXTRA;
  const maxH = parseInt(props.maxHeight);
  return Math.min(contentH, maxH) + 'px';
});

const rowClass = (data: any) => {
  return selectedItems.value.some((item: any) => item.id === data.id) ? 'p-datatable-row-selected' : '';
};

const visibleColumns = computed(() =>
  props.columns.filter((col) => props.visibleFields.includes(colKey(col)))
);

const colKey = (col: { field?: string | ((item: any) => string) | undefined }): string => {
  return typeof col.field === 'string' ? col.field : '';
};

const getColumnStyle = (col: TDataTableEditColumn) => {
  if (col.field === 'actions' || col.field === 'attachment') return { width: '64px', minWidth: '64px' };
  if (col.width) return { width: col.width + 'px', minWidth: col.width + 'px' };
  return { minWidth: '64px' };
};

const getCellComponent = (type: TFormItemType) => {
  return useFormTableCell(type);
};

const getCellProps = (col: TDataTableEditColumn) => {
  return col.editProps;
};

const onDeleteRow = (row: any) => {
  emit('deleteRow', row);
};

const onRowClick = (event: any) => {
  const isCheckbox = event.originalEvent.target.closest('.p-checkbox');
  if (!isCheckbox) {
    nextTick(() => {
      selectedItems.value = selectedItems.value.filter((item: any) => item.id !== event.data.id);
    });
  }
};

let scrollContainer: HTMLElement | null = null;

const onScroll = () => {
  hasScrollOffset.value = (scrollContainer?.scrollLeft ?? 0) > 0;
};

onMounted(() => {
  scrollContainer = dtRef.value?.$el?.querySelector('.p-datatable-table-container') as HTMLElement | null;
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', onScroll);
  }
});

onUnmounted(() => {
  scrollContainer?.removeEventListener('scroll', onScroll);
});
</script>

<style lang="scss" scoped>
.dataTableWrapper {
  width: 100%;
  overflow: hidden;
}

.dataTableWrapper:deep(.p-datatable-scrollable-table) {
  table-layout: fixed;
}

.dataTableWrapper:deep(.p-datatable-scrollable-body) {
  overflow-x: auto;
  overflow-y: auto;
}

.dataTableWrapper:deep(.p-datatable-scrollable-body::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

.dataTableWrapper:deep(.p-datatable-scrollable-body::-webkit-scrollbar-track) {
  background: transparent;
}

.dataTableWrapper:deep(.p-datatable-scrollable-body::-webkit-scrollbar-thumb) {
  background: var(--p-surface-300);
  border-radius: 3px;
}

:root.dark .dataTableWrapper:deep(.p-datatable-scrollable-body::-webkit-scrollbar-thumb) {
  background: var(--p-surface-600);
}

.dataTableWrapper:deep(.p-datatable-scrollable-body::-webkit-scrollbar-thumb:hover) {
  background: var(--p-surface-400);
}

.shadow-active:deep(.p-datatable-frozen-column) {
  transition: box-shadow 200ms ease;
  box-shadow: -4px 0 9px -4px rgba(0, 0, 0, 0.15);
}

:root.dark .shadow-active:deep(.p-datatable-frozen-column) {
  box-shadow: -4px 0 9px -4px rgba(0, 0, 0, 0.35);
}

.dataTableWrapper:deep(.p-datatable-frozen-column .p-datatable-column-header-content) {
  justify-content: center !important;
}

.dataTableWrapper:deep(.p-datatable-column-header-content) {
  justify-content: center;
}

.dataTableWrapper:deep(.p-datatable-scrollable-table td),
.dataTableWrapper:deep(.p-datatable-scrollable-table th),
.dataTableWrapper:deep(.p-datatable-frozen td),
.dataTableWrapper:deep(.p-datatable-frozen th) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dataTableWrapper:deep(.p-datatable-scrollable-table td:has(.flex)),
.dataTableWrapper:deep(.p-datatable-frozen td:has(.flex)),
.dataTableWrapper:deep(.p-datatable-scrollable-table td:has(.attachmentIcon)),
.dataTableWrapper:deep(.p-datatable-frozen td:has(.attachmentIcon)) {
  overflow: visible;
  text-overflow: clip;
}

.dataTableWrapper:deep(.p-datatable tbody td) {
  padding: 4px 8px;
}

.dataTableWrapper:deep(.p-datatable tbody td .p-inputtext),
.dataTableWrapper:deep(.p-datatable tbody td .p-select),
.dataTableWrapper:deep(.p-datatable tbody td .p-autocomplete),
.dataTableWrapper:deep(.p-datatable tbody td .p-datepicker),
.dataTableWrapper:deep(.p-datatable tbody td .p-inputnumber) {
  min-width: 0;
  width: 100%;
}

.dataTableWrapper:deep(.p-datatable-table-container tbody tr) {
  cursor: default;
}

.dataTableWrapper:deep(.p-datatable-row-selected) {
  color: var(--p-primary-50) !important;
  background-color: var(--p-primary-900) !important;
}

:root.dark .dataTableWrapper:deep(.p-datatable-row-selected) {
  background-color: color-mix(in srgb, var(--p-primary-400) 40%, transparent) !important;
}

.actions-cell:deep(.p-button) {
  outline: none !important;
  box-shadow: none !important;
}

.actions-cell:deep(.p-button:focus-visible) {
  outline: none !important;
  box-shadow: none !important;
}
</style>
