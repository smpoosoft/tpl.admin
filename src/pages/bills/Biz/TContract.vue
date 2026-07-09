<template>
  <TRouterPanel>
    <template #header>
      <div class="flex items-center gap-2">
        <i class="pi pi-file-check text-primary" style="font-size: 1.25rem" />
        <span class="font-bold text-lg">合同管理</span>
      </div>
    </template>

    <div class="h-full flex flex-col p4">
      <!-- summary bar -->
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm text-surface-500">
          共
          <span class="font-semibold text-surface-700">{{ filteredContracts.length }}</span>
          条合同记录
          <span v-if="searchQuery.trim() && filteredContracts.length !== contracts.length" class="text-surface-400">
            （已筛选，总计 {{ contracts.length }} 条）
          </span>
        </span>
      </div>

      <!-- toolbar -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="searchQuery"
              placeholder="搜索合同编号/名称/签约方/负责人..."
              class="w-72"
            />
          </span>
          <Button
            icon="pi pi-refresh"
            severity="secondary"
            text
            rounded
            v-tooltip.top="'重置搜索'"
            @click="contracts = [...CONTRACTS]; searchQuery = ''"
          />
        </div>
        <Button icon="pi pi-plus" label="新增合同" rounded />
      </div>

      <!-- data table -->
      <DataTable
        :value="filteredContracts"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        dataKey="id"
        class="w-full flex-1"
        showGridlines
        size="small"
      >
        <template #empty>
          <div class="flex flex-col items-center justify-center py-8 text-surface-400">
            <i class="pi pi-inbox text-4xl mb-2" />
            <span class="text-sm">暂无合同数据</span>
            <span v-if="searchQuery.trim()" class="text-xs mt-1">
              未匹配到与「{{ searchQuery }}」相关的合同，请调整搜索条件
            </span>
          </div>
        </template>

        <Column field="id" header="合同编号" :sortable="true" headerStyle="width: 8rem" />
        <Column field="name" header="合同名称" :sortable="true" />
        <Column field="party" header="签约方" :sortable="true" headerStyle="width: 8rem" />
        <Column field="amount" header="金额" :sortable="true" headerStyle="width: 8rem">
          <template #body="slotProps">
            <span class="font-semibold text-surface-800">{{ formatCurrency(slotProps.data.amount) }}</span>
          </template>
        </Column>
        <Column field="signDate" header="签约日期" :sortable="true" headerStyle="width: 7rem" />
        <Column field="status" header="状态" :sortable="true" headerStyle="width: 6rem">
          <template #body="slotProps">
            <Tag
              :value="statusLabel(slotProps.data.status)"
              :severity="statusSeverity(slotProps.data.status)"
              rounded
            />
          </template>
        </Column>
        <Column field="manager" header="负责人" headerStyle="width: 6rem" />
        <Column header="操作" headerStyle="width: 7rem">
          <template #body="slotProps">
            <div class="flex items-center gap-1">
              <Button
                icon="pi pi-eye"
                severity="secondary"
                text
                rounded
                size="small"
                v-tooltip.top="'查看详情'"
                @click="onView(slotProps.data)"
              />
              <Button
                icon="pi pi-pencil"
                severity="secondary"
                text
                rounded
                size="small"
                v-tooltip.top="'编辑合同'"
                @click="onEdit(slotProps.data)"
              />
            </div>
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
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import type { Contract } from '@/mock/bizData.ts';
import { CONTRACTS, CONTRACT_STATUS_OPTS } from '@/mock/bizData.ts';

const contracts = ref([...CONTRACTS]);
const searchQuery = ref('');

const STATUS_SEVERITY_MAP: Record<string, string> = Object.fromEntries(
  CONTRACT_STATUS_OPTS.map((opt) => [opt.value, opt.severity])
);

const STATUS_LABEL_MAP: Record<string, string> = Object.fromEntries(
  CONTRACT_STATUS_OPTS.map((opt) => [opt.value, opt.label])
);

const filteredContracts = computed(() => {
  if (!searchQuery.value.trim()) {
    return contracts.value;
  }

  const q = searchQuery.value.trim().toLowerCase();
  return contracts.value.filter(
    (item) =>
      item.id.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.party.toLowerCase().includes(q) ||
      item.manager.toLowerCase().includes(q)
  );
});

function statusSeverity(status: string): string {
  return STATUS_SEVERITY_MAP[status] ?? 'secondary';
}

function statusLabel(status: string): string {
  return STATUS_LABEL_MAP[status] ?? status;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0
  }).format(amount);
}

function onView(contract: Contract): void {
  // TODO: navigate to contract detail view
  console.log('view contract', contract.id);
}

function onEdit(contract: Contract): void {
  // TODO: open contract edit dialog
  console.log('edit contract', contract.id);
}
</script>

<style scoped lang="scss"></style>