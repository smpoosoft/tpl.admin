<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">简单列表</span>
    </template>

    <div class="p2">
      <div class="mb-4">
        <h2 class="text-xl font-semibold m-0">客户列表</h2>
        <p class="text-sm text-surface-500 mt-1 mb-0">管理所有客户信息及跟进状态</p>
      </div>

      <div class="flex items-center justify-between mb-3">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="searchQuery" placeholder="搜索客户..." class="w-64" />
        </span>
        <Button icon="pi pi-plus" label="新增客户" />
      </div>

      <div class="flex items-center gap-2 mb-3">
        <Button
          v-for="tab in FILTER_TABS"
          :key="tab.key"
          :severity="activeFilter === tab.key ? 'primary' : 'secondary'"
          rounded
          text
          size="small"
          @click="activeFilter = tab.key"
        >
          {{ tab.label }}
          <span class="ml-1 text-sm opacity-60">({{ tab.count }})</span>
        </Button>
      </div>

      <DataTable
        :value="filteredList"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        dataKey="id"
        class="w-full"
      >
        <Column field="name" header="客户">
          <template #body="slotProps">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold bg-primary-100 text-primary-600">{{ slotProps.data.avatar }}</span>
              <div>
                <div class="font-medium">{{ slotProps.data.name }}</div>
                <div class="text-sm text-surface-500">{{ slotProps.data.id }}</div>
              </div>
            </div>
          </template>
        </Column>
        <Column field="phone" header="联系方式" />
        <Column field="tag" header="标签">
          <template #body="slotProps">
            <Tag :value="slotProps.data.tag" :severity="tagSeverity(slotProps.data.tagClass)" />
          </template>
        </Column>
        <Column field="source" header="来源" />
        <Column field="createdAt" header="创建时间" />
        <Column header="操作">
          <template #body>
            <div class="flex items-center gap-1">
              <Button icon="pi pi-pencil" severity="secondary" text rounded size="small" />
              <Button icon="pi pi-trash" severity="danger" text rounded size="small" />
            </div>
          </template>
        </Column>

        <template #empty>
          <div class="flex flex-col items-center justify-center py-8 text-surface-400">
            <i class="pi pi-inbox text-4xl mb-3" />
            <p class="text-lg font-medium m-0">暂无客户数据</p>
            <p class="text-sm mt-1 m-0">请尝试调整筛选条件或新增客户</p>
          </div>
        </template>
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
import { TABLE_CUSTOMERS, FILTER_TABS } from '@/mock/listData';

const customers = ref([...TABLE_CUSTOMERS]);
const activeFilter = ref('all');
const searchQuery = ref('');

const TAG_SEVERITY_MAP: Record<string, string> = {
  'tag-vip': 'warn',
  'tag-new': 'info',
  'tag-regular': 'success',
  'tag-lost': 'danger',
  'tag-intent': 'contrast'
};

const FILTER_TAG_MAP: Record<string, string[]> = {
  all: [],
  vip: ['VIP'],
  new: ['新客'],
  active: ['老客', '意向'],
  lost: ['流失']
};

const filteredList = computed(() => {
  let result = customers.value;
  const filterTags = FILTER_TAG_MAP[activeFilter.value];
  if (filterTags?.length) {
    result = result.filter((item) => filterTags.includes(item.tag));
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }
  return result;
});

function tagSeverity(tagClass: string): string {
  return TAG_SEVERITY_MAP[tagClass] ?? 'secondary';
}
</script>