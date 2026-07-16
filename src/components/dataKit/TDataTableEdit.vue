<template>
  <DataTable ref="dtRef" :value="value" dataKey="id" v-model:selection="selectedItems" :size="sizeVal"
    stripedRows selection-mode="multiple" highlight-on-select
    :row-class="rowClass" class="dataTableWrapper w-full"
    :class="{ 'shadow-active': hasScrollOffset }" meta-key-selection>
    <Column selection-mode="multiple" header-style="width: 3rem" />
    <Column v-for="col in visibleColumns" :key="colKey(col)" :field="col.field" :header="col.header"
      :frozen="col.field === 'actions'" :align-frozen="col.field === 'actions' ? 'right' : undefined"
      :header-style="col.headerStyle">
      <template #body="slotProps">
        <template v-if="col.field === 'actions'">
          <slot name="opt-col" :data="slotProps.data">
            <div class="flex items-center justify-center gap-1">
              <Button icon="pi pi-trash" severity="danger" text rounded size="small"
                @click="onDeleteRow(slotProps.data)" />
            </div>
          </slot>
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import TEmptyData from '@/components/dataKit/TEmptyData.vue';
import type { ColumnProps } from 'primevue/column';

interface TDataTableEditProps {
  columns: ColumnProps[];
  visibleFields: string[];
  size?: 'small' | 'large';
  value: any[];
}

const props = defineProps<TDataTableEditProps>();
const emit = defineEmits<{
  deleteRow: [row: any];
}>();
const selectedItems = defineModel<any[]>('selection', { default: () => [] });

const sizeVal = computed(() => props.size);

const measuredItemSize = ref<number | null>(null);

const dtRef = ref<InstanceType<typeof DataTable> | null>(null);
const hasScrollOffset = ref(false);

const rowClass = (data: any) => {
  return selectedItems.value.some((item: any) => item.id === data.id) ? 'p-datatable-row-selected' : '';
};

const visibleColumns = computed(() =>
  props.columns.filter((col) => props.visibleFields.includes(colKey(col)))
);

const colKey = (col: { field?: string | ((item: any) => string) | undefined }): string => {
  return typeof col.field === 'string' ? col.field : '';
};

const onDeleteRow = (row: any) => {
  emit('deleteRow', row);
};

let scrollEl: HTMLElement | null = null;
let resizeObserver: ResizeObserver | null = null;

const onScroll = () => {
  hasScrollOffset.value = (scrollEl?.scrollLeft ?? 0) > 0;
};

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
  watch(() => props.size, () => { measuredItemSize.value = null; measureRowHeight(); });
  watch(() => props.value, () => { measuredItemSize.value = null; measureRowHeight(); });
  const root = document.querySelector('.p-datatable') as HTMLElement | null;
  if (root) {
    resizeObserver = new ResizeObserver(() => { });
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

.shadow-active :deep(.p-datatable-frozen-column) {
  transition: box-shadow 200ms ease;
  box-shadow: -4px 0 9px -4px rgba(0, 0, 0, 0.15);
}

:root.dark .shadow-active :deep(.p-datatable-frozen-column) {
  box-shadow: -4px 0 9px -4px rgba(0, 0, 0, 0.35);
}

:deep(.p-datatable-frozen-column .p-datatable-column-header-content) {
  justify-content: center !important;
}

.p-datatable :deep(.p-datatable-column-header-content) {
  justify-content: center;
}

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

.p-datatable :deep(.p-datatable-scrollable-table td:has(.flex)),
.p-datatable :deep(.p-datatable-frozen td:has(.flex)) {
  overflow: visible;
  text-overflow: clip;
}

.dataTableWrapper.is-empty :deep(.p-virtualscroller) {
  overflow-y: hidden !important;
}

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
