<template>
  <InputTags v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </InputTags>
</template>

<script setup lang="ts">
import InputTags from 'primevue/inputtags';

defineProps<{ modelValue?: any[] }>();
defineEmits<{ 'update:modelValue': [value: any[]] }>();
defineOptions({ inheritAttrs: false });
</script>
