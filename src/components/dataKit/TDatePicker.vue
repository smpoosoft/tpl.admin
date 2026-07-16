<template>
  <DatePicker v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </DatePicker>
</template>

<script setup lang="ts">
import DatePicker from 'primevue/datepicker';

const modelValue = defineModel<any>();
defineOptions({ inheritAttrs: false });
</script>