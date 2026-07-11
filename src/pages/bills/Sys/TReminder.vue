<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">提醒管理</span>
    </template>

    <div class="p2">
      <div class="grid grid-cols-12 gap-4">
        <!-- Left: Form -->
        <div class="col-span-4">
          <Panel header="添加提醒">
            <div class="flex flex-col gap-3">
              <div>
                <label class="block mb-1 text-sm font-medium">事项</label>
                <InputText v-model="form.summary" class="w-full" placeholder="请输入事项" />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium">单位</label>
                <InputText v-model="form.unit" class="w-full" placeholder="请输入单位" />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium">相关人</label>
                <InputText v-model="form.person" class="w-full" placeholder="请输入相关人" />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium">经办人</label>
                <Select
                  v-model="form.handler"
                  :options="HANDLER_OPTS"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full"
                  placeholder="请选择经办人"
                />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium">监督人</label>
                <Select
                  v-model="form.supervisor"
                  :options="HANDLER_OPTS"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full"
                  placeholder="请选择监督人"
                />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium">优先级</label>
                <Select
                  v-model="form.priority"
                  :options="PRIORITY_OPTS"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full"
                  placeholder="请选择优先级"
                />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium">截止日期</label>
                <DatePicker v-model="form.deadline" class="w-full" dateFormat="yy-mm-dd" />
              </div>
              <div class="flex items-center gap-2 mt-2">
                <Button label="保存" severity="primary" @click="onSave" />
                <Button label="重置" severity="secondary" @click="onReset" />
              </div>
            </div>
          </Panel>
        </div>

        <!-- Right: List -->
        <div class="col-span-8">
          <DataTable
            :value="reminders"
            stripedRows
            paginator
            :rows="10"
            :rowsPerPageOptions="[10, 20, 50]"
            class="w-full"
          >
            <Column field="summary" header="事项" sortable />
            <Column field="unit" header="单位" sortable />
            <Column field="person" header="相关人" sortable />
            <Column field="handler" header="经办人" sortable />
            <Column field="deadline" header="截止日期" sortable />
            <Column field="priority" header="优先级">
              <template #body="{ data }">
                <Tag :value="priorityLabel(data.priority)" :severity="prioritySeverity(data.priority)" />
              </template>
            </Column>
            <Column field="status" header="状态">
              <template #body="{ data }">
                <Tag :value="statusLabel(data.status)" :severity="statusSeverity(data.status)" />
              </template>
            </Column>
            <Column header="操作" headerStyle="width: 8rem">
              <template #body="{ data }">
                <div class="flex items-center gap-1">
                  <Button icon="pi pi-pencil" severity="secondary" text rounded size="small" @click="onEdit(data)" />
                  <Button icon="pi pi-trash" severity="danger" text rounded size="small" @click="onDelete(data)" />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Reminder } from '@/mock/sysData.ts';
import TRouterPanel from '@/components/layer/TLayerRouter.vue';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import { REMINDERS, PRIORITY_OPTS } from '@/mock/sysData.ts';

const HANDLER_OPTS = [
  { label: '孙丽', value: '孙丽' },
  { label: '赵强', value: '赵强' },
  { label: '陈志', value: '陈志' },
  { label: '冯雅', value: '冯雅' },
  { label: '郑涛', value: '郑涛' },
  { label: '王芳', value: '王芳' },
  { label: '李华', value: '李华' },
  { label: 'admin', value: 'admin' }
];

const PRIORITY_LABELS: Record<string, string> = {
  urgent: '紧急',
  high: '高',
  normal: '普通',
  low: '低'
};

const PRIORITY_SEVERITY: Record<string, string> = {
  urgent: 'danger',
  high: 'warn',
  normal: 'info',
  low: 'contrast'
};

const STATUS_LABELS: Record<string, string> = {
  pending: '待处理',
  processing: '处理中',
  completed: '已完成'
};

const STATUS_SEVERITY: Record<string, string> = {
  pending: 'warn',
  processing: 'info',
  completed: 'success'
};

const reminders = ref<Reminder[]>([...REMINDERS]);
const editingId = ref<string | null>(null);
const form = ref<Omit<Reminder, 'id'>>(emptyForm());

function emptyForm(): Omit<Reminder, 'id'> {
  return {
    summary: '',
    unit: '',
    person: '',
    handler: '',
    supervisor: '',
    deadline: '',
    priority: '',
    status: 'pending'
  };
}

function priorityLabel(val: string): string {
  return PRIORITY_LABELS[val] ?? val;
}

function prioritySeverity(val: string): string {
  return PRIORITY_SEVERITY[val] ?? 'info';
}

function statusLabel(val: string): string {
  return STATUS_LABELS[val] ?? val;
}

function statusSeverity(val: string): string {
  return STATUS_SEVERITY[val] ?? 'info';
}

function onSave(): void {
  if (editingId.value) {
    const idx = reminders.value.findIndex((r) => r.id === editingId.value);
    if (idx !== -1) {
      reminders.value[idx] = { ...form.value, id: editingId.value } as Reminder;
    }
    editingId.value = null;
  } else {
    const ids = reminders.value.map((r) => Number.parseInt(r.id.replace('R', ''), 10));
    const next = String(Math.max(0, ...ids) + 1).padStart(3, '0');
    reminders.value.push({ ...form.value, id: `R${next}` } as Reminder);
  }
  onReset();
}

function onEdit(data: Reminder): void {
  editingId.value = data.id;
  form.value = {
    summary: data.summary,
    unit: data.unit,
    person: data.person,
    handler: data.handler,
    supervisor: data.supervisor,
    deadline: data.deadline,
    priority: data.priority,
    status: data.status
  };
}

function onDelete(data: Reminder): void {
  reminders.value = reminders.value.filter((r) => r.id !== data.id);
}

function onReset(): void {
  form.value = emptyForm();
  editingId.value = null;
}
</script>

<style scoped></style>
