<template>
  <DatePicker v-bind="$attrs" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </DatePicker>
</template>

<script setup lang="ts">
import DatePicker from 'primevue/datepicker';

defineProps<{ modelValue?: any }>();
defineEmits<{ 'update:modelValue': [value: any] }>();
defineOptions({ inheritAttrs: false });
</script>
