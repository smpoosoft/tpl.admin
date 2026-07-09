<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">安全中心</span>
    </template>

    <div class="p2">
      <!-- Toolbar -->
      <div class="flex items-center justify-between mb-3">
        <div></div>
        <div>
          <Button icon="pi pi-plus" label="新增用户" severity="primary" />
        </div>
      </div>

      <!-- Data table -->
      <DataTable
        :value="sysUsers"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        class="w-full"
      >
        <Column field="username" header="用户名" sortable />
        <Column field="role" header="角色" sortable />
        <Column field="dept" header="部门" sortable />
        <Column field="status" header="状态">
          <template #body="{ data }">
            <Tag
              :value="statusLabel(data.status)"
              :severity="statusSeverity(data.status)"
            />
          </template>
        </Column>
        <Column field="lastLogin" header="最后登录" sortable />
        <Column header="操作">
          <template #body>
            <div class="flex items-center gap-1">
              <Button icon="pi pi-pencil" severity="secondary" text rounded />
              <Button icon="pi pi-trash" severity="danger" text rounded />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { SYS_USERS } from '@/mock/sysData.ts';

const sysUsers = ref(SYS_USERS);

const STATUS_LABELS: Record<string, string> = {
  active: '启用',
  locked: '锁定',
  inactive: '停用'
};

const STATUS_SEVERITY: Record<string, string> = {
  active: 'success',
  locked: 'warn',
  inactive: 'danger'
};

function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

function statusSeverity(status: string): string {
  return STATUS_SEVERITY[status] ?? 'info';
}
</script>

<style scoped></style>