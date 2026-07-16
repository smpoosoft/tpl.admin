<template>
  <ToggleSwitch v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </ToggleSwitch>
</template>

<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch';

defineProps<{ modelValue?: boolean }>();
defineEmits<{ 'update:modelValue': [value: boolean] }>();
defineOptions({ inheritAttrs: false });
</script>
