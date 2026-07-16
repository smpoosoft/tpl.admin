<template>
  <ToggleSwitch v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </ToggleSwitch>
</template>

<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch';

const modelValue = defineModel<boolean>();
defineOptions({ inheritAttrs: false });
</script>