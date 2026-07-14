<template>
  <TRouterPanel :imt>
    <template #header>
      <div class="flexSplit flexY gapX1">
        <span class="flexSplit"></span>
        <Button label="新增" icon="pi pi-plus" size="small" />
        <TBtnExportImport />
      </div>
    </template>

    <!-- <div class="p2"> -->
    <TTableList :filter-tabs="FILTER_TABS" :data-list="filteredList" :total-count="customers.length"
      :table-size="TABLE_SIZE" :default-columns="TABLE_COLUMNS" :footers="tableFooters"
      v-model:active-filter="activeFilter" v-model:search-keyword="searchKeyword" />
    <!-- </div> -->
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TRouterPanel from '@/components/layer/TLayerRouter.vue';
import TTableList from '@/components/formKit/TTableList.vue';
import Button from 'primevue/button';
import TBtnExportImport from '@/components/formKit/TBtnExportImport.vue';
import { TABLE_COLUMNS, TABLE_CUSTOMERS, FILTER_TABS } from '@/mock/listBase';
import * as imt from './imt';
import { TABLE_SIZE } from '@/constant/uiKit';

const searchKeyword = ref('');
const customers = ref([...TABLE_CUSTOMERS]);
const activeFilter = ref('all');

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

// 合计行：合同金额合计（随筛选结果变化）
const tableFooters = computed(() => {
  const total = filteredList.value.reduce((sum, r) => sum + r.contractAmount, 0);
  return { contractAmount: total.toLocaleString('zh-CN') };
});
</script>
