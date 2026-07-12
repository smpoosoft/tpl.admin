<template>
  <TRouterPanel>
    <template #header>
      <div class="flex flex-column">
        <span class="font-bold">数据报表</span>
        <small class="text-surface-400 font-normal">纯数据明细报表</small>
      </div>
    </template>

    <div class="p2">
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div
          v-for="(stat, index) in PRODUCT_STATS"
          :key="index"
          class="card p-3"
        >
          <div class="text-sm text-surface-500">{{ stat.label }}</div>
          <div class="text-2xl font-bold my-1">{{ stat.value }}</div>
          <div
            class="text-xs"
            :class="stat.trendUp ? 'text-primary-700' : 'text-red-500'"
          >
            {{ stat.trendUp ? '↑' : '↓' }} {{ stat.trend }}
          </div>
        </div>
      </div>

      <DataTable
        :value="productData"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        dataKey="id"
        class="w-full"
      >
        <Column field="name" header="产品名称" />
        <Column field="sales" header="销售额">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.sales) }}
          </template>
        </Column>
        <Column field="stock" header="库存" />
        <Column field="profit" header="利润">
          <template #body="slotProps">
            <span class="text-primary-700 font-medium">{{
              formatCurrency(slotProps.data.profit)
            }}</span>
          </template>
        </Column>
        <Column field="category" header="分类" />
      </DataTable>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TRouterPanel from '@/components/layer/TLayerRouter.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { PRODUCT_STATS, PRODUCT_DATA } from '@/mock/reportData.ts';

const productData = ref([...PRODUCT_DATA]);

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0
  }).format(amount);
}
</script>

<style scoped></style>
