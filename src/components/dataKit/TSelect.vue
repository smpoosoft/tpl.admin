<template>
  <Select v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </Select>
</template>

<script setup lang="ts">
import Select from 'primevue/select';

const modelValue = defineModel<any>();
defineOptions({ inheritAttrs: false });
</script>