<template>
  <TRouterPanel>
    <template #header>
      <div class="flex items-center gap-2">
        <span class="font-bold text-lg">职员管理</span>
        <span class="text-sm text-surface-400 font-normal">共 {{ totalCount }} 名职员</span>
      </div>
    </template>

    <div class="p-4">
      <!-- Toolbar -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="keyword"
              placeholder="搜索姓名 / 部门 / 职位"
              class="w-72"
            />
          </span>
        </div>
        <div class="flex items-center gap-2">
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="keyword = ''" />
          <Button icon="pi pi-plus" label="新增职员" severity="primary" />
        </div>
      </div>

      <!-- Data table -->
      <DataTable
        :value="filteredEmployees"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :currentPageReportTemplate="'显示 {first} 到 {last}，共 {totalRecords} 条'"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        class="w-full"
        size="small"
        showGridlines
      >
        <Column field="name" header="姓名" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <span class="employee-avatar">{{ getInitial(data.name) }}</span>
              <span class="font-medium">{{ data.name }}</span>
            </div>
          </template>
        </Column>
        <Column field="dept" header="部门" sortable />
        <Column field="position" header="职位" sortable />
        <Column field="phone" header="电话" />
        <Column field="email" header="邮箱" />
        <Column field="status" header="状态">
          <template #body="{ data }">
            <Tag
              :value="statusLabel(data.status)"
              :severity="statusSeverity(data.status)"
            />
          </template>
        </Column>
        <Column header="操作" :exportable="false" style="width: 100px">
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
import { ref, computed } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { EMPLOYEES } from '@/mock/sysData.ts';

const keyword = ref('');

const STATUS_LABELS: Record<string, string> = {
  active: '在职',
  inactive: '离职',
  suspended: '停职'
};

const STATUS_SEVERITY: Record<string, string> = {
  active: 'success',
  inactive: 'danger',
  suspended: 'warn'
};

function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

function statusSeverity(status: string): string {
  return STATUS_SEVERITY[status] ?? 'info';
}

function getInitial(name: string): string {
  return name.charAt(0);
}

const totalCount = computed(() => EMPLOYEES.length);

const filteredEmployees = computed(() => {
  const kw = keyword.value.trim().toLowerCase();
  if (!kw) {
    return EMPLOYEES;
  }
  return EMPLOYEES.filter((e) => {
    return (
      e.name.toLowerCase().includes(kw) ||
      e.dept.toLowerCase().includes(kw) ||
      e.position.toLowerCase().includes(kw)
    );
  });
});
</script>

<style scoped lang="scss">
.employee-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--p-primary-100, #e0e7ff);
  color: var(--p-primary-700, #4338ca);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  flex-shrink: 0;
}

.dark .employee-avatar {
  background: var(--p-primary-900, #312e81);
  color: var(--p-primary-200, #c7d2fe);
}
</style>