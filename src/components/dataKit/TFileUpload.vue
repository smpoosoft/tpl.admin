<template>
  <FileUpload v-bind="$attrs">
    <slot v-for="(_, name) in $slots" :name="name" />
  </FileUpload>
</template>

<script setup lang="ts">
import FileUpload from 'primevue/fileupload';

defineOptions({ inheritAttrs: false });
</script>
