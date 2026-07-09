<template>
  <TRouterPanel>
    <template #header>
      <i class="pi pi-shield mr-1" />
      <span class="font-bold">安全中心</span>
    </template>

    <div class="p2 flex flex-col gap-3 h-full">
      <!-- Toolbar: total count + action -->
      <div class="flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <span class="text-sm text-surface-500 dark:text-surface-400">
            共
            <strong class="text-surface-700 dark:text-surface-200">{{ sysUsers.length }}</strong>
            条用户记录
          </span>
        </div>
        <Button icon="pi pi-plus" label="新增用户" severity="primary" />
      </div>

      <!-- Data table -->
      <DataTable
        :value="sysUsers"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :currentPageReportTemplate="'显示第 {first} 至第 {last} 条，共 {totalRecords} 条记录'"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        tableStyle="min-width: 50rem"
        size="small"
        showGridlines
        :pt="{
          header: {
            class: 'bg-surface-50 dark:bg-surface-800'
          },
          row: {
            class: 'h-10'
          }
        }"
      >
        <Column
          field="username"
          header="用户名"
          sortable
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 10rem"
        />
        <Column
          field="role"
          header="角色"
          sortable
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 8rem"
        />
        <Column
          field="dept"
          header="部门"
          sortable
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 8rem"
        />
        <Column
          field="status"
          header="状态"
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 7rem"
        >
          <template #body="{ data }">
            <Tag
              :value="statusLabel(data.status)"
              :severity="statusSeverity(data.status)"
              :icon="
                data.status === 'active'
                  ? 'pi pi-check-circle'
                  : data.status === 'locked'
                    ? 'pi pi-lock'
                    : 'pi pi-ban'
              "
              class="px-2 py-0.5 text-xs"
            />
          </template>
        </Column>
        <Column
          field="lastLogin"
          header="最后登录"
          sortable
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 11rem"
        />
        <Column
          header="操作"
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="width: 8rem"
        >
          <template #body>
            <div class="flex items-center gap-1">
              <Button
                icon="pi pi-pencil"
                severity="secondary"
                text
                rounded
                size="small"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                size="small"
              />
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