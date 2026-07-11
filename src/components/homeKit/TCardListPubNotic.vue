<template>
  <Listbox v-model="selectedCity" :options="listData" class="fullWH p2">
    <template #option="{ option }">
      <!-- <div class="flex items-center justify-between w-full gap-3"> -->
      <div class="fullW flex items-center gap-3 min-w-0 pYSm listItemRow borderBottom">
        <span class="font-bold">{{ option.name }}</span>
        <span class="truncate">{{ option.namezh }}</span>
      </div>
      <!-- </div> -->
    </template>
  </Listbox>
</template>

<script setup lang="ts">
import Listbox from 'primevue/listbox';
import { ref } from 'vue';

const listData = defineModel<{ id: number, name: string, namezh: string }[]>({ required: true, default: () => [] });

const selectedCity = ref();
</script>

<style lang="scss" scoped>
.listItemRow {
  display: grid;
  grid-template-columns: 160px 1fr;
}
</style>
