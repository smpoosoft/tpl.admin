<template>
  <InputText v-bind="$attrs" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </InputText>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';

defineProps<{ modelValue?: any }>();
defineEmits<{ 'update:modelValue': [value: any] }>();
defineOptions({ inheritAttrs: false });
</script>
