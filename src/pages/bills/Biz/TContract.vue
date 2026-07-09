<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">合同管理</span>
    </template>

    <div class="p2">
      <div class="flex items-center justify-between mb-3">
        <InputText v-model="searchQuery" placeholder="搜索合同..." class="w-64" />
        <Button icon="pi pi-plus" label="新增合同" />
      </div>

      <DataTable :value="filteredContracts" stripedRows paginator :rows="10" :rowsPerPageOptions="[5, 10, 20]" dataKey="id" class="w-full">
        <Column field="id" header="合同编号" />
        <Column field="name" header="合同名称" />
        <Column field="party" header="签约方" />
        <Column field="amount" header="金额">
          <template #body="slotProps">{{ formatCurrency(slotProps.data.amount) }}</template>
        </Column>
        <Column field="signDate" header="签约日期" />
        <Column field="status" header="状态">
          <template #body="slotProps">
            <Tag :value="statusLabel(slotProps.data.status)" :severity="statusSeverity(slotProps.data.status)" />
          </template>
        </Column>
        <Column field="manager" header="负责人" />
        <Column header="操作" headerStyle="width: 8rem">
          <template #body>
            <Button icon="pi pi-eye" severity="secondary" text rounded size="small" />
            <Button icon="pi pi-pencil" severity="secondary" text rounded size="small" />
          </template>
        </Column>
      </DataTable>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { CONTRACTS, CONTRACT_STATUS_OPTS } from '@/mock/bizData.ts';

const searchQuery = ref('');
const contracts = ref([...CONTRACTS]);

const filteredContracts = computed(() => {
  if (!searchQuery.value.trim()) return contracts.value;
  const q = searchQuery.value.trim().toLowerCase();
  return contracts.value.filter((c) => c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.party.toLowerCase().includes(q));
});

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 0 }).format(amount);
}

function statusLabel(status: string): string {
  return CONTRACT_STATUS_OPTS.find((o) => o.value === status)?.label ?? status;
}

function statusSeverity(status: string): string {
  return CONTRACT_STATUS_OPTS.find((o) => o.value === status)?.severity ?? 'info';
}
</script>

<style scoped></style>