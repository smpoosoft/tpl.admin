<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">透视报表</span>
    </template>

    <div class="p2">
      <Panel header="分析配置" class="mb-4">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">行维度</label>
            <Select
              v-model="selectedRows"
              :options="ANALYSIS_CONFIG.rows"
              multiple
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">列维度</label>
            <Select
              v-model="selectedCols"
              :options="ANALYSIS_CONFIG.cols"
              multiple
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">值字段</label>
            <Select
              v-model="selectedValues"
              :options="ANALYSIS_CONFIG.values"
              multiple
              class="w-full"
            />
          </div>
        </div>
        <div class="mt-3">
          <Button label="生成报表" icon="pi pi-chart-bar" @click="generatePivot" />
        </div>
      </Panel>

      <DataTable
        :value="pivotData"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        class="w-full"
      >
        <Column
          v-for="col in pivotColumns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        >
          <template #body="slotProps">
            <span v-if="col.type === 'number'" class="font-medium">
              {{ formatNumber(slotProps.data[col.field]) }}
            </span>
            <span v-else>
              {{ slotProps.data[col.field] }}
            </span>
          </template>
        </Column>
      </DataTable>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { ANALYSIS_CONFIG, SALES_DATA } from '@/mock/reportData.ts';

interface PivotColumn {
  field: string;
  header: string;
  type: 'dimension' | 'number';
}

const selectedRows = ref<string[]>([...ANALYSIS_CONFIG.rows]);
const selectedCols = ref<string[]>([...ANALYSIS_CONFIG.cols]);
const selectedValues = ref<string[]>([...ANALYSIS_CONFIG.values]);

const pivotColumns = ref<PivotColumn[]>([]);
const pivotData = ref<Record<string, string | number>[]>([]);

const dimLabelMap: Record<string, string> = {
  category: '分类',
  region: '区域',
  product: '产品',
  date: '日期'
};

const valueLabelMap: Record<string, string> = {
  amount: '金额',
  qty: '数量',
  sales: '销量',
  profit: '利润',
  stock: '库存'
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
}

function generatePivot(): void {
  const rows = selectedRows.value;
  const cols = selectedCols.value;
  const values = selectedValues.value;

  const cols_ = cols.length > 0 ? cols : ['__total__'];
  const groupMap = new Map<string, Record<string, number>>();

  for (const record of SALES_DATA) {
    const rowKeyParts = rows.map((r) => (record as any)[r] ?? '合计');
    const rowKey = rowKeyParts.join('|');

    for (const col of cols_) {
      const colVal = col === '__total__' ? '合计' : ((record as any)[col] ?? '合计');

      for (const val of values) {
        const mapKey = `${colVal}|${val}`;
        if (!groupMap.has(rowKey)) {
          groupMap.set(rowKey, {});
        }
        const row = groupMap.get(rowKey)!;
        row[mapKey] = (row[mapKey] ?? 0) + ((record as any)[val] ?? 0);
      }
    }
  }

  const columns: PivotColumn[] = [];
  for (const row of rows) {
    columns.push({ field: `__dim_${row}`, header: dimLabelMap[row] ?? row, type: 'dimension' });
  }

  const colValues = new Set<string>();
  for (const record of SALES_DATA) {
    for (const col of cols_) {
      const colVal = col === '__total__' ? '合计' : ((record as any)[col] ?? '合计');
      colValues.add(colVal);
    }
  }
  const sortedColValues = Array.from(colValues).sort();

  for (const colVal of sortedColValues) {
    for (const val of values) {
      columns.push({
        field: `${colVal}|${val}`,
        header: `${colVal} - ${valueLabelMap[val] ?? val}`,
        type: 'number'
      });
    }
  }

  const data: Record<string, string | number>[] = [];
  for (const [rowKey, row] of groupMap) {
    const rowParts = rowKey.split('|');
    const entry: Record<string, string | number> = {};
    for (let i = 0; i < rows.length; i++) {
      entry[`__dim_${rows[i]}`] = rowParts[i];
    }
    for (const colVal of sortedColValues) {
      for (const val of values) {
        const mapKey = `${colVal}|${val}`;
        entry[mapKey] = row[mapKey] ?? 0;
      }
    }
    data.push(entry);
  }

  pivotColumns.value = columns;
  pivotData.value = data;
}

generatePivot();
</script>

<style scoped></style>