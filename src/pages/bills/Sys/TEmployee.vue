<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">职员管理</span>
    </template>

    <div class="p2">
      <div class="flex items-center justify-between mb-3">
        <InputText v-model="searchQuery" placeholder="搜索职员..." class="w-64" />
        <Button icon="pi pi-plus" label="新增职员" />
      </div>

      <DataTable :value="filteredEmployees" stripedRows paginator :rows="10" :rowsPerPageOptions="[5, 10, 20]" dataKey="id" class="w-full">
        <Column field="name" header="姓名">
          <template #body="slotProps">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold mr-2">{{ slotProps.data.name.charAt(0) }}</span>
            {{ slotProps.data.name }}
          </template>
        </Column>
        <Column field="dept" header="部门" />
        <Column field="position" header="职位" />
        <Column field="phone" header="电话" />
        <Column field="email" header="邮箱" />
        <Column field="status" header="状态">
          <template #body="slotProps">
            <Tag :value="slotProps.data.status === 'active' ? '在职' : '离职'" :severity="slotProps.data.status === 'active' ? 'success' : 'danger'" />
          </template>
        </Column>
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
import { ref, computed } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { EMPLOYEES } from '@/mock/sysData.ts';

const searchQuery = ref('');
const employees = ref([...EMPLOYEES]);

const filteredEmployees = computed(() => {
  if (!searchQuery.value.trim()) return employees.value;
  const q = searchQuery.value.trim().toLowerCase();
  return employees.value.filter((e) => e.name.toLowerCase().includes(q) || e.dept.toLowerCase().includes(q) || e.phone.includes(q));
});
</script>

<style scoped></style>