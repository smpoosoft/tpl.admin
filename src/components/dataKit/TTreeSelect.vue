<template>
  <TreeSelect v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </TreeSelect>
</template>

<script setup lang="ts">
import TreeSelect from 'primevue/treeselect';

defineProps<{ modelValue?: any }>();
defineEmits<{ 'update:modelValue': [value: any] }>();
defineOptions({ inheritAttrs: false });
</script>
