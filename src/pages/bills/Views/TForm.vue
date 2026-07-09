<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">表单页面</span>
    </template>
    <div class="p2">
      <Panel header="基本信息">
        <div class="grid formgrid p-fluid">
          <div class="col-12 md:col-6 mb-2">
            <div class="field">
              <label for="orderNo">订单编号</label>
              <InputText id="orderNo" v-model="form.orderNo" disabled />
            </div>
          </div>
          <div class="col-12 md:col-6 mb-2">
            <div class="field">
              <label for="customer">客户名称</label>
              <InputText id="customer" v-model="form.customer" placeholder="请输入客户名称" />
            </div>
          </div>
          <div class="col-12 md:col-6 mb-2">
            <div class="field">
              <label for="category">订单分类</label>
              <InputText id="category" v-model="form.category" placeholder="请输入订单分类" />
            </div>
          </div>
          <div class="col-12 md:col-6 mb-2">
            <div class="field">
              <label for="amount">订单金额</label>
              <InputText id="amount" v-model="form.amount" placeholder="请输入订单金额" />
            </div>
          </div>
          <div class="col-12 md:col-6 mb-2">
            <div class="field">
              <label for="status">订单状态</label>
              <Select id="status" v-model="form.status" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="请选择状态" />
            </div>
          </div>
          <div class="col-12 md:col-6 mb-2">
            <div class="field">
              <label for="orderDate">下单日期</label>
              <DatePicker id="orderDate" v-model="form.orderDate" dateFormat="yy-mm-dd" showIcon fluid />
            </div>
          </div>
        </div>
      </Panel>

      <Panel header="详细信息" class="mt-3">
        <div class="grid formgrid p-fluid">
          <div class="col-12 md:col-6 mb-2">
            <div class="field">
              <label for="deliveryDate">交货日期</label>
              <DatePicker id="deliveryDate" v-model="form.deliveryDate" dateFormat="yy-mm-dd" showIcon fluid />
            </div>
          </div>
          <div class="col-12 md:col-6 mb-2">
            <div class="field">
              <label for="handler">经办人</label>
              <InputText id="handler" v-model="form.handler" placeholder="请输入经办人" />
            </div>
          </div>
          <div class="col-12 mb-2">
            <div class="field">
              <label for="remark">备注</label>
              <Textarea id="remark" v-model="form.remark" rows="4" placeholder="请输入备注信息" />
            </div>
          </div>
        </div>
      </Panel>

      <div class="mt-3">
        <Button label="保存" icon="pi pi-check" />
        <Button label="取消" icon="pi pi-times" class="ml-2" outlined />
      </div>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import TRouterPanel from 'primevue/panel';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
import { ref } from 'vue';

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
</script>