<template>
  <div class="tForm" :class="{ singleColumn: columns === 1 }" :style="formStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, toRef } from 'vue';
import type { TFormContext, TFormProps } from './types';

const props = withDefaults(defineProps<TFormProps>(), {
  columns: 2,
  labelAlign: 'right',
  labelLayout: 'horizontal',
  labelWidth: '100px',
  gap: 2,
  rowGap: 2,
  showRequired: true
});

provide<TFormContext>('tFormContext', {
  modelValue: toRef(props, 'modelValue'),
  labelAlign: toRef(props, 'labelAlign'),
  labelLayout: toRef(props, 'labelLayout'),
  labelWidth: toRef(props, 'labelWidth'),
  showRequired: toRef(props, 'showRequired')
});

const formStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
  columnGap: `${props.gap * 8}px`,
  rowGap: `${props.rowGap * 8}px`
}));
</script>

<style lang="scss" scoped>
.tForm {
  width: 100%;

  &.singleColumn {
    max-width: 600px;
  }
}
</style>
