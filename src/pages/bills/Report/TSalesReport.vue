<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">业务报表</span>
    </template>

    <div class="p2">
      <!-- Subtitle -->
      <p class="text-surface-500 mb-3">数据驱动决策洞察</p>

      <!-- Time range buttons + export -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <Button
            v-for="range in timeRanges"
            :key="range.key"
            :severity="activeRange === range.key ? 'primary' : 'secondary'"
            size="small"
            rounded
            @click="activeRange = range.key"
          >
            {{ range.label }}
          </Button>
        </div>
        <Button icon="pi pi-download" label="导出报表" severity="secondary" size="small" />
      </div>

      <!-- Stat cards -->
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div v-for="(stat, index) in SALES_STATS" :key="index" class="card p-3">
          <div class="text-sm text-surface-500">{{ stat.label }}</div>
          <div class="text-2xl font-bold my-1">{{ stat.value }}</div>
          <div class="text-xs" :class="stat.trendUp ? 'text-green-600' : 'text-red-500'">
            {{ stat.trendUp ? '↑' : '↓' }} {{ stat.trend }}
          </div>
        </div>
      </div>

      <!-- Chart section: revenue trend -->
      <Panel header="营收趋势" class="mb-3">
        <div class="flex items-center gap-2 mb-3">
          <Button
            v-for="tab in revenueTabs"
            :key="tab.key"
            :severity="activeRevenueTab === tab.key ? 'primary' : 'secondary'"
            size="small"
            text
            rounded
            @click="activeRevenueTab = tab.key"
          >
            {{ tab.label }}
          </Button>
        </div>
        <div class="flex items-end gap-3 h-40">
          <div
            v-for="(bar, bi) in revenueBars"
            :key="bi"
            class="flex flex-col items-center flex-1"
          >
            <div
              class="w-full rounded-t bg-primary-400"
              :style="{ height: bar.height + '%' }"
            ></div>
            <span class="text-xs text-surface-500 mt-1">{{ bar.label }}</span>
          </div>
        </div>
      </Panel>

      <!-- Chart section: customer source -->
      <Panel header="客户来源分布" class="mb-3">
        <div class="grid grid-cols-5 gap-3">
          <div
            v-for="(src, si) in customerSources"
            :key="si"
            class="flex flex-col items-center"
          >
            <div
              class="w-10 h-10 rounded-full mb-1"
              :style="{ backgroundColor: src.color }"
            ></div>
            <span class="text-sm font-medium">{{ src.label }}</span>
            <span class="text-xs text-surface-500">{{ src.percent }}</span>
          </div>
        </div>
      </Panel>

      <!-- Detail DataTable -->
      <DataTable
        :value="SALES_DATA"
        stripedRows
        paginator
        :rows="8"
        :rowsPerPageOptions="[5, 8, 15]"
        dataKey="id"
        class="w-full"
        :paginatorTemplate="'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport'"
        :currentPageReportTemplate="'共 {totalRecords} 条记录'"
      >
        <Column field="date" header="日期" />
        <Column field="product" header="产品" />
        <Column field="category" header="分类">
          <template #body="slotProps">
            <Tag :value="slotProps.data.category" severity="info" rounded />
          </template>
        </Column>
        <Column field="amount" header="营收金额">
          <template #body="slotProps">{{ formatCurrency(slotProps.data.amount) }}</template>
        </Column>
        <Column field="qty" header="成交订单" />
        <Column field="region" header="区域" />
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
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { SALES_STATS, SALES_DATA } from '@/mock/reportData.ts';

const timeRanges = [
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'quarter', label: '本季' },
  { key: 'year', label: '本年' }
];
const activeRange = ref('month');

const revenueTabs = [
  { key: 'current', label: '本期' },
  { key: 'previous', label: '上期' }
];
const activeRevenueTab = ref('current');

const revenueBars = [
  { label: '1月', height: 65 },
  { label: '2月', height: 45 },
  { label: '3月', height: 80 },
  { label: '4月', height: 55 },
  { label: '5月', height: 90 },
  { label: '6月', height: 75 },
  { label: '7月', height: 60 },
  { label: '8月', height: 85 }
];

const customerSources = [
  { label: '官网注册', percent: '32%', color: '#3b82f6' },
  { label: '转介绍', percent: '23%', color: '#10b981' },
  { label: '线下活动', percent: '18%', color: '#f59e0b' },
  { label: '广告投放', percent: '15%', color: '#ef4444' },
  { label: '其他', percent: '12%', color: '#8b5cf6' }
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 0 }).format(amount);
}
</script>

<style scoped></style>