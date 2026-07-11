<template>
  <Card class="h-full" :pt="cardLayoutPt({ overY: true })">
    <template #title>
      <span class="font-bold">生日提醒</span>
    </template>
    <template #content>
      <ul class="fullWH">
        <li v-for="item in birthdays" :key="item.id" class="birthdayItem borderBottom">
          <span class="flexVXY">
            <Avatar :label="item.avatar" />
          </span>
          <span class="flexVY">
            <span class="text-sm font-medium">{{ item.namezh }}</span>
            <span class="text-surface-200 dark:text-surface-400 text-sm">{{ item.department }}</span>
          </span>
          <span class="flexVY textRight">
            <span class="text-sm font-medium">{{ item.date }}</span>
            <span class="text-surface-500 dark:text-surface-400 text-sm">{{ item.dateLunar }}</span>
          </span>
          <Divider layout="vertical" />
          <span class="flexVXY">
            <span class="text-sm font-medium">{{ item.age }}</span>
          </span>

        </li>
      </ul>
    </template>
  </Card>
</template>

<script setup lang='ts'>
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import { birthdays } from '@/mock/homePage';
import { cardLayoutPt } from '@/assets/ts/preSet';
</script>

<style scoped>
.birthdayItem {
  display: grid;
  grid-template-columns: 36px 1fr auto 3px 36px;
  align-self: center;
  column-gap: 8px;
  padding: 8px 0;
}
</style>
