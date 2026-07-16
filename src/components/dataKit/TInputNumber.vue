<template>
  <InputNumber v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </InputNumber>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';

defineProps<{ modelValue?: number | null }>();
defineEmits<{ 'update:modelValue': [value: number | null] }>();
defineOptions({ inheritAttrs: false });
</script>
