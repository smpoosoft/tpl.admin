<template>
  <AutoComplete v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </AutoComplete>
</template>

<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';

const modelValue = defineModel<any>();
defineOptions({ inheritAttrs: false });
</script>