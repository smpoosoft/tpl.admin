<template>
  <div class="h-full flex flex-col min-h-0">
    <LineChart :data="data" x="month" y="revenue" />
  </div>
</template>

<script setup lang="ts">
import { LineChart } from '@chartts/vue';

const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  series: [{ name: 'Revenue', values: [4200, 5800, 7100] }]
};
</script>
