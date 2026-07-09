<template>
  <TRouterPanel>
    <template #header>
      <div class="flex items-center gap-3">
        <span class="text-xl font-bold tracking-wide text-surface-900 dark:text-surface-100">表格列表</span>
        <span class="px-2.5 py-0.5 text-xs font-medium bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300 rounded-full border border-primary-200 dark:border-primary-500/20">数据表格</span>
      </div>
    </template>

    <div class="flex flex-col gap-4 p-5">
      <!-- summary bar -->
      <div class="flex items-center justify-between px-4 py-3 bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700">
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-300">
            <i class="pi pi-database text-sm" />
          </span>
          <span class="text-sm text-surface-600 dark:text-surface-400">
            共 <strong class="text-surface-900 dark:text-surface-100 text-base">{{ filteredList.length }}</strong> 条记录
            <span v-if="filteredList.length !== customers.length" class="text-surface-400 dark:text-surface-500 ml-1">
              （筛选自 {{ customers.length }} 条）
            </span>
          </span>
        </div>
        <div class="flex items-center gap-4 text-xs text-surface-400 dark:text-surface-500">
          <span class="flex items-center gap-1.5">
            <i class="pi pi-check-circle text-green-500" />
            已选 <strong class="text-surface-600 dark:text-surface-300">{{ selected.length }}</strong> 项
          </span>
        </div>
      </div>

      <!-- search + actions -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="p-input-icon-left relative">
            <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-500 text-sm z-1" />
            <InputText
              v-model="searchQuery"
              placeholder="搜索客户姓名、手机号、ID..."
              class="pl-9 w-72 search-input"
            />
          </span>
          <Button
            icon="pi pi-refresh"
            severity="secondary"
            text
            rounded
            @click="customers = [...TABLE_CUSTOMERS]; searchQuery = ''; activeFilter = 'all'"
            class="action-btn"
          />
        </div>
        <div class="flex items-center gap-2">
          <Button icon="pi pi-upload" severity="secondary" text rounded class="action-btn" />
          <Button icon="pi pi-download" severity="secondary" text rounded class="action-btn" />
          <Button icon="pi pi-plus" label="新增客户" class="add-btn" />
        </div>
      </div>

      <!-- filter tabs -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <template v-for="tab in FILTER_TABS" :key="tab.key">
          <Button
            :severity="activeFilter === tab.key ? 'primary' : 'secondary'"
            rounded
            text
            size="small"
            @click="activeFilter = tab.key"
            class="filter-tab"
          >
            {{ tab.label }}
            <span class="ml-1.5 text-xs" :class="activeFilter === tab.key ? 'opacity-80' : 'opacity-60'">({{ tab.count }})</span>
          </Button>
        </template>
      </div>

      <!-- data table -->
      <DataTable
        :value="filteredList"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        selectionMode="multiple"
        v-model:selection="selected"
        dataKey="id"
        class="data-table"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="第 {currentPage} 页 / 共 {totalPages} 页"
        :pt="{
          root: { class: 'shadow-xs rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden' },
          header: { class: 'bg-surface-50 dark:bg-surface-800 border-b-0' },
          paginator: {
            root: { class: 'border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50' }
          }
        }"
        showGridlines
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem" />
        <Column field="name" header="客户" headerStyle="min-width: 14rem">
          <template #body="slotProps">
            <div class="flex items-center gap-3">
              <span
                class="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold ring-2 ring-white dark:ring-surface-800 shadow-sm"
                :class="avatarBg(slotProps.data.avatar)"
              >
                {{ slotProps.data.avatar }}
              </span>
              <div>
                <div class="font-medium text-surface-900 dark:text-surface-100">{{ slotProps.data.name }}</div>
                <div class="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{{ slotProps.data.id }}</div>
              </div>
            </div>
          </template>
        </Column>
        <Column field="phone" header="联系方式" headerStyle="min-width: 10rem">
          <template #body="slotProps">
            <span class="text-sm text-surface-600 dark:text-surface-400 font-mono tracking-wide">{{ slotProps.data.phone }}</span>
          </template>
        </Column>
        <Column field="tag" header="标签" headerStyle="min-width: 8rem">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.tag"
              :severity="tagSeverity(slotProps.data.tagClass)"
              class="tag-badge"
            />
          </template>
        </Column>
        <Column field="source" header="来源" headerStyle="min-width: 8rem">
          <template #body="slotProps">
            <span class="text-sm text-surface-600 dark:text-surface-400">{{ slotProps.data.source }}</span>
          </template>
        </Column>
        <Column field="createdAt" header="创建时间" headerStyle="min-width: 9rem">
          <template #body="slotProps">
            <span class="text-sm text-surface-600 dark:text-surface-400">{{ slotProps.data.createdAt }}</span>
          </template>
        </Column>
        <Column header="操作" headerStyle="width: 9rem">
          <template #body>
            <div class="flex items-center gap-1">
              <Button icon="pi pi-pencil" severity="secondary" text rounded size="small" class="action-icon-btn" />
              <Button icon="pi pi-trash" severity="danger" text rounded size="small" class="action-icon-btn" />
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
  'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300',
  'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
  'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
  'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300',
  'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300',
  'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
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

<style scoped lang="scss">
.search-input {
  transition: width 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    width: 20rem;
  }
}

.filter-tab {
  transition: all 0.15s ease;

  &:not(.p-button-primary):hover {
    background-color: var(--p-surface-100) !important;
  }

  :deep(.p-button-label) {
    font-weight: 500;
  }
}

.action-btn {
  transition: opacity 0.15s ease, transform 0.15s ease;

  &:hover {
    opacity: 0.75;
    transform: scale(1.05);
  }
}

.action-icon-btn {
  transition: opacity 0.15s ease, transform 0.15s ease;

  &:hover {
    transform: scale(1.1);
  }
}

.add-btn {
  font-weight: 600;
}

.data-table {
  :deep(.p-datatable-thead) > tr > th {
    background-color: var(--p-surface-50);
    color: var(--p-surface-600);
    font-weight: 600;
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--p-surface-200);
  }

  :deep(.p-datatable-tbody) > tr {
    transition: background-color 0.15s ease;

    &:not(.p-highlight):hover {
      background-color: var(--p-surface-50);
    }

    > td {
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
    }
  }

  :deep(.p-paginator) {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    gap: 0.125rem;

    .p-paginator-page,
    .p-paginator-first,
    .p-paginator-prev,
    .p-paginator-next,
    .p-paginator-last {
      min-width: 2.25rem;
      height: 2.25rem;
      border-radius: 0.375rem;
      transition: all 0.15s ease;

      &:not(.p-disabled):not(.p-highlight):hover {
        background-color: var(--p-surface-100);
      }

      &.p-highlight {
        background-color: var(--p-primary-color);
        color: var(--p-primary-contrast-color);
        font-weight: 600;
      }
    }
  }

  :deep(.p-paginator-rpp-options) {
    .p-dropdown-label {
      font-size: 0.8125rem;
    }
  }
}

.tag-badge {
  font-weight: 500;
  letter-spacing: 0.01em;
}
</style>