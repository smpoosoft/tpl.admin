<template>
  <RadioButtonGroup v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </RadioButtonGroup>
</template>

<script setup lang="ts">
import RadioButtonGroup from 'primevue/radiobuttongroup';

const modelValue = defineModel<any>();
defineOptions({ inheritAttrs: false });
</script>