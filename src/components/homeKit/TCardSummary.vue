<template>
  <Card :pt="tagCardTitlePt">
    <template #title>
      <span class="text-primary-900 text-base mt-0.5 fontW7">摘要(万元)</span>
    </template>
    <template #content>
      <div class="flex justify-center">
        <div class="max-w-md w-full">
          <div class="flex pY1">
            <div class="flex-1">
              <div class="uppercase font-bold text-bold pB1 text-primary-900">销售目标</div>
              <div class="font-light text-primary-700">￥1000</div>
            </div>
            <Divider layout="vertical" />
            <div class="flex-1">
              <div class="uppercase font-bold text-bold pB1 text-primary-900">已达成</div>
              <div class="font-light text-primary-700">￥230</div>
            </div>
            <Divider layout="vertical" />
            <div class="flex-1">
              <div class="uppercase font-bold text-bold pB1 text-primary-900">本月预期</div>
              <div class="font-light text-primary-700">￥120</div>
            </div>
          </div>
          <Divider />
          <div class="flex">
            <div class="flex-1">
              <div class="uppercase font-mono text-xs text-primary-700">From</div>
              <div class="font-semibold text-2xl text-primary-900">PrimeTek</div>
              <div class="w-full h-12 mt-4 bg-surface-100 dark:bg-surface-900 rounded-lg"></div>
            </div>
            <Divider layout="vertical" />
            <div class="flex-1">
              <div class="uppercase font-mono text-xs text-primary-700">To</div>
              <div class="h-7 mt-2 rounded-lg bg-surface-100 dark:bg-surface-900"></div>
              <div class="w-full h-12 mt-2 bg-surface-100 dark:bg-surface-900 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { tagCardTitlePt } from '@/assets/ts/preSet';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
</script>
