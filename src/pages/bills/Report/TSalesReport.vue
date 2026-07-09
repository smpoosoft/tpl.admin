<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">业务报表</span>
    </template>

    <div class="p2">
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div v-for="(stat, index) in SALES_STATS" :key="index" class="card p-3">
          <div class="text-sm text-surface-500">{{ stat.label }}</div>
          <div class="text-2xl font-bold my-1">{{ stat.value }}</div>
          <div class="text-xs" :class="stat.trendUp ? 'text-green-600' : 'text-red-500'">
            {{ stat.trendUp ? '↑' : '↓' }} {{ stat.trend }}
          </div>
        </div>
      </div>

      <DataTable :value="SALES_DATA" stripedRows paginator :rows="10" :rowsPerPageOptions="[5, 10, 20]" dataKey="id" class="w-full">
        <Column field="product" header="产品" />
        <Column field="category" header="分类" />
        <Column field="amount" header="金额">
          <template #body="slotProps">{{ formatCurrency(slotProps.data.amount) }}</template>
        </Column>
        <Column field="qty" header="数量" />
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
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 0 }).format(amount);
}
</script>

<style scoped></style>