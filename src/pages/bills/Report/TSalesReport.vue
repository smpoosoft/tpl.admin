<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold text-lg">业务报表</span>
    </template>

    <div class="p4">
      <!-- stat cards -->
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div
          v-for="(stat, index) in SALES_STATS"
          :key="index"
          class="stat-card"
        >
          <div class="stat-card__label">{{ stat.label }}</div>
          <div class="stat-card__value">{{ stat.value }}</div>
          <div
            class="stat-card__trend"
            :class="stat.trendUp ? 'stat-card__trend--up' : 'stat-card__trend--down'"
          >
            <span class="stat-card__trend-icon">{{ stat.trendUp ? '▲' : '▼' }}</span>
            {{ stat.trend }}
          </div>
        </div>
      </div>

      <!-- data table -->
      <DataTable
        :value="SALES_DATA"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        dataKey="id"
        class="w-full sales-table"
        :pt="dataTablePt"
      >
        <Column field="product" header="产品" />
        <Column field="category" header="分类" />
        <Column field="amount" header="金额">
          <template #body="slotProps">
            <span class="data-cell-numeric font-medium">{{ formatCurrency(slotProps.data.amount) }}</span>
          </template>
        </Column>
        <Column field="qty" header="数量">
          <template #body="slotProps">
            <span class="data-cell-numeric">{{ slotProps.data.qty }}</span>
          </template>
        </Column>
        <Column field="date" header="日期" />
        <Column field="region" header="区域" />
      </DataTable>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { SALES_STATS, SALES_DATA } from '@/mock/reportData.ts';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0
  }).format(amount);
}

const dataTablePt = {
  table: { class: 'sales-table__inner' }
};
</script>

<style scoped lang="scss">
.stat-card {
  background: var(--p-surface-card);
  border: 1px solid var(--p-surface-200);
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  &__label {
    font-size: 0.8125rem;
    color: var(--p-text-muted-color);
    margin-bottom: 0.5rem;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  &__value {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--p-text-color);
    margin-bottom: 0.625rem;
    font-family: var(--font-mono);
    letter-spacing: -0.01em;
  }

  &__trend {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 0.125rem 0.5rem;
    border-radius: 6px;
    line-height: 1.5;

    &--up {
      color: #16a34a;
      background: rgba(22, 163, 74, 0.08);
    }

    &--down {
      color: #dc2626;
      background: rgba(220, 38, 38, 0.08);
    }
  }

  &__trend-icon {
    font-size: 0.625rem;
    line-height: 1;
  }
}

.sales-table {
  :deep(.p-datatable-table-container) {
    border-radius: 10px;
    overflow: hidden;
  }

  :deep(.p-datatable-tbody > tr) {
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--p-surface-50);
    }
  }

  :deep(.p-datatable-thead > tr > th) {
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--p-text-muted-color);
    background: var(--p-surface-100);
    padding: 0.75rem 1rem;
  }

  :deep(.p-datatable-tbody > tr > td) {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }

  :deep(.p-paginator) {
    padding: 0.75rem 0 0;
    border: none;
    background: transparent;
  }
}
</style>