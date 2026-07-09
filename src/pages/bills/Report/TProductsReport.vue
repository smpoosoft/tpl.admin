<template>
  <TRouterPanel>
    <template #header>
      <div class="flex flex-col gap-1">
        <span class="text-lg font-bold text-surface-900 dark:text-surface-100">数据报表</span>
        <span class="text-xs text-surface-400 dark:text-surface-500">产品维度统计与销售明细</span>
      </div>
    </template>

    <div class="p-4">
      <!-- Stat Cards -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div
          v-for="(stat, index) in PRODUCT_STATS"
          :key="index"
          class="premium-stat-card"
        >
          <div class="flex items-start justify-between mb-2">
            <span class="stat-label">{{ stat.label }}</span>
            <span
              class="trend-badge"
              :class="stat.trendUp ? 'trend-up' : 'trend-down'"
            >
              <i
                class="pi"
                :class="stat.trendUp ? 'pi-arrow-up' : 'pi-arrow-down'"
              ></i>
              {{ stat.trend }}
            </span>
          </div>
          <div class="stat-value">{{ stat.value }}</div>
        </div>
      </div>

      <!-- DataTable -->
      <div class="table-wrapper">
        <DataTable
          :value="productData"
          stripedRows
          paginator
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20]"
          dataKey="id"
          class="premium-table w-full"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="第 {currentPage} / {totalPages} 页，共 {totalRecords} 条"
        >
          <Column field="name" header="产品名称">
            <template #body="slotProps">
              <div class="flex items-center gap-2">
                <div class="product-icon">
                  <i class="pi pi-box text-surface-400"></i>
                </div>
                <span class="font-medium text-surface-800 dark:text-surface-200">{{ slotProps.data.name }}</span>
              </div>
            </template>
          </Column>
          <Column field="sales" header="销量">
            <template #body="slotProps">
              <div class="flex flex-col gap-1">
                <span class="font-semibold text-surface-800 dark:text-surface-200">{{ formatCurrency(slotProps.data.sales) }}</span>
                <div class="sales-bar-bg">
                  <div
                    class="sales-bar-fill"
                    :style="{ width: calcSalesPercent(slotProps.data.sales) + '%' }"
                  ></div>
                </div>
              </div>
            </template>
          </Column>
          <Column field="stock" header="库存">
            <template #body="slotProps">
              <div class="flex items-center gap-2">
                <span class="stock-dot" :class="getStockLevel(slotProps.data.stock)"></span>
                <span class="text-surface-700 dark:text-surface-300">{{ slotProps.data.stock }}</span>
              </div>
            </template>
          </Column>
          <Column field="profit" header="利润">
            <template #body="slotProps">
              <span class="font-semibold text-green-600 dark:text-green-400">{{ formatCurrency(slotProps.data.profit) }}</span>
            </template>
          </Column>
          <Column header="利润率">
            <template #body="slotProps">
              <Tag
                :value="calcProfitRate(slotProps.data.profit, slotProps.data.sales)"
                :severity="getProfitRateSeverity(slotProps.data.profit, slotProps.data.sales)"
                class="profit-tag"
              />
            </template>
          </Column>
          <Column field="category" header="分类">
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.category"
                severity="info"
                class="category-tag"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { PRODUCT_STATS, PRODUCT_DATA } from '@/mock/reportData.ts';

const productData = ref(PRODUCT_DATA);

const maxSales = Math.max(...PRODUCT_DATA.map((d) => d.sales));

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0
  }).format(amount);
}

function calcProfitRate(profit: number, sales: number): string {
  if (sales === 0) {return '0%';}
  return ((profit / sales) * 100).toFixed(1) + '%';
}

function getProfitRateSeverity(profit: number, sales: number): 'success' | 'warn' | 'danger' {
  if (sales === 0) {return 'danger';}
  const rate = profit / sales;
  if (rate >= 0.3) {return 'success';}
  if (rate >= 0.2) {return 'warn';}
  return 'danger';
}

function calcSalesPercent(sales: number): number {
  if (maxSales === 0) {return 0;}
  return (sales / maxSales) * 100;
}

function getStockLevel(stock: number): string {
  if (stock >= 500) {return 'stock-high';}
  if (stock >= 200) {return 'stock-mid';}
  return 'stock-low';
}
</script>

<style scoped>
/* ── Stat Cards ── */
.premium-stat-card {
  background: var(--p-surface-card, #ffffff);
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.premium-stat-card:hover {
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

:root.dark .premium-stat-card {
  background: var(--p-surface-card, #1e1e2e);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--p-text-muted-color, #64748b);
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--p-text-color, #1e293b);
  letter-spacing: -0.02em;
}

:root.dark .stat-value {
  color: var(--p-text-color, #e2e8f0);
}

.trend-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
}

.trend-up {
  color: #16a34a;
  background: #f0fdf4;
}

:root.dark .trend-up {
  background: rgba(22, 163, 74, 0.15);
}

.trend-down {
  color: #dc2626;
  background: #fef2f2;
}

:root.dark .trend-down {
  background: rgba(220, 38, 38, 0.15);
}

.trend-badge .pi {
  font-size: 10px;
}

/* ── Table Wrapper ── */
.table-wrapper {
  background: var(--p-surface-card, #ffffff);
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

:root.dark .table-wrapper {
  background: var(--p-surface-card, #1e1e2e);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
}

/* ── Product Icon ── */
.product-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--p-surface-100, #f1f5f9);
}

:root.dark .product-icon {
  background: var(--p-surface-700, #334155);
}

/* ── Sales Progress Bar ── */
.sales-bar-bg {
  width: 100px;
  height: 4px;
  border-radius: 2px;
  background: var(--p-surface-200, #e2e8f0);
  overflow: hidden;
}

:root.dark .sales-bar-bg {
  background: var(--p-surface-600, #475569);
}

.sales-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  transition: width 0.3s ease;
}

/* ── Stock Dot ── */
.stock-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stock-high {
  background: #22c55e;
}

.stock-mid {
  background: #eab308;
}

.stock-low {
  background: #ef4444;
}

/* ── Tags ── */
.profit-tag {
  font-weight: 600;
}

.category-tag {
  font-weight: 500;
}

/* ── PrimeVue DataTable Overrides ── */
:deep(.premium-table .p-datatable-header) {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 16px 20px;
}

:deep(.premium-table .p-datatable-thead > tr > th) {
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--p-text-muted-color, #64748b);
  background: var(--p-surface-50, #f8fafc);
  border-bottom: 1px solid var(--p-surface-200, #e2e8f0);
}

:root.dark :deep(.premium-table .p-datatable-thead > tr > th) {
  background: var(--p-surface-800, #1e293b);
  border-bottom-color: var(--p-surface-700, #334155);
}

:deep(.premium-table .p-datatable-tbody > tr > td) {
  padding: 14px 16px;
  font-size: 13px;
}

:deep(.premium-table .p-paginator) {
  padding: 12px 16px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: transparent;
  border-top: 1px solid var(--p-surface-200, #e2e8f0);
}

:root.dark :deep(.premium-table .p-paginator) {
  border-top-color: var(--p-surface-700, #334155);
}

:deep(.premium-table .p-datatable-wrapper) {
  border-radius: 0;
}
</style>