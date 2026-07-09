<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">表格列表</span>
    </template>

    <div class="p2">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <InputText
            v-model="searchQuery"
            placeholder="搜索客户..."
            class="w-64"
          >
            <template #prefix>
              <i class="pi pi-search" />
            </template>
          </InputText>
          <Button
            icon="pi pi-refresh"
            severity="secondary"
            text
            rounded
            @click="customers = [...TABLE_CUSTOMERS]; searchQuery = ''; activeFilter = 'all'"
          />
        </div>
        <Button icon="pi pi-plus" label="新增" />
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
        selectionMode="multiple"
        v-model:selection="selected"
        dataKey="id"
        class="w-full"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem" />
        <Column field="name" header="客户">
          <template #body="slotProps">
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
                :class="avatarBg(slotProps.data.avatar)"
              >
                {{ slotProps.data.avatar }}
              </span>
              <div>
                <div class="font-medium">{{ slotProps.data.name }}</div>
                <div class="text-sm text-surface-500">{{ slotProps.data.id }}</div>
              </div>
            </div>
          </template>
        </Column>
        <Column field="phone" header="联系方式">
          <template #body="slotProps">
            <span class="text-surface-600">{{ slotProps.data.phone }}</span>
          </template>
        </Column>
        <Column field="tag" header="标签">
          <template #body="slotProps">
            <Tag :value="slotProps.data.tag" :severity="tagSeverity(slotProps.data.tagClass)" />
          </template>
        </Column>
        <Column field="source" header="来源" />
        <Column field="createdAt" header="创建时间" />
        <Column header="操作" headerStyle="width: 10rem">
          <template #body>
            <div class="flex items-center gap-1">
              <Button icon="pi pi-pencil" severity="secondary" text rounded size="small" />
              <Button icon="pi pi-trash" severity="danger" text rounded size="small" />
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
import { TABLE_CUSTOMERS, FILTER_TABS } from '@/mock/listData';

const customers = ref([...TABLE_CUSTOMERS]);
const activeFilter = ref('all');
const searchQuery = ref('');
const selected = ref([]);

const TAG_SEVERITY_MAP: Record<string, string> = {
  'tag-vip': 'warn',
  'tag-new': 'info',
  'tag-regular': 'success',
  'tag-lost': 'danger',
  'tag-intent': 'contrast'
};

const AVATAR_BG_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-teal-100 text-teal-700',
  'bg-pink-100 text-pink-700',
  'bg-cyan-100 text-cyan-700',
  'bg-amber-100 text-amber-700'
];

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
  if (filterTags && filterTags.length > 0) {
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

function avatarBg(avatar: string): string {
  const index = avatar.charCodeAt(0) % AVATAR_BG_COLORS.length;
  return AVATAR_BG_COLORS[index];
}
</script>

<style scoped></style>