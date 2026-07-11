<template>
  <TRouterPanel>
    <template #header>
      <div class="flex items-center gap-2">
        <span class="font-bold">流程设计</span>
        <span class="text-sm text-primary-700">业务流程配置</span>
      </div>
    </template>

    <template #icons>
      <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems">
        <template #item="{ item, props }">
          <a :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </template>

    <div class="p2 h-full">
      <div class="flex gap-4 h-full">
        <!-- Left sidebar: process groups -->
        <div class="w-64 shrink-0 flex flex-col gap-3">
          <Panel header="业务项">
            <div class="flex flex-col gap-2">
              <div
                v-for="group in processGroups"
                :key="group.name"
                class="flex flex-col gap-1"
              >
                <div class="text-xs font-semibold text-primary-700 px-1 py-0.5 mt-1 first:mt-0">
                  {{ group.displayName }}
                </div>
                <div
                  v-for="item in group.items"
                  :key="item.id"
                  class="flex items-start gap-2 rounded-md p-2 cursor-pointer transition-colors duration-150 hover:bg-surface-100 dark:hover:bg-surface-700"
                  :class="{ 'bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-300 dark:ring-primary-600': selectedItemId === item.id }"
                  @click="selectedItemId = item.id"
                >
                  <i :class="item.icon" class="mt-0.5 text-base text-primary shrink-0" />
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">
                      {{ item.name }}
                    </div>
                    <div class="mt-0.5 text-xs text-surface-500 dark:text-surface-400 leading-normal line-clamp-2">
                      {{ item.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <!-- Main area: process flow builder -->
        <div class="flex-1 min-w-0 flex flex-col gap-3">
          <Panel header="流程编排">
            <div class="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-lg bg-surface-50 dark:bg-surface-800/50">
              <!-- Flow builder placeholder with nodes and arrows -->
              <div class="flex items-center gap-6 px-8">
                <div class="flex flex-col items-center gap-1">
                  <div class="w-14 h-14 rounded-full bg-primary text-primary-contrast flex items-center justify-center shadow-sm">
                    <i class="pi pi-user-plus text-xl" />
                  </div>
                  <span class="text-xs font-medium text-surface-700 dark:text-surface-200">发起</span>
                </div>
                <i class="pi pi-arrow-right text-2xl text-surface-400" />
                <div class="flex flex-col items-center gap-1">
                  <div class="w-14 h-14 rounded-lg bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-300 flex items-center justify-center border border-surface-300 dark:border-surface-600 shadow-sm">
                    <i class="pi pi-pencil text-xl" />
                  </div>
                  <span class="text-xs font-medium text-surface-700 dark:text-surface-200">审批</span>
                </div>
                <i class="pi pi-arrow-right text-2xl text-surface-400" />
                <div class="flex flex-col items-center gap-1">
                  <div class="w-14 h-14 rounded-lg bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-300 flex items-center justify-center border border-surface-300 dark:border-surface-600 shadow-sm">
                    <i class="pi pi-check-circle text-xl" />
                  </div>
                  <span class="text-xs font-medium text-surface-700 dark:text-surface-200">审核</span>
                </div>
                <i class="pi pi-arrow-right text-2xl text-surface-400" />
                <div class="flex flex-col items-center gap-1">
                  <div class="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm">
                    <i class="pi pi-flag text-xl" />
                  </div>
                  <span class="text-xs font-medium text-surface-700 dark:text-surface-200">完成</span>
                </div>
              </div>
              <span class="mt-6 text-sm text-primary-700">选中左侧流程项目以编辑节点配置</span>
            </div>
          </Panel>
        </div>

        <!-- Right panel: node settings -->
        <div class="w-72 shrink-0 flex flex-col gap-3">
          <Panel header="节点配置">
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-xs text-primary-700">节点名称</label>
                <InputText v-model="nodeConfig.name" placeholder="请输入节点名称" class="w-full" />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs text-primary-700">审批人</label>
                <Select v-model="nodeConfig.approver" :options="approverOpts" optionLabel="label" optionValue="value" placeholder="请选择审批人" class="w-full" />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs text-primary-700">审批方式</label>
                <Select v-model="nodeConfig.mode" :options="approvalModes" optionLabel="label" optionValue="value" placeholder="请选择" class="w-full" />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs text-primary-700">超时处理</label>
                <Select v-model="nodeConfig.timeout" :options="timeoutOpts" optionLabel="label" optionValue="value" placeholder="请选择" class="w-full" />
              </div>
              <div class="flex items-center gap-2 pt-2">
                <Button label="保存" icon="pi pi-check" size="small" class="w-full" @click="saveConfig" />
                <Button label="取消" icon="pi pi-times" severity="secondary" size="small" class="w-full" @click="cancelConfig" />
              </div>
            </div>
          </Panel>

          <Panel header="操作">
            <div class="flex flex-col gap-2">
              <Button label="保存流程" icon="pi pi-save" class="w-full" @click="saveFlow" />
              <Button label="取消" icon="pi pi-undo" severity="secondary" class="w-full" @click="cancelFlow" />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import TRouterPanel from '@/components/layer/TLayerRouter.vue';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Breadcrumb from 'primevue/breadcrumb';
import { PROCESS_ITEMS } from '@/mock/bizData.ts';

interface ProcessGroup {
  name: string;
  displayName: string;
  items: typeof PROCESS_ITEMS;
}

const GROUP_LABEL_MAP: Record<string, string> = {
  HR: '人资管理',
  Admin: '行政管理',
  Finance: '财务管理'
};

interface NodeConfig {
  name: string;
  approver: string;
  mode: string;
  timeout: string;
}

const toast = useToast();

const breadcrumbHome = ref({ label: '首页', route: '/' });
const breadcrumbItems = ref([
  { label: '系统管理' },
  { label: '业务流程配置' }
]);

const selectedItemId = ref<string | null>(null);

const nodeConfig = ref<NodeConfig>({
  name: '',
  approver: '',
  mode: '',
  timeout: ''
});

const approverOpts = ref([
  { label: '部门经理', value: 'manager' },
  { label: '总监', value: 'director' },
  { label: '总经理', value: 'gm' },
  { label: 'HR', value: 'hr' }
]);

const approvalModes = ref([
  { label: '单人审批', value: 'single' },
  { label: '会签（全部同意）', value: 'countersign_all' },
  { label: '会签（任一同意）', value: 'countersign_any' },
  { label: '逐级审批', value: 'sequential' }
]);

const timeoutOpts = ref([
  { label: '自动通过', value: 'auto_approve' },
  { label: '自动驳回', value: 'auto_reject' },
  { label: '转交上级', value: 'escalate' },
  { label: '不作处理', value: 'none' }
]);

const processGroups = computed<ProcessGroup[]>(() => {
  const map = new Map<string, typeof PROCESS_ITEMS>();

  for (const item of PROCESS_ITEMS) {
    const list = map.get(item.group);

    if (list) {
      list.push(item);
    } else {
      map.set(item.group, [item]);
    }
  }

  return Array.from(map.entries()).map(([name, items]) => ({
    name,
    displayName: GROUP_LABEL_MAP[name] || name,
    items
  }));
});

const saveConfig = () => {
  toast.add({ severity: 'success', summary: '配置已保存', detail: '节点配置已更新', life: 3000 });
};

const cancelConfig = () => {
  nodeConfig.value = { name: '', approver: '', mode: '', timeout: '' };
  toast.add({ severity: 'info', summary: '已取消', detail: '配置已重置', life: 3000 });
};

const saveFlow = () => {
  toast.add({ severity: 'success', summary: '流程已保存', detail: '业务流程配置已更新', life: 3000 });
};

const cancelFlow = () => {
  selectedItemId.value = null;
  nodeConfig.value = { name: '', approver: '', mode: '', timeout: '' };
  toast.add({ severity: 'info', summary: '已取消', detail: '未保存的更改已放弃', life: 3000 });
};
</script>

<style scoped lang="scss"></style>
