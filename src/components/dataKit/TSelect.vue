<template>
  <Select v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </Select>
</template>

<script setup lang="ts">
import Select from 'primevue/select';

defineProps<{ modelValue?: any }>();
defineEmits<{ 'update:modelValue': [value: any] }>();
defineOptions({ inheritAttrs: false });
</script>
