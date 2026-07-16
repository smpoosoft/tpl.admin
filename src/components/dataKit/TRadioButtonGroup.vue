<template>
  <RadioButtonGroup v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </RadioButtonGroup>
</template>

<script setup lang="ts">
import RadioButtonGroup from 'primevue/radiobuttongroup';

defineProps<{ modelValue?: any }>();
defineEmits<{ 'update:modelValue': [value: any] }>();
defineOptions({ inheritAttrs: false });
</script>
