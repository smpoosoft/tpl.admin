<template>
  <FileUpload v-bind="$attrs" v-model:files="files">
    <slot v-for="(_, name) in $slots" :name="name" />
  </FileUpload>
</template>

<script setup lang="ts">
import FileUpload from 'primevue/fileupload';

const files = defineModel<any[]>('files');
defineOptions({ inheritAttrs: false });
</script>