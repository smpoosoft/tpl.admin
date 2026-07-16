<template>
  <InputPassword v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </InputPassword>
</template>

<script setup lang="ts">
import InputPassword from 'primevue/password';

defineProps<{ modelValue?: string }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
defineOptions({ inheritAttrs: false });
</script>
