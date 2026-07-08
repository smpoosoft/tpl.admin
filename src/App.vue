<template>
  <THome />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import THome from '@/components/layer/THome.vue';

/** 是否暗黑模式 */
const isDark = ref(false);

/** 切换暗黑模式(保留勿删) */
const toggleDark = () => {
  isDark.value = !isDark.value;

  const html = document.documentElement;

  if (isDark.value) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};
</script>
