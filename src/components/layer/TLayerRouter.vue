<template>
  <div class="card h-full">
    <Panel :pt="panelPt">
      <template v-if="!hideHeader" #header>
        <div class="flex items-center gap-2">
          <!-- 标题， 增删查改等按钮的插槽 -->
          <slot name="header">
            <span class="font-bold">路由页面</span>
          </slot>
        </div>
      </template>
      <template v-if="!hideIcons" #icons>
        <!-- 操作按钮的插槽 -->
        <slot name="icons"></slot>
        <Button icon="pi pi-cog" severity="secondary" rounded text />
        <Menu ref="refOptMenu" id="config_menu" :model="ROUTER_PANEL_ITEMS" popup />
      </template>
      <template v-if="!hideFooter" #footer>
        <!-- 页脚的插槽 -->
        <slot name="footer">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <Button icon="pi pi-user" rounded text></Button>
              <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
            </div>
            <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
          </div>
        </slot>
      </template>

      <div class="h-full">
        <!-- 内容区域的插槽 -->
        <slot></slot>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// import { useToast } from 'primevue/usetoast';
// import { useRouter } from 'vue-router';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { ROUTER_PANEL_ITEMS } from '@/constant/uiKit';

const props = defineProps<{
  hideHeader?: boolean,
  hideIcons?: boolean,
  hideFooter?: boolean,
  rootClass?: string,
}>();

const refOptMenu = ref(null);

const panelPt = computed(() => ({
  root: { class: ['h-full overHidden', props.rootClass] },
  contentContainer: { class: 'min-h-0 overHidden' },
  contentWrapper: { class: 'roterPanelDataWrapper fullWH overHidden' },
  content: { class: 'h-full' }
}));
// const toast = useToast();
// const router = useRouter();

// const save = () => {
//   toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
// };
</script>

<style scoped lang="scss">
:deep(.p-panel) {
  display: flex !important;
  flex-direction: column;
}

:deep(.p-panel-content-container) {
  flex: 1;
  min-height: 0;
}

:deep(.roterPanelDataWrapper) {
  display: grid;
  grid-template-rows: 1fr minmax(auto, 30px);
}

:deep(.p-panel-content) {
  height: 100%;
}
</style>
