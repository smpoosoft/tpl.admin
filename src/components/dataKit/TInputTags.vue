<template>
  <div ref="wrapperRef" class="t-input-tags-wrap" :class="wrapClass">
    <div v-if="overflowCount && !allowGrow" class="t-tag-overflow-chip">+{{ overflowCount }}</div>
    <InputTags
      v-bind="$attrs"
      :model-value="visibleTags"
      @update:model-value="onTagsChange"
    >
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </InputTags>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import InputTags from 'primevue/inputtags';

const props = defineProps<{
  modelValue?: any[];
  allowGrow?: boolean;
  maxTags?: number;
}>();
const emit = defineEmits<{
  'update:modelValue': [value: any[]];
}>();
defineOptions({ inheritAttrs: false });

const maxTagCount = computed(() => {
  if (props.maxTags && props.maxTags > 0) return props.maxTags;
  return 1;
});

const overflowCount = computed(() => {
  if (!props.modelValue) return 0;
  return Math.max(0, props.modelValue.length - maxTagCount.value);
});

const visibleTags = computed(() => {
  if (!props.modelValue || props.allowGrow) return props.modelValue;
  return props.modelValue.slice(0, maxTagCount.value);
});

const wrapClass = computed(() => ({
  't-input-tags-grow': props.allowGrow,
  't-input-tags-lock': !props.allowGrow,
}));

let prevVisible: any[] = [];

watch(visibleTags, (v) => {
  prevVisible = [...v];
}, { immediate: true });

const onTagsChange = (value: any[]) => {
  if (props.allowGrow || !props.modelValue) {
    emit('update:modelValue', value);
    return;
  }
  const hiddenLen = props.modelValue.length - maxTagCount.value;
  const removedIdx = prevVisible.findIndex((tag, i) => tag !== value[i] || value.length <= i);
  if (removedIdx !== -1) {
    const full = [...props.modelValue];
    full.splice(removedIdx, 1);
    emit('update:modelValue', full);
    return;
  }
  if (value.length > maxTagCount.value) {
    emit('update:modelValue', value);
    return;
  }
  emit('update:modelValue', [...value, ...props.modelValue.slice(maxTagCount.value)]);
};
</script>

<style scoped lang="scss">
.t-input-tags-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  min-width: 0;
}

.t-input-tags-wrap :deep(.p-inputtags) {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.t-input-tags-lock :deep(.p-inputtags) {
  flex-wrap: nowrap;
}

.t-input-tags-lock :deep(.p-inputtags-tag),
.t-input-tags-lock :deep(.p-chip) {
  flex-shrink: 0;
}

.t-tag-overflow-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  background: var(--p-surface-200);
  color: var(--p-surface-600);
  flex-shrink: 0;
  margin-right: 4px;
  cursor: default;
}

:root.dark .t-tag-overflow-chip {
  background: var(--p-surface-700);
  color: var(--p-surface-300);
}
</style>