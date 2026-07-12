<template>
  <div class="flex flex-col min-h-0 fullWH">
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false
};

const data = {
  labels: [
    'Jan',
    'Feb',
    'Mar'
  ],

  datasets: [
    {
      label: 'Sales',
      data: [10, 20, 15]
    }
  ]
};
</script>
