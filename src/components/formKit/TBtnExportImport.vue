<template>
  <!-- <div class="flex justify-center"> -->
  <div>
    <SplitButton :model="items" label="导出" outlined size="small" @click="save" />
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import SplitButton from 'primevue/splitbutton';
// import { useToast } from 'primevue/usetoast';
// const toast = useToast();

const items = [
  {
    label: 'Update',
    command: () => {
      // toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
    }
  },
  {
    label: 'Delete',
    command: () => {
      // toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
    }
  },
  {
    label: 'Vue.js',
    url: 'https://vuejs.org/'
  },
  {
    separator: true
  },
  {
    label: 'Upload',
    route: '/fileupload'
  }
];

const save = () => {
  // toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
};
</script>
