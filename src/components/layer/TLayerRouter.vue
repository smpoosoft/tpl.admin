<template>
  <div class="card h-full">
    <Card :pt="cardLayoutPt()">
      <!-- 卡片头插槽 -->
      <template v-if="!hideHeader" #title>
        <div class="flex items-center gap-2">
          <span class="flexVY">
            <span class="font-bold">{{ imt.bizIdentNamezh || '未定义' }}</span>
            <span v-if="imt.description" class="text-surface-500 text-sm font-medium dark:text-surface-400">{{
              imt.description }}</span>
          </span>
          <!-- 标题， 增删查改等按钮的插槽 -->
          <slot name="header">
          </slot>
        </div>
      </template>
      <!-- <template v-if="!hideIcons" #icons>
        <slot name="icons"></slot>
        <Button icon="pi pi-cog" severity="secondary" rounded text />
        <Menu ref="refOptMenu" id="config_menu" :model="ROUTER_PANEL_ITEMS" popup />
      </template> -->

      <template #content>
        <div class="h-full">
          <!-- 内容区域的插槽 -->
          <slot></slot>
        </div>
      </template>

      <!-- 卡片脚注插槽 -->
      <template v-if="!hideFooter" #footer>
        <slot name="footer">
          <!-- <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <Button icon="pi pi-user" rounded text></Button>
              <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
            </div>
            <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
          </div> -->
        </slot>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { NOrm } from 'tvoid_types';
// import { ref, computed } from 'vue';
// import { useToast } from 'primevue/usetoast';
// import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { cardLayoutPt } from '@/assets/ts/preSet';
// import Menu from 'primevue/menu';
// import { ROUTER_PANEL_ITEMS } from '@/constant/uiKit';

defineProps<{
  imt: NOrm.IImt,
  hideHeader?: boolean,
  hideIcons?: boolean,
  hideFooter?: boolean,
  rootClass?: string,
}>();

// const refOptMenu = ref(null);

// const panelPt = computed(() => ({
//   root: { class: ['h-full overHidden', props.rootClass] },
//   contentContainer: { class: 'min-h-0 overHidden' },
//   contentWrapper: { class: 'roterPanelDataWrapper fullWH overHidden' },
//   content: { class: 'h-full' }
// }));
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
