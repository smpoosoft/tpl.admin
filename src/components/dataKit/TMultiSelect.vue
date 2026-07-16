<template>
  <MultiSelect v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </MultiSelect>
</template>

<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';

const modelValue = defineModel<any[]>();
defineOptions({ inheritAttrs: false });
</script>