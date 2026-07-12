<template>
  <TRouterPanel :imt>
    <template #header>
      <span class="font-bold">系统日志</span>
    </template>

    <div class="p2">
      <div class="flex items-center gap-2 mb-3">
        <DatePicker
          v-model="filterDate"
          dateFormat="yy-mm-dd"
          placeholder="选择日期"
          showIcon
          class="w-48"
        />
        <Select
          v-model="filterAction"
          :options="actionOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="操作类型"
          class="w-40"
          showClear
        />
      </div>

      <DataTable
        :value="filteredLogs"
        stripedRows
        paginator
        :rows="15"
        :rowsPerPageOptions="[10, 15, 30]"
        class="w-full"
      >
        <Column field="user" header="用户" />
        <Column field="action" header="操作" />
        <Column field="target" header="目标" />
        <Column field="ip" header="IP地址" />
        <Column field="time" header="时间" />
        <Column field="result" header="结果">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.result === 'success' ? '成功' : '失败'"
              :severity="slotProps.data.result === 'success' ? 'success' : 'danger'"
            />
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
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import { AUDIT_LOGS } from '@/mock/sysData.ts';

const filterDate = ref<Date | null>(null);
const filterAction = ref<string>('');

const actionOptions = [
  { label: '登录', value: '登录' },
  { label: '登出', value: '登出' },
  { label: '修改密码', value: '修改密码' },
  { label: '数据导出', value: '数据导出' }
];

function normalizeDate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const filteredLogs = computed(() => {
  let result = AUDIT_LOGS;

  if (filterAction.value) {
    result = result.filter((l) => l.action === filterAction.value);
  }

  if (filterDate.value) {
    const dateStr = normalizeDate(filterDate.value);
    result = result.filter((l) => l.time.startsWith(dateStr));
  }

  return result;
});
import * as imt from './imt';
</script>
