<template>
  <InputNumber v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </InputNumber>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';

const modelValue = defineModel<number | null>();
defineOptions({ inheritAttrs: false });
</script>