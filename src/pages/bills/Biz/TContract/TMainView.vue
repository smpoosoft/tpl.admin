<template>
  <TRouterPanel :imt>
    <template #header>
      <span class="font-bold">合同管理</span>
    </template>

    <div class="p2 flex flex-col gap-3">
      <Panel header="查询条件" toggleable>
        <div class="grid grid-cols-12 gap-x-4 gap-y-3">
          <div class="col-span-12 md:col-span-6 flex items-center gap-2">
            <label class="whitespace-nowrap text-sm text-primary-700">区间:</label>
            <DatePicker v-model="filter.dateFrom" showIcon class="w-full" />
            <span class="text-primary-700">至</span>
            <DatePicker v-model="filter.dateTo" showIcon class="w-full" />
          </div>
          <div class="col-span-12 md:col-span-3 flex items-center gap-2">
            <label class="whitespace-nowrap text-sm text-primary-700">所属项目:</label>
            <Select v-model="filter.project" :options="projectOpts" optionLabel="label" optionValue="value" placeholder="请选择" class="w-full" />
          </div>
          <div class="col-span-12 md:col-span-3 flex items-center gap-2">
            <label class="whitespace-nowrap text-sm text-primary-700">业务员:</label>
            <Select v-model="filter.salesperson" :options="salespersonOpts" optionLabel="label" optionValue="value" placeholder="请选择" class="w-full" />
          </div>
          <div class="col-span-12 md:col-span-3 flex items-center gap-2">
            <label class="whitespace-nowrap text-sm text-primary-700">对接人:</label>
            <Select v-model="filter.contact" :options="contactOpts" optionLabel="label" optionValue="value" placeholder="请选择" class="w-full" />
          </div>
          <div class="col-span-12 md:col-span-3 flex items-center gap-2">
            <label class="whitespace-nowrap text-sm text-primary-700">介绍人:</label>
            <Select v-model="filter.referrer" :options="referrerOpts" optionLabel="label" optionValue="value" placeholder="请选择" class="w-full" />
          </div>
          <div class="col-span-12 flex gap-2 pt-1">
            <Button label="查询" icon="pi pi-search" size="small" @click="doSearch" />
            <Button label="重置" icon="pi pi-refresh" severity="secondary" size="small" @click="resetFilter" />
          </div>
        </div>
      </Panel>

      <div class="flex gap-2">
        <Button label="财务数据导出Excel" icon="pi pi-file-excel" severity="success" outlined size="small" />
        <Button label="合同数据导出Excel" icon="pi pi-file-excel" severity="info" outlined size="small" />
      </div>

      <DataTable :value="filteredContracts" stripedRows paginator :rows="15" :rowsPerPageOptions="[10, 15, 20, 50]" dataKey="id" sortable class="w-full">
        <Column field="id" header="序号" sortable style="min-width:6rem" />
        <Column field="salesperson" header="业务员" sortable style="min-width:6rem" />
        <Column field="signDate" header="合同日期" sortable style="min-width:7rem" />
        <Column field="name" header="合同名称" sortable style="min-width:12rem" />
        <Column field="contact" header="对接人" sortable style="min-width:6rem" />
        <Column field="project" header="所属项目" sortable style="min-width:8rem" />
        <Column field="referrer" header="介绍人" sortable style="min-width:6rem" />
        <Column field="amount" header="合同金额" sortable style="min-width:8rem">
          <template #body="slotProps">{{ formatCurrency(slotProps.data.amount) }}</template>
        </Column>
        <Column field="collected" header="累计收款额" sortable style="min-width:8rem">
          <template #body="slotProps">{{ formatCurrency(slotProps.data.collected) }}</template>
        </Column>
        <Column field="invoiced" header="累计开票额" sortable style="min-width:8rem">
          <template #body="slotProps">{{ formatCurrency(slotProps.data.invoiced) }}</template>
        </Column>
        <Column field="status" header="状态" sortable style="min-width:6rem">
          <template #body="slotProps">
            <Tag :value="statusLabel(slotProps.data.status)" :severity="statusSeverity(slotProps.data.status)" />
          </template>
        </Column>
        <Column field="partyA" header="甲方单位" sortable style="min-width:10rem" />
        <Column field="partyB" header="乙方单位" sortable style="min-width:10rem" />
      </DataTable>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import TRouterPanel from '@/components/layer/TLayerRouter.vue';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import { CONTRACT_STATUS_OPTS } from '@/mock/bizData.ts';

interface ContractRow {
  id: string;
  salesperson: string;
  signDate: string;
  name: string;
  contact: string;
  project: string;
  referrer: string;
  amount: number;
  collected: number;
  invoiced: number;
  status: string;
  partyA: string;
  partyB: string;
}

const contracts: ContractRow[] = [
  { id: '1', salesperson: '罗双', signDate: '2025-01-15', name: '企业年度软件许可协议', contact: '王芳', project: '工程评审', referrer: '李华', amount: 480000, collected: 480000, invoiced: 480000, status: 'active', partyA: '云创科技', partyB: '我司' },
  { id: '2', salesperson: '兰颖', signDate: '2025-02-20', name: '数据中心托管服务合同', contact: '赵强', project: '工程审计', referrer: '张明', amount: 1250000, collected: 800000, invoiced: 800000, status: 'active', partyA: '数海信息', partyB: '我司' },
  { id: '3', salesperson: '总公司', signDate: '2025-03-08', name: '品牌策划与设计外包协议', contact: '孙丽', project: '工程造价', referrer: '周杰', amount: 260000, collected: 130000, invoiced: 260000, status: 'pending', partyA: '锐意广告', partyB: '我司' },
  { id: '4', salesperson: '罗双', signDate: '2025-03-25', name: '人力资源外包服务合同', contact: '吴敏', project: '招标代理', referrer: '陈志', amount: 720000, collected: 720000, invoiced: 360000, status: 'active', partyA: '智联人力', partyB: '我司' },
  { id: '5', salesperson: '兰颖', signDate: '2025-04-10', name: '办公设备采购合同', contact: '郑涛', project: '工程监理', referrer: '冯雅', amount: 185000, collected: 0, invoiced: 0, status: 'draft', partyA: '晨光办公', partyB: '我司' },
  { id: '6', salesperson: '总公司', signDate: '2025-05-06', name: '物流配送年度框架协议', contact: '王芳', project: '工程评审', referrer: '李华', amount: 960000, collected: 480000, invoiced: 480000, status: 'active', partyA: '顺捷物流', partyB: '我司' },
  { id: '7', salesperson: '罗双', signDate: '2025-06-18', name: '网络安全审计服务合同', contact: '赵强', project: '工程审计', referrer: '张明', amount: 340000, collected: 340000, invoiced: 340000, status: 'expired', partyA: '安恒信息', partyB: '我司' },
  { id: '8', salesperson: '兰颖', signDate: '2025-07-01', name: '员工培训体系建设合同', contact: '孙丽', project: '工程造价', referrer: '周杰', amount: 158000, collected: 79000, invoiced: 79000, status: 'pending', partyA: '博学教育', partyB: '我司' },
  { id: '9', salesperson: '总公司', signDate: '2025-08-12', name: '云计算资源租赁协议', contact: '吴敏', project: '招标代理', referrer: '陈志', amount: 2100000, collected: 1050000, invoiced: 2100000, status: 'active', partyA: '阿里云', partyB: '我司' },
  { id: '10', salesperson: '罗双', signDate: '2025-09-05', name: '市场推广年度合作合同', contact: '郑涛', project: '工程监理', referrer: '冯雅', amount: 580000, collected: 580000, invoiced: 580000, status: 'terminated', partyA: '引力传媒', partyB: '我司' },
];

const projectOpts = [
  { label: '全部', value: '' },
  { label: '工程评审', value: '工程评审' },
  { label: '工程审计', value: '工程审计' },
  { label: '工程造价', value: '工程造价' },
  { label: '招标代理', value: '招标代理' },
  { label: '工程监理', value: '工程监理' },
];

const salespersonOpts = [
  { label: '全部', value: '' },
  { label: '总公司', value: '总公司' },
  { label: '罗双', value: '罗双' },
  { label: '兰颖', value: '兰颖' },
];

const contactOpts = [
  { label: '全部', value: '' },
  { label: '王芳', value: '王芳' },
  { label: '赵强', value: '赵强' },
  { label: '孙丽', value: '孙丽' },
  { label: '吴敏', value: '吴敏' },
  { label: '郑涛', value: '郑涛' },
];

const referrerOpts = [
  { label: '全部', value: '' },
  { label: '李华', value: '李华' },
  { label: '张明', value: '张明' },
  { label: '周杰', value: '周杰' },
  { label: '陈志', value: '陈志' },
  { label: '冯雅', value: '冯雅' },
];

const filter = reactive({
  dateFrom: null as Date | null,
  dateTo: null as Date | null,
  project: '',
  salesperson: '',
  contact: '',
  referrer: '',
});

function resetFilter(): void {
  filter.dateFrom = null;
  filter.dateTo = null;
  filter.project = '';
  filter.salesperson = '';
  filter.contact = '';
  filter.referrer = '';
}

function doSearch(): void {
  // reactive filter triggers computed automatically
}

const filteredContracts = computed(() => {
  return contracts.filter((c) => {
    if (filter.project && c.project !== filter.project) return false;
    if (filter.salesperson && c.salesperson !== filter.salesperson) return false;
    if (filter.contact && c.contact !== filter.contact) return false;
    if (filter.referrer && c.referrer !== filter.referrer) return false;
    if (filter.dateFrom) {
      const d = new Date(c.signDate);
      d.setHours(0, 0, 0, 0);
      const from = new Date(filter.dateFrom);
      from.setHours(0, 0, 0, 0);
      if (d < from) return false;
    }
    if (filter.dateTo) {
      const d = new Date(c.signDate);
      d.setHours(0, 0, 0, 0);
      const to = new Date(filter.dateTo);
      to.setHours(0, 0, 0, 0);
      if (d > to) return false;
    }
    return true;
  });
});

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 0 }).format(amount);
}

function statusLabel(status: string): string {
  return CONTRACT_STATUS_OPTS.find((o) => o.value === status)?.label ?? status;
}

function statusSeverity(status: string): string {
  return CONTRACT_STATUS_OPTS.find((o) => o.value === status)?.severity ?? 'info';
}
import * as imt from './imt';
</script>
