<template>
  <label class="t-dark-switcher" :class="{ dark: isDark }" @click="toggleDark">
    <!-- sun icon: visible when dark (click to switch to light) -->
    <svg
      class="icon-swap icon-sun"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      :stroke-width="svgStockeWidth"
    >
      <g fill="none">
        <g clip-path="url(#sunClip)">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            d="M3 12H1m22 0h-2m-9 9v2m0-22v2M5.636 18.364l-1.414 1.414M19.778 4.222l-1.414 1.414m-12.728 0L4.222 4.222m15.556 15.556l-1.414-1.414M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0Z"
          />
        </g>
        <defs>
          <clipPath id="sunClip">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </g>
    </svg>

    <!-- moon icon: visible when light (click to switch to dark) -->
    <svg
      class="icon-swap icon-moon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="20"
      height="20"
      :stroke-width="svgStockeWidth"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14 2C9 2 3 7 3 15s6 14 14 14s13-6 13-11C19 25 7 13 14 2"
      />
    </svg>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { svgStockeWidth } from '@/constant/uiKit';

const isDark = ref(false);

const toggleDark = (): void => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark');
};
</script>

<style scoped lang="scss">
.t-dark-switcher {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 24px;
  position: relative;

  .icon-swap {
    position: absolute;
    transition: transform 0.35s ease-out, opacity 0.25s ease-out;
  }

  .icon-sun {
    opacity: 0;
    transform: rotate(-90deg);
  }

  .icon-moon {
    opacity: 1;
    transform: rotate(0deg);
  }

  &.dark {
    .icon-sun {
      opacity: 1;
      transform: rotate(0deg);
    }

    .icon-moon {
      opacity: 0;
      transform: rotate(90deg);
    }
  }
}
</style>