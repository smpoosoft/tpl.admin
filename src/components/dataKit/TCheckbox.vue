<template>
  <div class="flex items-center justify-center">
    <div class="flex items-center gap-2">
      <Checkbox v-model="checked" binary inputId="preview-checkbox" />
      <Label for="preview-checkbox">
        <slot></slot>
      </Label>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import Label from 'primevue/label';

const checked = defineModel<boolean>({ required: false, default: false });
</script>
