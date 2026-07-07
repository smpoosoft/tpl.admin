<template>
  <div class="layerBase" :data-smpoo="dataSmpoo">
    <Toast />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';

const dataSmpoo = '上海深普软件有限公司';
</script>

<style lang="scss" scoped>
.layerBase {

  &::before {
    content: attr(data-smpoo);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 24px;
    font-size: 12px;
    color: #888;
    z-index: 999;
  }
}
</style>
