<template>
  <InputMask v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </InputMask>
</template>

<script setup lang="ts">
import InputMask from 'primevue/inputmask';

defineProps<{ modelValue?: string }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
defineOptions({ inheritAttrs: false });
</script>
