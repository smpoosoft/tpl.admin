<template>
  <Textarea v-bind="$attrs" v-model:model-value="modelValue">
    <slot v-for="(_, name) in $slots" :name="name" />
  </Textarea>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea';

const modelValue = defineModel<string>();
defineOptions({ inheritAttrs: false });
</script>