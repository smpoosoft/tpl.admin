<template>
  <TRouterPanel>
    <template #header>
      <div class="flex flex-col">
        <span class="font-bold">安全中心</span>
        <small class="text-surface-400 dark:text-surface-500">管理用户账户与权限</small>
      </div>
    </template>

    <div class="p2">
      <div class="mb-3">
        <Button icon="pi pi-plus" label="新增用户" />
      </div>

      <DataTable :value="sysUsers" stripedRows paginator :rows="10" :rowsPerPageOptions="[5, 10, 20]" dataKey="id" class="w-full">
        <Column field="username" header="用户名" />
        <Column field="role" header="角色" />
        <Column field="dept" header="部门" />
        <Column field="status" header="状态">
          <template #body="slotProps">
            <Tag
              :value="statusLabel(slotProps.data.status)"
              :severity="statusSeverity(slotProps.data.status)"
            />
          </template>
        </Column>
        <Column field="lastLogin" header="最后登录" />
        <Column header="操作" headerStyle="width: 8rem">
          <template #body>
            <Button icon="pi pi-pencil" severity="secondary" text rounded size="small" />
            <Button icon="pi pi-trash" severity="danger" text rounded size="small" />
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

const sysUsers = ref([...SYS_USERS]);

const STATUS_LABEL: Record<string, string> = {
  active: '正常',
  locked: '锁定',
  inactive: '停用'
};

const STATUS_SEVERITY: Record<string, string> = {
  active: 'success',
  locked: 'danger',
  inactive: 'warn'
};

function statusLabel(status: string): string {
  return STATUS_LABEL[status] ?? status;
}

function statusSeverity(status: string): string {
  return STATUS_SEVERITY[status] ?? 'info';
}
</script>

<style scoped></style>