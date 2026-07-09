<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">组织管理</span>
    </template>

    <div class="p2">
      <div class="grid grid-cols-12 gap-4">
        <!-- Left panel: organization tree -->
        <div class="col-span-4">
          <Panel header="组织架构" :pt="{ content: { class: 'p-0' } }">
            <Tree
              :value="orgTree"
              nodeKey="id"
              selectionMode="single"
              v-model:selectionKeys="selectedNodeKey"
              class="w-full"
            />
          </Panel>
        </div>

        <!-- Right panel: detail -->
        <div class="col-span-8">
          <Panel header="节点详情">
            <template v-if="selectedNode">
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-surface-500 dark:text-surface-400 w-24">节点名称</span>
                  <span>{{ selectedNode.label }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-surface-500 dark:text-surface-400 w-24">节点类型</span>
                  <span>{{ typeLabel(selectedNode.type) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-surface-500 dark:text-surface-400 w-24">子节点数</span>
                  <span>{{ selectedNode.children?.length ?? 0 }}</span>
                </div>

                <Divider />

                <div class="flex items-center gap-2">
                  <Button icon="pi pi-plus" label="新增子节点" severity="primary" />
                  <Button icon="pi pi-pencil" label="编辑" severity="secondary" />
                  <Button icon="pi pi-trash" label="删除" severity="danger" text />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="flex items-center justify-center text-surface-400 dark:text-surface-500 h-32">
                <span>请从左侧选择组织节点</span>
              </div>
            </template>
          </Panel>
        </div>
      </div>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import Tree from 'primevue/tree';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import { ORG_TREE } from '@/mock/sysData.ts';

const orgTree = ref(ORG_TREE);
const selectedNodeKey = ref<string | null>(null);

const TYPE_LABEL_MAP: Record<string, string> = {
  company: '公司',
  dept: '部门',
  team: '团队'
};

function typeLabel(type?: string): string {
  return TYPE_LABEL_MAP[type ?? ''] ?? type ?? '-';
}

function findNodeById(nodes: typeof orgTree.value, id: string): typeof orgTree.value[number] | null {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

const selectedNode = computed(() => {
  if (!selectedNodeKey.value) {
    return null;
  }
  return findNodeById(orgTree.value, selectedNodeKey.value);
});
</script>

<style scoped></style>