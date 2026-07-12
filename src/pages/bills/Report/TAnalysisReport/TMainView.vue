<template>
  <TRouterPanel :imt>
    <div class="p2">
      <Panel header="分析配置" class="mb-3">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block mb-1 text-sm font-medium">行维度</label>
            <Select v-model="config.rows" :options="dimensionOptions" multiple optionLabel="label" optionValue="value"
              class="w-full" placeholder="选择行维度" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium">列维度</label>
            <Select v-model="config.cols" :options="dimensionOptions" multiple optionLabel="label" optionValue="value"
              class="w-full" placeholder="选择列维度" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium">值字段</label>
            <Select v-model="config.values" :options="valueOptions" multiple optionLabel="label" optionValue="value"
              class="w-full" placeholder="选择值字段" />
          </div>
        </div>
        <div class="flex items-center gap-3 mt-3">
          <Button label="生成报表" icon="pi pi-chart-bar" @click="generatePivot" />
          <span v-if="reportGenerated" class="text-sm text-surface-400">
            共 {{ pivotData.length }} 组汇总
          </span>
        </div>
      </Panel>

      <DataTable v-if="pivotData.length" :value="pivotData" stripedRows paginator :rows="10"
        :rowsPerPageOptions="[5, 10, 20]" dataKey="__key" class="w-full"
        :paginatorTemplate="'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport'"
        :currentPageReportTemplate="'共 {totalRecords} 条记录'">
        <Column v-for="col in pivotColumns" :key="col.key" :field="col.key" :header="col.label">
          <template v-if="col.isValue" #body="slotProps">
            {{ col.valueType === 'amount' ? formatCurrency(slotProps.data[col.key]) : slotProps.data[col.key] }}
          </template>
        </Column>
      </DataTable>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import TRouterPanel from '@/components/layer/TLayerRouter.vue';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { ANALYSIS_CONFIG, SALES_DATA } from '@/mock/reportData.ts';

interface PivotColumn {
  key: string;
  label: string;
  isValue: boolean;
  valueType?: string;
}

const dimensionOptions = [
  { label: '产品分类', value: 'category' },
  { label: '区域', value: 'region' },
  { label: '日期', value: 'date' }
];

const valueOptions = [
  { label: '金额', value: 'amount' },
  { label: '数量', value: 'qty' }
];

const config = reactive({
  rows: [...ANALYSIS_CONFIG.rows],
  cols: [...ANALYSIS_CONFIG.cols],
  values: [...ANALYSIS_CONFIG.values]
});

const pivotColumns = ref<PivotColumn[]>([]);
const pivotData = ref<Record<string, string | number>[]>([]);
const reportGenerated = ref(false);

const VALUE_LABELS: Record<string, string> = {
  amount: '金额',
  qty: '数量'
};

const DIMENSION_LABELS: Record<string, string> = {
  category: '产品分类',
  region: '区域',
  date: '日期'
};

function generatePivot(): void {
  const rows = config.rows;
  const cols = config.cols;
  const vals = config.values;

  if (!rows.length || !vals.length) {
    return;
  }

  // Build column definitions
  const columns: PivotColumn[] = [];
  rows.forEach((r) => {
    columns.push({ key: r, label: DIMENSION_LABELS[r] || r, isValue: false });
  });
  cols.forEach((c) => {
    columns.push({ key: c, label: DIMENSION_LABELS[c] || c, isValue: false });
  });
  vals.forEach((v) => {
    columns.push({ key: v, label: VALUE_LABELS[v] || v, isValue: true, valueType: v });
  });
  pivotColumns.value = columns;

  // Group by ALL dimensions (rows + cols) and aggregate values
  const allDims = [...rows, ...cols];
  const groups = new Map<string, Record<string, string | number>>();

  for (const item of SALES_DATA) {
    const keyParts = allDims.map((d) => item[d as keyof typeof item]);
    const key = keyParts.join('|');

    if (!groups.has(key)) {
      const group: Record<string, string | number> = { __key: key };
      allDims.forEach((d) => {
        group[d] = item[d as keyof typeof item] as string;
      });
      vals.forEach((v) => {
        group[v] = 0;
      });
      groups.set(key, group);
    }

    const group = groups.get(key)!;
    vals.forEach((v) => {
      group[v] = (group[v] as number) + (item[v as keyof typeof item] as number);
    });
  }

  pivotData.value = Array.from(groups.values());
  reportGenerated.value = true;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0
  }).format(amount);
}
import * as imt from './imt';
</script>

<style scoped></style>
