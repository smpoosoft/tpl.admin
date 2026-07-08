<template>
  <Panel header="Panel Header" :pt="panelPt">
    <div v-for="i in 50" :key="i" class="content-row">Content row {{ i }}</div>
    <template #footer>
      <div class="panel-footer-inner">Panel Footer</div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel';

import type { PanelPassThroughOptions } from 'primevue/panel';

const panelPt: PanelPassThroughOptions = {
  root: { class: 'panel-wrpper' },
  contentContainer: { class: 'panel-content-container' },
  contentWrapper: { class: 'panel-content-wrapper' },
  content: { class: 'panel-content' }
};
</script>

<style lang="scss" scoped>
.panel-wrpper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  :deep(.panel-content-container) {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  :deep(.panel-content-wrapper) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :deep(.panel-content) {
    flex: 1;
    overflow-y: auto;
  }

  .content-row {
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
  }

  .panel-footer-inner {
    padding: 12px 16px;
    text-align: center;
  }
}
</style>
