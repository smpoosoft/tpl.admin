<template>
  <TRouterPanel :imt>
    <template #header>
      <span class="flexSplit"></span>
      <ButtonGroup>
        <Button v-for="n in 4" :key="n" :label="`${n}列`" size="small" :variant="columns === n ? '' : 'outlined'"
          @click="columns = n as 1 | 2 | 3 | 4"></Button>
      </ButtonGroup>
      <Button label="取消" size="small" outlined @click="handleCancel" />
      <Button label="保存" size="small" @click="handleSave" />
    </template>

    <Panel v-model:collapsed="collapsedPanel1" toggleable>
      <template #header>
        <span class="flexSplit handLike fontW4" @click="collapsedPanel1 = !collapsedPanel1">基本信息</span>
      </template>
      <TForm v-model="form" :columns="columns" label-layout="horizontal" label-align="right">
        <TFormItem label="订单编号" field="orderNo" type="text" disabled />
        <TFormItem label="客户名称" field="customer" type="text" placeholder="请输入客户名称" />
        <TFormItem label="订单分类" field="category" type="text" placeholder="请输入订单分类" />
        <TFormItem label="订单金额" field="amount" type="number" :fraction-digits="2" placeholder="请输入订单金额" />
        <TFormItem label="订单状态" field="status" type="select" :options="statusOptions" placeholder="请选择状态" />
        <TFormItem label="下单日期" field="orderDate" type="date" placeholder="选择日期" />
      </TForm>
    </Panel>

    <Panel v-model:collapsed="collapsedPanel2" toggleable>
      <template #header>
        <span class="flexSplit handLike fontW4" @click="collapsedPanel2 = !collapsedPanel2">详细信息</span>
      </template>
      <TForm v-model="form" :columns="columns" label-layout="horizontal" label-align="right">
        <TFormItem label="交货日期" field="deliveryDate" type="date" placeholder="选择日期" />
        <TFormItem label="经办人" field="handler" type="text" placeholder="请输入经办人" />
        <TFormItem label="是否加急" field="urgent" type="switch" />
        <TFormItem label="有效期" field="validRange" type="dateRange" />
        <TFormItem label="备注" field="remark" type="textarea" :col-span="columns" :rows="4" placeholder="请输入备注信息" />
      </TForm>
    </Panel>

    <template #footer>
      <Toolbar class="formFooter">
        <template #start>
          <TFromSummary v-model="formSummary" />
        </template>
        <template #end>
          <TIcon :name="!allCollapsed ? 'minus' : 'plus'" :size="18" class="pYSm collapseAll handLike"
            @click="collapseAll" />
        </template>
      </Toolbar>
    </template>
  </TRouterPanel>
</template>

<script setup lang="ts">
import TRouterPanel from '@/components/layer/TLayerRouter.vue';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import ButtonGroup from 'primevue/buttongroup';
import TForm from '@/components/formKit/TForm/TForm.vue';
import TFormItem from '@/components/formKit/TForm/TFormItem.vue';
import TFromSummary from '@/components/formKit/TForm/TFromSummary.vue';
import TIcon from '@/components/widget/TIcon.vue';
import Toolbar from 'primevue/toolbar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { IKv } from '@/types/uiKite';
import * as imt from './imt';

interface FormData {
  orderNo: string;
  customer: string;
  category: string;
  amount: number | null;
  status: number | null;
  orderDate: Date | null;
  deliveryDate: Date | null;
  handler: string;
  urgent: boolean;
  validRange: Date[] | null;
  remark: string;
}

const columns = ref<1 | 2 | 3 | 4>(2);
const collapsedPanel1 = ref(false);
const collapsedPanel2 = ref(false);
const allCollapsed = ref(false);

const form = ref<FormData>({
  orderNo: 'auto',
  customer: '',
  category: '',
  amount: null,
  status: null,
  orderDate: null,
  deliveryDate: null,
  handler: '',
  urgent: false,
  validRange: null,
  remark: ''
});

const statusOptions: IKv[] = [
  { id: 1, namezh: '待处理' },
  { id: 2, namezh: '进行中' },
  { id: 3, namezh: '已完成' }
];

const router = useRouter();

const formSummary = ref<{ key: string, value: string, status?: 'succ' | 'err' | 'warn' | 'info' | 'log' }[]>([
  { key: '单据状态', value: '已审批', status: 'succ' },
  { key: '下一步', value: '发货出库' },
  { key: '制单人', value: '系统管理员' },
  { key: '单据日期', value: '2026-07-16' }
]);

const handleSave = (): void => {
  // placeholder: persist logic
};

const handleCancel = (): void => {
  router.back();
};

const collapseAll = () => {
  collapsedPanel1.value = !collapsedPanel1.value;
  collapsedPanel2.value = !collapsedPanel2.value;
};
</script>

<style scoped lang="scss">
:deep(.p-panel) {
  margin-bottom: 12px;
}

.formFooter {
  padding: 0 16px;
  border-radius: 50px;
  font-size: 10px;
  color: var(--p-text-color);
  background: var(--p-content-background);
  border: 1px solid var(--p-content-border-color);

  .collapseAll {
    color: var(--p-text-muted-color);
  }
}
</style>
