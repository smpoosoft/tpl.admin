<template>
  <InputMask v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </InputMask>
</template>

<script setup lang="ts">
import InputMask from 'primevue/inputmask';

const modelValue = defineModel<string>();
defineOptions({ inheritAttrs: false });
</script>