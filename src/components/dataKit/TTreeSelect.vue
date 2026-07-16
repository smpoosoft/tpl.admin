<template>
  <TreeSelect
    ref="tsRef"
    v-bind="$attrs"
    selection-mode="multiple"
    meta-key-selection
    :model-value="modelValue"
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
import { ref, useAttrs } from 'vue';
import TreeSelect from 'primevue/treeselect';

const props = defineProps<{ modelValue?: any }>();
const emit = defineEmits<{ 'update:modelValue': [value: any] }>();
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const expandedKeys = ref<Record<string, boolean>>({});

let snapshotValue: any = null;

const initSnapshot = () => {
  snapshotValue = props.modelValue ? { ...props.modelValue } : null;
};
initSnapshot();

const findNodeByKey = (key: string, nodes: any[]): any | null => {
  for (const node of nodes) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findNodeByKey(key, node.children);
      if (found) return found;
    }
  }
  return null;
};

const getOptions = (): any[] => (attrs.options as any[]) || [];

const onBeforeShow = () => {
  snapshotValue = props.modelValue ? { ...props.modelValue } : null;
};

const onUpdateModelValue = (value: any) => {
  emit('update:modelValue', value);
};

const onNodeSelect = (node: any) => {
  if (node.children?.length) {
    emit('update:modelValue', snapshotValue);
    const key = node.key;
    const newKeys = { ...expandedKeys.value };
    if (newKeys[key]) {
      delete newKeys[key];
    } else {
      newKeys[key] = true;
    }
    expandedKeys.value = newKeys;
  } else {
    snapshotValue = { ...(props.modelValue || {}) };
  }
};
</script>
