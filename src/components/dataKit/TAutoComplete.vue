<template>
  <AutoComplete v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </AutoComplete>
</template>

<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';

defineProps<{ modelValue?: any }>();
defineEmits<{ 'update:modelValue': [value: any] }>();
defineOptions({ inheritAttrs: false });
</script>
