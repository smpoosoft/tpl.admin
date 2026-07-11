<template>
  <Card>
    <template #content>
      <div class="dateWeatherWrapper fullWH">
        <!-- 日期时间 -->
        <div class="flexVY">
          <span class="text-4xl font-medium text-primary-900">
            <span>{{ currentTime }}</span>
            <span class="text-lg text-primary-700">:{{ currentSecond }}</span>
          </span>
          <span class="text-primary-700 text-sm mYSm">{{ currentDate }}</span>
          <span class="dateLunarRow text-lg">
            <span class="text-primary-700">{{ lunarDate }}</span>
            <span class="text-primary-700">{{ solarTerm }}</span>
          </span>
        </div>

        <Divider layout="vertical"></Divider>

        <!-- 天气 -->
        <div class="flexVXY">
          <TIcon name="sunshine" :size="24"></TIcon>
          <span class="text-2xl font-medium mYSm text-primary-900">{{ weather.temp }}</span>
          <span class="text-primary-700 text-sm">{{ weather.condition }}</span>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import TIcon from '@/components/widget/TIcon.vue';
import { onMounted, ref } from 'vue';


const currentTime = ref('');
const currentSecond = ref('');
const currentDate = ref('');
const lunarDate = ref('五月初三');
const solarTerm = ref('芒种');
const weather = ref({ temp: '26°C', condition: '晴' });

function formatTime(): void {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  currentSecond.value = now.toLocaleTimeString('zh-CN', { second: '2-digit' }).padStart(2, '0');
  currentDate.value = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' });
}

onMounted(() => {
  formatTime();
  setInterval(formatTime, 1000);
});
</script>

<style scoped>
.dateWeatherWrapper {
  display: grid;
  grid-template-columns: auto 1fr 64px;
  align-self: center;

  .dateLunarRow {
    display: grid;
    grid-template-columns: 1fr auto;
  }
}
</style>
