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

const modelValue = defineModel<any>();
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const expandedKeys = ref<Record<string, boolean>>({});

const normalizedValue = computed(() => {
  const v = modelValue.value;
  if (!v) return null;
  if (typeof v === 'string') return { [v]: true };
  return v;
});

let snapshotValue: any = null;

const initSnapshot = () => {
  snapshotValue = modelValue.value ? { ...modelValue.value } : null;
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
  snapshotValue = normalizedValue.value ? { ...normalizedValue.value } : null;
};

const denormalize = (value: any): any => {
  if (!value) return null;
  const keys = Object.keys(value);
  if (keys.length === 1) return keys[0];
  return value;
};

const onUpdateModelValue = (value: any) => {
  if (!attrs.allowGroupSelected) {
    const oldKeys = Object.keys(normalizedValue.value || {});
    const newKeys = Object.keys(value || {});
    const addedKey = newKeys.find(k => !oldKeys.includes(k));
    if (addedKey) {
      const node = findNodeByKey(addedKey, getOptions());
      if (node?.children?.length) {
        return;
      }
    }
  }
  modelValue.value = denormalize(value);
};

const onNodeSelect = (node: any) => {
  if (node.children?.length) {
    if (!attrs.allowGroupSelected) {
      modelValue.value = denormalize(snapshotValue);
    }
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