<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">透视报表</span>
    </template>

    <div class="analysis-report">
      <!-- 配置面板 -->
      <Panel class="config-panel">
        <template #header>
          <div class="config-panel-header">
            <span class="pi pi-sliders-h config-panel-icon"></span>
            <span>分析配置</span>
          </div>
        </template>

        <div class="config-grid">
          <!-- 行维度 -->
          <div class="dimension-group">
            <label class="dimension-label">
              <span class="dimension-indicator dimension-indicator--row"></span>
              <span>行维度</span>
              <span class="dimension-count">{{ selectedRows.length }}</span>
            </label>
            <Select
              v-model="selectedRows"
              :options="ANALYSIS_CONFIG.rows"
              multiple
              class="w-full"
              placeholder="选择行维度"
            />
          </div>

          <!-- 列维度 -->
          <div class="dimension-group">
            <label class="dimension-label">
              <span class="dimension-indicator dimension-indicator--col"></span>
              <span>列维度</span>
              <span class="dimension-count">{{ selectedCols.length }}</span>
            </label>
            <Select
              v-model="selectedCols"
              :options="ANALYSIS_CONFIG.cols"
              multiple
              class="w-full"
              placeholder="选择列维度"
            />
          </div>

          <!-- 值字段 -->
          <div class="dimension-group">
            <label class="dimension-label">
              <span class="dimension-indicator dimension-indicator--val"></span>
              <span>值字段</span>
              <span class="dimension-count">{{ selectedValues.length }}</span>
            </label>
            <Select
              v-model="selectedValues"
              :options="ANALYSIS_CONFIG.values"
              multiple
              class="w-full"
              placeholder="选择值字段"
            />
          </div>
        </div>

        <div class="config-actions">
          <Button
            label="生成报表"
            icon="pi pi-chart-bar"
            class="generate-btn"
            @click="generatePivot"
          />
        </div>
      </Panel>

      <!-- 报表表格 -->
      <Panel class="report-panel">
        <template #header>
          <div class="report-panel-header">
            <span class="pi pi-table report-panel-icon"></span>
            <span>报表结果</span>
            <span v-if="pivotData.length > 0" class="report-count">
              共 {{ pivotColumns.length }} 列 | {{ pivotData.length }} 行
            </span>
          </div>
        </template>

        <div v-if="pivotData.length === 0" class="empty-state">
          <span class="pi pi-chart-bar empty-state-icon"></span>
          <span class="empty-state-text">请配置维度并点击"生成报表"</span>
        </div>

        <DataTable
          v-else
          :value="pivotData"
          stripedRows
          paginator
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          class="pivot-table"
          :size="'small'"
        >
          <Column
            v-for="col in pivotColumns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
          >
            <template #body="slotProps">
              <span
                v-if="col.type === 'number'"
                class="data-cell-numeric"
                :class="{ 'data-cell-zero': slotProps.data[col.field] === 0 }"
              >
                {{ formatNumber(slotProps.data[col.field]) }}
              </span>
              <span v-else class="data-cell-dimension">
                {{ slotProps.data[col.field] }}
              </span>
            </template>
          </Column>
        </DataTable>
      </Panel>
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

<style scoped>
.analysis-report {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}

/* ── Config panel ── */
.config-panel {
  flex-shrink: 0;
}

.config-panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
}

.config-panel-icon {
  font-size: 14px;
  color: var(--p-primary-color);
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.dimension-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dimension-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--p-text-muted-color);
}

.dimension-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

.dimension-indicator--row {
  background: #6366f1;
}

.dimension-indicator--col {
  background: #22c55e;
}

.dimension-indicator--val {
  background: #f59e0b;
}

.dimension-count {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 600;
  background: var(--p-primary-color);
  color: var(--p-primary-contrast-color);
  line-height: 1;
}

.config-actions {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--p-content-border-color);
}

.generate-btn {
  width: 100%;
  justify-content: center;
}

/* ── Report panel ── */
.report-panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.report-panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
}

.report-panel-icon {
  font-size: 14px;
  color: var(--p-primary-color);
}

.report-count {
  margin-left: auto;
  font-size: 12px;
  font-weight: 400;
  color: var(--p-text-muted-color);
}

/* ── Empty state ── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 64px 16px;
  color: var(--p-text-muted-color);
}

.empty-state-icon {
  font-size: 48px;
  opacity: 0.3;
}

.empty-state-text {
  font-size: 14px;
}

/* ── Pivot table ── */
.pivot-table {
  width: 100%;
}

.data-cell-dimension {
  font-weight: 500;
  color: var(--p-text-color);
}

.data-cell-zero {
  color: var(--p-text-muted-color);
  opacity: 0.5;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .config-grid {
    grid-template-columns: 1fr;
  }
}
</style>