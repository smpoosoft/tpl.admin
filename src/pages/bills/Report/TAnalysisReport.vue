<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">透视报表</span>
    </template>

    <div class="p2">
      <Panel header="分析配置" class="mb-3">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block mb-1 text-sm font-medium">行维度</label>
            <Select v-model="config.rows" :options="dimensionOptions" multiple optionLabel="label" optionValue="value" class="w-full" placeholder="选择行维度" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium">列维度</label>
            <Select v-model="config.cols" :options="dimensionOptions" multiple optionLabel="label" optionValue="value" class="w-full" placeholder="选择列维度" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium">值字段</label>
            <Select v-model="config.values" :options="valueOptions" multiple optionLabel="label" optionValue="value" class="w-full" placeholder="选择值字段" />
          </div>
        </div>
        <Button label="生成报表" icon="pi pi-chart-bar" class="mt-3" @click="generatePivot" />
      </Panel>

      <DataTable :value="pivotData" stripedRows paginator :rows="10" class="w-full">
        <Column v-for="col in pivotColumns" :key="col" :field="col" :header="col" />
      </DataTable>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { ANALYSIS_CONFIG, SALES_DATA } from '@/mock/reportData.ts';

const dimensionOptions = [
  { label: '产品分类', value: 'category' },
  { label: '区域', value: 'region' },
  { label: '日期', value: 'date' }
];

const valueOptions = [
  { label: '金额', value: 'amount' },
  { label: '数量', value: 'qty' }
];

const config = ref({
  rows: [...ANALYSIS_CONFIG.rows],
  cols: [...ANALYSIS_CONFIG.cols],
  values: [...ANALYSIS_CONFIG.values]
});

const pivotColumns = ref<string[]>([]);
const pivotData = ref<Record<string, string | number>[]>([]);

function generatePivot(): void {
  const rows = config.value.rows;
  const vals = config.value.values;
  if (!rows.length || !vals.length) return;

  pivotColumns.value = [...rows, ...vals];

  const groups = new Map<string, Record<string, string | number>>();
  for (const item of SALES_DATA) {
    const key = rows.map((r) => item[r as keyof typeof item]).join('|');
    if (!groups.has(key)) {
      const group: Record<string, string | number> = {};
      rows.forEach((r) => { group[r] = item[r as keyof typeof item] as string; });
      vals.forEach((v) => { group[v] = 0; });
      groups.set(key, group);
    }
    const group = groups.get(key)!;
    vals.forEach((v) => { group[v] = (group[v] as number) + (item[v as keyof typeof item] as number); });
  }

  pivotData.value = Array.from(groups.values()).slice(0, 50);
}
</script>

<style scoped></style>