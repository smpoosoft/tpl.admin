<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">详情页面</span>
    </template>
    <div class="p2">
      <Panel header="订单信息">
        <div class="grid">
          <div class="col-12 md:col-6 flex flex-column gap-1 mb-3">
            <span class="text-sm text-surface-500">订单编号</span>
            <span class="font-medium">{{ detail.orderNo }}</span>
          </div>
          <div class="col-12 md:col-6 flex flex-column gap-1 mb-3">
            <span class="text-sm text-surface-500">客户名称</span>
            <span class="font-medium">{{ detail.customer }}</span>
          </div>
          <div class="col-12 md:col-6 flex flex-column gap-1 mb-3">
            <span class="text-sm text-surface-500">订单分类</span>
            <span class="font-medium">{{ detail.category }}</span>
          </div>
          <div class="col-12 md:col-6 flex flex-column gap-1 mb-3">
            <span class="text-sm text-surface-500">订单金额</span>
            <span class="font-medium">{{ detail.amount }}</span>
          </div>
          <div class="col-12 md:col-6 flex flex-column gap-1 mb-3">
            <span class="text-sm text-surface-500">订单状态</span>
            <span class="font-medium">
              <Tag :value="detail.status" severity="success" />
            </span>
          </div>
          <div class="col-12 md:col-6 flex flex-column gap-1 mb-3">
            <span class="text-sm text-surface-500">下单日期</span>
            <span class="font-medium">{{ detail.orderDate }}</span>
          </div>
          <div class="col-12 md:col-6 flex flex-column gap-1 mb-3">
            <span class="text-sm text-surface-500">经办人</span>
            <span class="font-medium">{{ detail.handler }}</span>
          </div>
          <div class="col-12 flex flex-column gap-1 mb-3">
            <span class="text-sm text-surface-500">备注</span>
            <span class="font-medium">{{ detail.remark }}</span>
          </div>
        </div>
      </Panel>

      <Panel header="处理记录" class="mt-3">
        <div class="flex flex-column gap-3">
          <div
            v-for="(record, index) in records"
            :key="index"
            class="flex items-start gap-3"
          >
            <div class="flex flex-column align-items-center" style="min-width: 2rem;">
              <div
                class="w-2rem h-2rem border-circle flex align-items-center justify-content-center"
                :class="record.completed ? 'bg-primary' : 'bg-surface-200'"
              >
                <i
                  class="text-sm"
                  :class="record.completed ? 'pi pi-check text-white' : 'pi pi-clock text-surface-500'"
                />
              </div>
              <div
                v-if="index < records.length - 1"
                class="w-1px flex-1"
                :class="record.completed ? 'bg-primary' : 'bg-surface-200'"
                style="min-height: 1.5rem;"
              />
            </div>
            <div class="flex-1 pb-3">
              <div class="flex items-center gap-2 mb-1">
                <Tag :value="record.status" :severity="record.severity" />
                <span class="text-sm text-surface-500">{{ record.time }}</span>
              </div>
              <div class="text-sm font-medium">{{ record.handler }}</div>
              <div class="text-sm text-surface-400">{{ record.note }}</div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel header="附件" class="mt-3">
        <div class="flex flex-column gap-2">
          <div
            v-for="(file, index) in attachments"
            :key="index"
            class="flex items-center justify-content-between p-2 border-1 border-surface-200 border-round"
          >
            <div class="flex items-center gap-2">
              <i class="pi pi-file text-primary" />
              <div class="flex flex-column">
                <span class="font-medium text-sm">{{ file.name }}</span>
                <span class="text-xs text-surface-400">{{ file.size }}</span>
              </div>
            </div>
            <Button
              icon="pi pi-download"
              text
              rounded
              severity="secondary"
              v-tooltip.left="'下载'"
            />
          </div>
        </div>
      </Panel>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import TRouterPanel from 'primevue/panel';
import Panel from 'primevue/panel';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import { ref } from 'vue';

interface DetailData {
  orderNo: string;
  customer: string;
  category: string;
  amount: number;
  status: string;
  orderDate: string;
  handler: string;
  remark: string;
}

interface RecordItem {
  status: string;
  severity: string;
  handler: string;
  time: string;
  note: string;
  completed: boolean;
}

interface AttachmentItem {
  name: string;
  size: string;
}

const detail = ref<DetailData>({
  orderNo: 'ORD-2025-0001',
  customer: '张明',
  category: '电子产品',
  amount: 12800,
  status: '已完成',
  orderDate: '2025-03-15',
  handler: '王经理',
  remark: '加急处理'
});

const records = ref<RecordItem[]>([
  {
    status: '已创建',
    severity: 'info',
    handler: '系统',
    time: '2025-03-15 09:00',
    note: '订单自动创建',
    completed: true
  },
  {
    status: '审核中',
    severity: 'warn',
    handler: '李主管',
    time: '2025-03-15 10:30',
    note: '已提交审核',
    completed: true
  },
  {
    status: '处理中',
    severity: 'info',
    handler: '王经理',
    time: '2025-03-15 14:00',
    note: '开始处理订单',
    completed: true
  },
  {
    status: '已完成',
    severity: 'success',
    handler: '王经理',
    time: '2025-03-16 11:00',
    note: '订单处理完成，客户已签收',
    completed: false
  }
]);

const attachments = ref<AttachmentItem[]>([
  { name: '订单合同_v2.pdf', size: '2.4 MB' },
  { name: '客户确认单.png', size: '856 KB' },
  { name: '物流单据.xlsx', size: '128 KB' }
]);
</script>