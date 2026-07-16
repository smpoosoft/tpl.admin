<template>
  <Password v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </Password>
</template>

<script setup lang="ts">
import Password from 'primevue/password';

const modelValue = defineModel<string>();
defineOptions({ inheritAttrs: false });
</script>