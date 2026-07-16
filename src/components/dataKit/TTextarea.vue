<template>
  <Textarea v-bind="$attrs" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-for="(_, name) in $slots" :name="name" />
  </Textarea>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea';

defineProps<{ modelValue?: string }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
defineOptions({ inheritAttrs: false });
</script>
