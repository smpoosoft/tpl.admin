<template>
  <TRouterPanel>
    <template #header>
      <div class="flex flex-col">
        <span class="font-bold">组织管理</span>
        <small class="text-surface-400 dark:text-surface-500">管理企业组织架构与部门信息</small>
      </div>
    </template>

    <div class="p2">
      <div class="grid grid-cols-12 gap-4">
        <!-- Left: organization tree -->
        <div class="col-span-4">
          <Panel header="组织架构" :pt="{ content: { class: 'p-0' } }">
            <div class="flex items-center gap-2 p-3 pb-0">
              <Button
                icon="pi pi-sync"
                severity="secondary"
                text
                rounded
                size="small"
                v-tooltip.top="'刷新'"
                @click="refreshTree"
              />
              <span class="text-sm text-surface-400 dark:text-surface-500">
                共 {{ flattenCount }} 个节点
              </span>
            </div>
            <Tree
              :value="orgTree"
              nodeKey="id"
              selectionMode="single"
              v-model:selectionKeys="selectedNodeKey"
              class="w-full"
            />
          </Panel>
        </div>

        <!-- Right: detail panel -->
        <div class="col-span-8">
          <Panel header="节点详情">
            <template v-if="selectedNode">
              <div class="flex flex-col gap-4">
                <!-- Node identity card -->
                <div class="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <i
                    class="pi text-xl"
                    :class="nodeIcon(selectedNode.type)"
                    :style="{ color: nodeColor(selectedNode.type) }"
                  ></i>
                  <div class="flex flex-col">
                    <span class="font-semibold text-base">{{ selectedNode.label }}</span>
                    <span class="text-sm text-surface-400 dark:text-surface-500">
                      {{ typeLabel(selectedNode.type) }}
                    </span>
                  </div>
                </div>

                <Divider />

                <!-- Detail fields -->
                <div class="grid grid-cols-2 gap-3">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-surface-500 dark:text-surface-400 w-20">节点 ID</span>
                    <span class="text-sm font-mono">{{ selectedNode.id }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-surface-500 dark:text-surface-400 w-20">节点类型</span>
                    <Tag :value="typeLabel(selectedNode.type)" :severity="typeSeverity(selectedNode.type)" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-surface-500 dark:text-surface-400 w-20">子节点数</span>
                    <span>{{ selectedNode.children?.length ?? 0 }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-surface-500 dark:text-surface-400 w-20">层级深度</span>
                    <span>{{ selectedNodeDepth }} 级</span>
                  </div>
                </div>

                <Divider />

                <!-- Child list if has children -->
                <div v-if="selectedNode.children?.length" class="flex flex-col gap-2">
                  <span class="text-sm font-medium text-surface-500 dark:text-surface-400">下级节点</span>
                  <div class="flex flex-wrap gap-2">
                    <Tag
                      v-for="child in selectedNode.children"
                      :key="child.id"
                      :value="child.label"
                      :severity="typeSeverity(child.type)"
                      rounded
                    />
                  </div>
                </div>

                <Divider />

                <!-- Actions -->
                <div class="flex items-center gap-2">
                  <Button icon="pi pi-plus" label="新增子节点" severity="primary" size="small" />
                  <Button icon="pi pi-pencil" label="编辑" severity="secondary" size="small" />
                  <Button icon="pi pi-trash" label="删除" severity="danger" text size="small" />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="flex flex-col items-center justify-center gap-3 text-surface-400 dark:text-surface-500 h-40">
                <i class="pi pi-sitemap text-4xl"></i>
                <span>请从左侧选择一个组织节点</span>
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
import TRouterPanel from '@/components/layer/TLayerRouter.vue';
import Tree from 'primevue/tree';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Tag from 'primevue/tag';
import Tooltip from 'primevue/tooltip';
import { ORG_TREE } from '@/mock/sysData.ts';
import type { OrgNode } from '@/mock/sysData.ts';

const orgTree = ref<OrgNode[]>(structuredClone(ORG_TREE));
const selectedNodeKey = ref<string | null>(null);

const TYPE_LABEL_MAP: Record<string, string> = {
  company: '公司',
  dept: '部门',
  team: '团队'
};

const TYPE_SEVERITY_MAP: Record<string, string> = {
  company: 'info',
  dept: 'success',
  team: 'warn'
};

const TYPE_ICON_MAP: Record<string, string> = {
  company: 'pi-building',
  dept: 'pi-folder',
  team: 'pi-users'
};

const TYPE_COLOR_MAP: Record<string, string> = {
  company: 'var(--p-cyan-500)',
  dept: 'var(--p-green-500)',
  team: 'var(--p-amber-500)'
};

function typeLabel(type?: string): string {
  return TYPE_LABEL_MAP[type ?? ''] ?? type ?? '-';
}

function typeSeverity(type?: string): string {
  return TYPE_SEVERITY_MAP[type ?? ''] ?? 'info';
}

function nodeIcon(type?: string): string {
  return TYPE_ICON_MAP[type ?? ''] ?? 'pi-question';
}

function nodeColor(type?: string): string {
  return TYPE_COLOR_MAP[type ?? ''] ?? 'var(--p-surface-400)';
}

function findNodeById(nodes: OrgNode[], id: string, depth: number = 0): { node: OrgNode | null; depth: number } {
  for (const node of nodes) {
    if (node.id === id) {
      return { node, depth };
    }
    if (node.children) {
      const result = findNodeById(node.children, id, depth + 1);
      if (result.node) {
        return result;
      }
    }
  }
  return { node: null, depth: 0 };
}

function countNodes(nodes: OrgNode[]): number {
  let count = 0;
  for (const node of nodes) {
    count += 1;
    if (node.children) {
      count += countNodes(node.children);
    }
  }
  return count;
}

const flattenCount = computed(() => countNodes(orgTree.value));

const selectedNode = computed(() => {
  if (!selectedNodeKey.value) {
    return null;
  }
  return findNodeById(orgTree.value, selectedNodeKey.value);
});

const selectedNodeDepth = computed(() => {
  if (!selectedNodeKey.value) {
    return 0;
  }
  return findNodeById(orgTree.value, selectedNodeKey.value).depth;
});

function refreshTree(): void {
  orgTree.value = structuredClone(ORG_TREE);
  selectedNodeKey.value = null;
}
</script>

<style scoped lang="scss">
:deep(.p-tree) {
  border: none;
}
</style>
