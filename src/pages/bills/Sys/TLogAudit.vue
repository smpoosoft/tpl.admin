<template>
  <TRouterPanel>
    <template #header>
      <i class="pi pi-history mr-1" />
      <span class="font-bold">系统日志</span>
    </template>

    <div class="p-4 flex flex-col gap-4 h-full">
      <!-- Filter bar -->
      <div class="flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <DatePicker
            v-model="dateRange"
            selectionMode="range"
            placeholder="选择日期范围"
            class="w-64"
            size="small"
          />
          <Select
            v-model="selectedAction"
            :options="actionOpts"
            placeholder="操作类型"
            class="w-44"
            showClear
            size="small"
          />
          <Button
            icon="pi pi-search"
            severity="secondary"
            text
            rounded
            size="small"
            v-tooltip.top="'查询'"
          />
        </div>
        <span class="text-sm text-surface-500 dark:text-surface-400">
          共
          <strong class="text-surface-700 dark:text-surface-200">{{ auditLogs.length }}</strong>
          条日志记录
        </span>
      </div>

      <!-- Data table -->
      <DataTable
        :value="auditLogs"
        stripedRows
        paginator
        :rows="15"
        :rowsPerPageOptions="[15, 30, 50]"
        :currentPageReportTemplate="'显示第 {first} 至第 {last} 条，共 {totalRecords} 条记录'"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        tableStyle="min-width: 60rem"
        size="small"
        showGridlines
        :pt="{
          header: {
            class: 'bg-surface-50 dark:bg-surface-800'
          },
          row: {
            class: 'h-10'
          }
        }"
      >
        <Column
          field="user"
          header="用户"
          sortable
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 8rem"
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <span class="user-avatar">{{ data.user.charAt(0).toUpperCase() }}</span>
              <span>{{ data.user }}</span>
            </div>
          </template>
        </Column>
        <Column
          field="action"
          header="操作"
          sortable
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 8rem"
        />
        <Column
          field="target"
          header="目标"
          sortable
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 8rem"
        />
        <Column
          field="ip"
          header="IP 地址"
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 10rem"
        >
          <template #body="{ data }">
            <span class="font-mono text-xs">{{ data.ip }}</span>
          </template>
        </Column>
        <Column
          field="time"
          header="时间"
          sortable
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 11rem"
        />
        <Column
          field="result"
          header="结果"
          headerClass="font-semibold text-surface-600 dark:text-surface-300"
          style="min-width: 7rem"
        >
          <template #body="{ data }">
            <Tag
              :value="resultLabel(data.result)"
              :severity="data.result === 'success' ? 'success' : 'danger'"
              :icon="data.result === 'success' ? 'pi pi-check-circle' : 'pi pi-times-circle'"
              class="px-2 py-0.5 text-xs"
            />
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
import Button from 'primevue/button';
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

<style scoped lang="scss">
.user-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--p-primary-100, #e0e7ff);
  color: var(--p-primary-700, #4338ca);
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  flex-shrink: 0;
}

.dark .user-avatar {
  background: var(--p-primary-900, #312e81);
  color: var(--p-primary-200, #c7d2fe);
}
</style>
