<template>
  <Checkbox v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </Checkbox>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';

const modelValue = defineModel<any>();
defineOptions({ inheritAttrs: false });
</script>