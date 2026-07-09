<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">职员管理</span>
    </template>

    <div class="p2">
      <!-- Toolbar -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <InputText
            v-model="keyword"
            placeholder="搜索姓名 / 部门 / 职位"
            class="w-64"
          />
        </div>
        <div>
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
        class="w-full"
      >
        <Column field="name" header="姓名" sortable />
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

<style scoped></style>
