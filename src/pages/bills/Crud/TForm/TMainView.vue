<template>
  <TRouterPanel :imt>
    <template #header>
      <span class="flexSplit"></span>
      <ButtonGroup>
        <Button v-for="n in 4" :key="n" :label="`${n}列`" size="small" :variant="columns === n ? '' : 'outlined'"
          @click="columns = n as 1 | 2 | 3 | 4"></Button>
      </ButtonGroup>
      <Divider layout="vertical" />

      <ButtonGroup>
        <Button label="左右结构" size="small" :variant="labelLayout === 'horizontal' ? '' : 'outlined'"
          @click="labelLayout = 'horizontal'" />
        <Button label="上下结构" size="small" :variant="labelLayout === 'vertical' ? '' : 'outlined'"
          @click="labelLayout = 'vertical'" />
      </ButtonGroup>
      <Button label="取消" size="small" outlined @click="handleCancel" />
      <Button label="保存" size="small" @click="handleSave" />
    </template>

    <Panel v-model:collapsed="collapsedPanel1" toggleable>
      <template #header>
        <span class="flexSplit handLike fontW4" @click="collapsedPanel1 = !collapsedPanel1">基本信息</span>
      </template>
      <TForm v-model="form" :columns="columns" :label-layout="labelLayout" label-align="right">
        <TFormItem label="订单编号" field="orderNo" type="text" disabled />
        <TFormItem label="客户名称" field="customer" type="text" required placeholder="请输入客户名称" />
        <TFormItem label="订单分类" field="category" type="select" :options="categoryOptions" placeholder="请选择分类" />
        <TFormItem label="订单金额" field="amount" type="number" :fraction-digits="2" placeholder="请输入订单金额" />
        <TFormItem label="订单状态" field="status" type="select" :options="statusOptions" placeholder="请选择状态" />
        <TFormItem label="下单日期" field="orderDate" type="date" placeholder="选择日期" />
      </TForm>
    </Panel>

    <Panel v-model:collapsed="collapsedPanel2" toggleable>
      <template #header>
        <span class="flexSplit handLike fontW4" @click="collapsedPanel2 = !collapsedPanel2">联系信息</span>
      </template>
      <TForm v-model="form" :columns="columns" :label-layout="labelLayout" label-align="right">
        <TFormItem label="联系电话" field="phone" type="mask" mask="999-9999-9999" placeholder="请输入手机号" />
        <TFormItem label="身份证号" field="idCard" type="mask" mask="999999999999999999" placeholder="请输入身份证号" />
        <TFormItem label="收货地址" field="address" type="text" placeholder="请输入收货地址" />
        <TFormItem label="标签" field="tags" type="multiSelect" :options="tagOptions" placeholder="请选择标签" />
        <TFormItem label="经办人" field="handler" type="autoComplete" :options="handlerOptions" placeholder="搜索经办人" />
        <TFormItem label="交货日期" field="deliveryDate" type="date" placeholder="选择日期" />
      </TForm>
    </Panel>

    <Panel v-model:collapsed="collapsedPanel3" toggleable>
      <template #header>
        <span class="flexSplit handLike fontW4" @click="collapsedPanel3 = !collapsedPanel3">其他信息</span>
      </template>
      <TForm v-model="form" :columns="columns" :label-layout="labelLayout" label-align="right">
        <TFormItem label="优先级" field="priority" type="radio" :options="priorityOptions" />
        <TFormItem label="是否加急" field="urgent" type="switch" />
        <TFormItem label="是否默认" field="isDefault" type="checkbox" />
        <TFormItem label="访问密码" field="accessCode" type="password" placeholder="请输入访问密码" />
        <TFormItem label="有效期" field="validRange" type="dateRange" />
        <TFormItem label="备注" field="remark" type="textarea" :col-span="columns" :rows="3" placeholder="请输入备注信息" />
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
  category: number | null;
  amount: number | null;
  status: number | null;
  orderDate: Date | null;
  phone: string;
  idCard: string;
  address: string;
  tags: number[];
  handler: string;
  deliveryDate: Date | null;
  priority: number | null;
  urgent: boolean;
  isDefault: boolean;
  accessCode: string;
  validRange: Date[] | null;
  remark: string;
}

const columns = ref<1 | 2 | 3 | 4>(2);
const labelLayout = ref<'horizontal' | 'vertical'>('horizontal');
const collapsedPanel1 = ref(false);
const collapsedPanel2 = ref(false);
const collapsedPanel3 = ref(false);
const allCollapsed = ref(false);

const form = ref<FormData>({
  orderNo: 'ORD-2026-0001',
  customer: '',
  category: null,
  amount: null,
  status: null,
  orderDate: null,
  phone: '',
  idCard: '',
  address: '',
  tags: [],
  handler: '',
  deliveryDate: null,
  priority: null,
  urgent: false,
  isDefault: false,
  accessCode: '',
  validRange: null,
  remark: ''
});

const categoryOptions: IKv[] = [
  { id: 1, namezh: '普通订单' },
  { id: 2, namezh: '加急订单' },
  { id: 3, namezh: '退货订单' }
];

const statusOptions: IKv[] = [
  { id: 1, namezh: '待处理' },
  { id: 2, namezh: '进行中' },
  { id: 3, namezh: '已完成' },
  { id: 4, namezh: '已取消' }
];

const tagOptions: IKv[] = [
  { id: 1, namezh: 'VIP客户' },
  { id: 2, namezh: '新客户' },
  { id: 3, namezh: '长期合作' },
  { id: 4, namezh: '需要跟进' }
];

const handlerOptions: IKv[] = [
  { id: 1, namezh: '张三' },
  { id: 2, namezh: '李四' },
  { id: 3, namezh: '王五' },
  { id: 4, namezh: '赵六' }
];

const priorityOptions: IKv[] = [
  { id: 1, namezh: '低' },
  { id: 2, namezh: '中' },
  { id: 3, namezh: '高' }
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
  const newState = !allCollapsed.value;
  allCollapsed.value = newState;
  collapsedPanel1.value = newState;
  collapsedPanel2.value = newState;
  collapsedPanel3.value = newState;
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
