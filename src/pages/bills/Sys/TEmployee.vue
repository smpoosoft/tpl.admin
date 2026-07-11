<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">职员管理</span>
    </template>

    <div class="p2">
      <p class="text-sm text-surface-500 mb-4">管理公司员工信息与状态</p>

      <div class="flex items-center justify-between mb-3">
        <Button icon="pi pi-plus" label="新增职员" />
        <div class="flex items-center gap-1">
          <Button
            v-for="tab in filterTabs"
            :key="tab.key"
            :label="`${tab.label}(${tab.count})`"
            :severity="activeTab === tab.key ? 'primary' : 'secondary'"
            text
            size="small"
            @click="activeTab = tab.key"
          />
        </div>
      </div>

      <DataTable
        :value="filteredEmployees"
        v-model:selection="selectedEmployees"
        dataKey="id"
        stripedRows
        paginator
        :rows="10"
        paginatorTemplate="{CurrentPageReport} {FirstPageLink} {PrevPageLink} {PageLinks} {NextPageLink} {LastPageLink}"
        currentPageReportTemplate="共 {totalRecords} 条，当前显示 {first} - {last}"
        class="w-full"
      >
        <template #header>
          <div class="flex items-center">
            <Button label="反选" severity="secondary" text size="small" @click="invertSelection" />
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem" />
        <Column header="姓名">
          <template #body="sp">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">{{ sp.data.name.charAt(0) }}</span>
              <span>{{ sp.data.name }}</span>
            </div>
          </template>
        </Column>
        <Column field="email" header="邮箱" />
        <Column field="id" header="工号" />
        <Column field="dept" header="部门" />
        <Column field="position" header="职位" />
        <Column field="phone" header="手机号" />
        <Column field="status" header="状态">
          <template #body="sp">
            <Tag :value="statusLabel(sp.data.status)" :severity="statusSeverity(sp.data.status)" />
          </template>
        </Column>
        <Column field="hireDate" header="入职日期" />
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
import TRouterPanel from '@/components/layer/TLayerRouter.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { EMPLOYEES } from '@/mock/sysData.ts';

interface FilterTab {
  key: string;
  label: string;
  count: number;
}

const selectedEmployees = ref<(typeof EMPLOYEES)[number][]>([]);
const activeTab = ref<string>('all');

const employees = ref([...EMPLOYEES]);

const filterTabs = computed<FilterTab[]>(() => {
  const all = employees.value.length;
  const active = employees.value.filter((e) => e.status === 'active').length;
  const probation = employees.value.filter((e) => e.status === 'probation').length;
  const resigned = employees.value.filter((e) => e.status === 'resigned').length;
  return [
    { key: 'all', label: '全部', count: all },
    { key: 'active', label: '在职', count: active },
    { key: 'probation', label: '试用期', count: probation },
    { key: 'resigned', label: '离职', count: resigned }
  ];
});

const filteredEmployees = computed(() => {
  if (activeTab.value === 'all') return employees.value;
  return employees.value.filter((e) => e.status === activeTab.value);
});

function statusLabel(status: string): string {
  switch (status) {
    case 'active': return '在职';
    case 'probation': return '试用期';
    case 'resigned': return '离职';
    default: return status;
  }
}

function statusSeverity(status: string): string {
  switch (status) {
    case 'active': return 'success';
    case 'probation': return 'warn';
    case 'resigned': return 'danger';
    default: return 'info';
  }
}

function invertSelection(): void {
  const shown = filteredEmployees.value;
  if (shown.length === 0) return;
  if (selectedEmployees.value.length === shown.length) {
    selectedEmployees.value = [];
  } else {
    selectedEmployees.value = [...shown];
  }
}
</script>

<style scoped></style>
