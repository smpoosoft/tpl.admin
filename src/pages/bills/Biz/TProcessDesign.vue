<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">流程设计</span>
    </template>

    <div class="p2">
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="group in processGroups"
          :key="group.name"
        >
          <Panel :header="group.name">
            <div class="flex flex-col gap-1">
              <div
                v-for="item in group.items"
                :key="item.id"
                class="flex items-start gap-3 rounded-md p-3 cursor-pointer transition-colors duration-150 hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <i :class="item.icon" class="mt-0.5 text-lg text-primary" />
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm text-surface-900 dark:text-surface-100">
                    {{ item.name }}
                  </div>
                  <div class="mt-0.5 text-xs text-surface-500 dark:text-surface-400 leading-normal">
                    {{ item.description }}
                  </div>
                </div>
                <i class="pi pi-chevron-right mt-1 text-xs text-surface-400" />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import Panel from 'primevue/panel';
import { PROCESS_ITEMS } from '@/mock/bizData.ts';

interface ProcessGroup {
  name: string;
  items: typeof PROCESS_ITEMS;
}

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
    items
  }));
});
</script>

<style scoped></style>