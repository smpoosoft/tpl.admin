<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">系统日志</span>
    </template>

    <div class="p2">
      <!-- Filter bar -->
      <div class="flex items-center gap-3 mb-3">
        <DatePicker v-model="dateRange" selectionMode="range" placeholder="选择日期范围" class="w-64" />
        <Select v-model="selectedAction" :options="actionOpts" placeholder="操作类型" class="w-44" showClear />
      </div>

      <!-- Data table -->
      <DataTable
        :value="auditLogs"
        stripedRows
        paginator
        :rows="15"
        class="w-full"
      >
        <Column field="user" header="用户" sortable />
        <Column field="action" header="操作" sortable />
        <Column field="target" header="目标" sortable />
        <Column field="ip" header="IP地址" />
        <Column field="time" header="时间" sortable />
        <Column field="result" header="结果">
          <template #body="{ data }">
            <Tag :value="resultLabel(data.result)" :severity="data.result === 'success' ? 'success' : 'danger'" />
          </template>
        </Column>
      </DataTable>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { AUDIT_LOGS } from '@/mock/sysData.ts';

const auditLogs = ref(AUDIT_LOGS);
const dateRange = ref(null);
const selectedAction = ref(null);

const ACTION_OPTS = [
  { label: '用户登录', value: '用户登录' },
  { label: '修改角色权限', value: '修改角色权限' },
  { label: '创建用户', value: '创建用户' },
  { label: '删除日志', value: '删除日志' },
  { label: '导出员工数据', value: '导出员工数据' },
  { label: '修改系统配置', value: '修改系统配置' },
  { label: '重置用户密码', value: '重置用户密码' }
];

const actionOpts = ref(ACTION_OPTS);

const RESULT_LABELS: Record<string, string> = {
  success: '成功',
  failed: '失败'
};

function resultLabel(result: string): string {
  return RESULT_LABELS[result] ?? result;
}
</script>

<style scoped></style>