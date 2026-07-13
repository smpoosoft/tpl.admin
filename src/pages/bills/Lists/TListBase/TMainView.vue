<template>
  <TRouterPanel :imt>
    <template #header>
      <div class="flexSplit flexY gapX1">
        <span class="flexSplit"></span>
        <Button label="新增" icon="pi pi-plus" size="small" />
        <Menu ref="refOptMenu" :model="ROUTER_PANEL_ITEMS" popup />
      </div>
    </template>

    <!-- <div class="p2"> -->
    <TTableList :filter-tabs="FILTER_TABS" :data-list="filteredList" :total-count="customers.length"
      :default-columns="TABLE_COLUMNS" v-model:active-filter="activeFilter" v-model:search-keyword="searchKeyword" />
    <!-- </div> -->
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TRouterPanel from '@/components/layer/TLayerRouter.vue';
import TTableList from '@/components/formKit/TTableList.vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { TABLE_COLUMNS, TABLE_CUSTOMERS, FILTER_TABS } from '@/mock/listBase';
import * as imt from './imt';
import { ROUTER_PANEL_ITEMS } from '@/constant/uiKit';

const searchKeyword = ref('');
const customers = ref([...TABLE_CUSTOMERS]);
const activeFilter = ref('all');
const refOptMenu = ref<InstanceType<typeof Menu> | null>(null);

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
  if (searchKeyword.value.trim()) {
    const q = searchKeyword.value.trim().toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }
  return result;
});
</script>
