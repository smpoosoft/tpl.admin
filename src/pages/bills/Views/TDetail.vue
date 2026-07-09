<template>
  <TRouterPanel>
    <template #header>
      <div class="flex items-center gap-2">
        <i class="pi pi-receipt text-primary" />
        <span class="font-bold text-lg">详情页面</span>
      </div>
    </template>

    <div class="detail-content">
      <!-- 订单信息 -->
      <Panel header="订单信息">
        <div class="order-info-grid">
          <div class="info-field">
            <span class="info-label">订单编号</span>
            <span class="info-value">{{ detail.orderNo }}</span>
          </div>
          <div class="info-field">
            <span class="info-label">客户名称</span>
            <span class="info-value">{{ detail.customer }}</span>
          </div>
          <div class="info-field">
            <span class="info-label">订单分类</span>
            <span class="info-value">{{ detail.category }}</span>
          </div>
          <div class="info-field">
            <span class="info-label">订单金额</span>
            <span class="info-value highlight">{{ detail.amount }}</span>
          </div>
          <div class="info-field">
            <span class="info-label">订单状态</span>
            <span class="info-value">
              <Tag :value="detail.status" severity="success" />
            </span>
          </div>
          <div class="info-field">
            <span class="info-label">下单日期</span>
            <span class="info-value">{{ detail.orderDate }}</span>
          </div>
          <div class="info-field">
            <span class="info-label">经办人</span>
            <span class="info-value">{{ detail.handler }}</span>
          </div>
          <div class="info-field">
            <span class="info-label">下单日期</span>
            <span class="info-value">{{ detail.orderDate }}</span>
          </div>
          <div class="info-field full-width">
            <span class="info-label">备注</span>
            <span class="info-value">{{ detail.remark }}</span>
          </div>
        </div>
      </Panel>

      <!-- 处理记录 -->
      <Panel header="处理记录" class="mt-3">
        <div class="timeline">
          <div
            v-for="(record, index) in records"
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-node-col">
              <div
                class="timeline-dot"
                :class="record.completed ? 'completed' : 'pending'"
              >
                <i
                  class="text-xs"
                  :class="record.completed ? 'pi pi-check' : 'pi pi-clock'"
                />
              </div>
              <div
                v-if="index < records.length - 1"
                class="timeline-line"
                :class="record.completed ? 'completed' : 'pending'"
              />
            </div>
            <div class="timeline-body">
              <div class="flex align-items-start justify-content-between">
                <div class="flex items-center gap-2 mb-2">
                  <Tag :value="record.status" :severity="record.severity" />
                </div>
                <span class="timeline-time">{{ record.time }}</span>
              </div>
              <div class="timeline-handler">
                <i class="pi pi-user text-xs text-primary mr-1" />
                {{ record.handler }}
              </div>
              <div class="timeline-note">{{ record.note }}</div>
            </div>
          </div>
        </div>
      </Panel>

      <!-- 附件 -->
      <Panel header="附件" class="mt-3">
        <div class="attachment-list">
          <div
            v-for="(file, index) in attachments"
            :key="index"
            class="attachment-item"
          >
            <div class="attachment-icon">
              <i :class="getFileIcon(file.name)" />
            </div>
            <div class="attachment-info">
              <span class="attachment-name">{{ file.name }}</span>
              <span class="attachment-size">{{ file.size }}</span>
            </div>
            <Button
              icon="pi pi-download"
              text
              rounded
              severity="secondary"
              class="download-btn"
              v-tooltip.left="'下载'"
            />
          </div>
        </div>
      </Panel>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import Panel from 'primevue/panel';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
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

function getFileIcon(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return 'pi pi-file-pdf';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
      return 'pi pi-image';
    case 'xlsx':
    case 'xls':
    case 'csv':
      return 'pi pi-file-excel';
    case 'doc':
    case 'docx':
      return 'pi pi-file-word';
    case 'zip':
    case 'rar':
    case '7z':
      return 'pi pi-file-archive';
    default:
      return 'pi pi-file';
  }
}
</script>

<style scoped lang="scss">
.detail-content {
  padding: 1.25rem;
  height: 100%;
  overflow-y: auto;
}

/* ── Order Info Grid ── */
.order-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  background: var(--p-surface-50);
  border-radius: 0.5rem;
  border: 1px solid var(--p-surface-200);
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: var(--p-primary-300);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  }

  &.full-width {
    grid-column: 1 / -1;
  }
}

.info-label {
  font-size: 0.75rem;
  color: var(--p-surface-500);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.info-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-surface-800);

  &.highlight {
    color: var(--p-primary-600);
    font-size: 1rem;
  }
}

/* ── Timeline ── */
.timeline {
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0;
}

.timeline-item {
  display: flex;
  gap: 1rem;
}

.timeline-node-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 2rem;
}

.timeline-dot {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.75rem;
  transition: background 0.2s, transform 0.2s;

  &.completed {
    background: var(--p-primary-500);
    color: #fff;
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--p-primary-500) 18%, transparent);
  }

  &.pending {
    background: var(--p-surface-200);
    color: var(--p-surface-500);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--p-surface-500) 12%, transparent);
  }
}

.timeline-line {
  width: 2px;
  flex: 1;
  min-height: 1.5rem;
  transition: background 0.2s;

  &.completed {
    background: linear-gradient(to bottom, var(--p-primary-500), color-mix(in srgb, var(--p-primary-500) 50%, var(--p-surface-200)));
  }

  &.pending {
    background: var(--p-surface-200);
  }
}

.timeline-body {
  flex: 1;
  padding-bottom: 1.5rem;
}

.timeline-time {
  font-size: 0.75rem;
  color: var(--p-surface-400);
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.timeline-handler {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--p-surface-700);
  margin-bottom: 0.25rem;
}

.timeline-note {
  font-size: 0.8125rem;
  color: var(--p-surface-400);
  line-height: 1.5;
}

/* ── Attachment List ── */
.attachment-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--p-surface-200);
  border-radius: 0.5rem;
  background: var(--p-surface-0);
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: var(--p-primary-300);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
}

.attachment-icon {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--p-primary-500) 10%, transparent);
  color: var(--p-primary-600);
  font-size: 1.125rem;
  flex-shrink: 0;
}

.attachment-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.attachment-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-surface-800);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attachment-size {
  font-size: 0.75rem;
  color: var(--p-surface-400);
}

.download-btn {
  flex-shrink: 0;
}
</style>