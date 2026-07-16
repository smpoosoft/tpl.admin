<template>
  <template v-for="item in summaryData" :key="item.key">
    <span>
      <span class="fontW5">{{ item.key }}：</span>
      <span :class="statusClass(item.status)">{{ item.value }}</span>
    </span>
    <Divider layout="vertical" />
  </template>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';

const summaryData = defineModel<{ key: string, value: string, status?: 'succ' | 'err' | 'warn' | 'info' | 'log' }[]>({
  required: true,
  default: () => []
});

const statusClass = (status?: string) => {
  const map: Record<string, string> = {
    succ: 'textSucc',
    err: 'textErr',
    warn: 'textWarn',
    info: 'textInfo',
    log: 'textLog'
  };
  return status ? (map[status] || 'textNormal') : 'textNormal';
};
</script>

<style lang="scss" scoped></style>
