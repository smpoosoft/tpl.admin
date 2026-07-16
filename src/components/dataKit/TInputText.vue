<template>
  <InputText v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </InputText>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';

const modelValue = defineModel<any>();
defineOptions({ inheritAttrs: false });
</script>