<template>
  <TreeSelect
    ref="tsRef"
    v-bind="$attrs"
    selection-mode="multiple"
    meta-key-selection
    :model-value="normalizedValue"
    :expanded-keys="expandedKeys"
    @update:model-value="onUpdateModelValue"
    @update:expanded-keys="expandedKeys = $event"
    @before-show="onBeforeShow"
    @node-select="onNodeSelect"
  >
    <slot v-for="(_, name) in $slots" :name="name" />
  </TreeSelect>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue';
import TreeSelect from 'primevue/treeselect';

const props = defineProps<{ modelValue?: any }>();
const emit = defineEmits<{ 'update:modelValue': [value: any] }>();
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const expandedKeys = ref<Record<string, boolean>>({});

const normalizedValue = computed(() => {
  const v = props.modelValue;
  if (!v) return null;
  if (typeof v === 'string') return { [v]: true };
  return v;
});

let snapshotValue: any = null;

const initSnapshot = () => {
  snapshotValue = props.modelValue ? { ...props.modelValue } : null;
};
initSnapshot();

const denormalize = (value: any): any => {
  if (!value) return null;
  const keys = Object.keys(value);
  if (keys.length === 1) return keys[0];
  return value;
};

const onBeforeShow = () => {
  snapshotValue = normalizedValue.value ? { ...normalizedValue.value } : null;
};

const onUpdateModelValue = (value: any) => {
  emit('update:modelValue', denormalize(value));
};

const onNodeSelect = (node: any) => {
  if (node.children?.length) {
    emit('update:modelValue', denormalize(snapshotValue));
    const key = node.key;
    const newKeys = { ...expandedKeys.value };
    if (newKeys[key]) {
      delete newKeys[key];
    } else {
      newKeys[key] = true;
    }
    expandedKeys.value = newKeys;
  } else {
    snapshotValue = normalizedValue.value ? { ...normalizedValue.value } : null;
  }
};
</script>
