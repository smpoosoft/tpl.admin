<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold text-lg">表单页面</span>
    </template>
    <div class="form-page">
      <Panel header="基本信息">
        <div class="grid formgrid p-fluid">
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="orderNo">订单编号</label>
              <InputText id="orderNo" v-model="form.orderNo" disabled />
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="customer">客户名称</label>
              <InputText id="customer" v-model="form.customer" placeholder="请输入客户名称" />
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="category">订单分类</label>
              <InputText id="category" v-model="form.category" placeholder="请输入订单分类" />
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="amount">订单金额</label>
              <InputText id="amount" v-model="form.amount" placeholder="请输入订单金额" />
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="status">订单状态</label>
              <Select
                id="status"
                v-model="form.status"
                :options="statusOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="请选择状态"
              />
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="orderDate">下单日期</label>
              <DatePicker
                id="orderDate"
                v-model="form.orderDate"
                dateFormat="yy-mm-dd"
                showIcon
                fluid
                placeholder="选择日期"
              />
            </div>
          </div>
        </div>
      </Panel>

      <Panel header="详细信息">
        <div class="grid formgrid p-fluid">
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="deliveryDate">交货日期</label>
              <DatePicker
                id="deliveryDate"
                v-model="form.deliveryDate"
                dateFormat="yy-mm-dd"
                showIcon
                fluid
                placeholder="选择日期"
              />
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="handler">经办人</label>
              <InputText id="handler" v-model="form.handler" placeholder="请输入经办人" />
            </div>
          </div>
          <div class="col-12">
            <div class="field">
              <label for="remark">备注</label>
              <Textarea id="remark" v-model="form.remark" rows="4" placeholder="请输入备注信息" />
            </div>
          </div>
        </div>
      </Panel>

      <div class="form-actions">
        <Button label="取消" icon="pi pi-times" severity="secondary" outlined @click="handleCancel" />
        <Button label="保存" icon="pi pi-check" @click="handleSave" />
      </div>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface FormData {
  orderNo: string;
  customer: string;
  category: string;
  amount: string | null;
  status: string;
  orderDate: Date | null;
  deliveryDate: Date | null;
  handler: string;
  remark: string;
}

const form = ref<FormData>({
  orderNo: 'auto',
  customer: '',
  category: '',
  amount: null,
  status: '',
  orderDate: null,
  deliveryDate: null,
  handler: '',
  remark: ''
});

const statusOptions = [
  { label: '待处理', value: 'pending' },
  { label: '进行中', value: 'processing' },
  { label: '已完成', value: 'done' }
];

const router = useRouter();

const handleSave = (): void => {
  // placeholoder: persist logic
};

const handleCancel = (): void => {
  router.back();
};
</script>

<style scoped lang="scss">
.form-page {
  padding: 1.5rem;
  max-width: 960px;
  margin: 0 auto;

  :deep(.p-panel) {
    margin-bottom: 1.25rem;

    .p-panel-header {
      padding: 0.875rem 1.25rem;
    }

    .p-panel-content {
      padding: 1.5rem;
    }
  }

  .field {
    margin-bottom: 1.25rem;

    label {
      display: block;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--text-color-secondary, #64748b);
      margin-bottom: 0.375rem;
      line-height: 1.4;
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.5rem;
  }
}
</style>