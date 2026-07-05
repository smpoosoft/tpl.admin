<template>
  <div class="app">
    <div class="toolbar">
      <Button :label="isDark ? 'Dark' : 'Light'" icon="pi pi-moon" @click="toggleDark" />
    </div>

    <Button label="Hello PrimeVue" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Button from 'primevue/button';

/** 是否暗黑模式 */
const isDark = ref(false);

/** 切换暗黑模式 */
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
