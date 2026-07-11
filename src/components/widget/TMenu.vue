<template>
  <div class="card flex justify-center">
    <PanelMenu :model="modelValue" class="w-full md:w-80">
      <template #item="{ item }">
        <a v-ripple class="flex items-center px-4 py-2 cursor-pointer group"
          @click="onItemClick($event, item as TMenuItem)">
          <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
          <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          <span v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-primary-700 text-xs p-1">{{ item.shortcut }}</span>
        </a>
      </template>
    </PanelMenu>
  </div>
</template>

<script setup lang="ts">
import PanelMenu from 'primevue/panelmenu';
import Badge from 'primevue/badge';
import { useRouter } from 'vue-router';

export interface TMenuItem {
  label: string;
  icon?: string;
  badge?: number;
  shortcut?: string;
  items?: TMenuItem[];
  path?: string;
  route?: string;
  target?: string;
  disabled?: boolean;
  visible?: boolean;
}

const modelValue = defineModel<TMenuItem[]>({ required: true, default: () => [] });
const router = useRouter();

const onItemClick = (event: Event, item: TMenuItem): void => {
  const targetPath = item.path ?? item.route;
  if (targetPath) {
    event.preventDefault();
    router.push(targetPath);
  }
};
</script>
