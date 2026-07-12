<template>
  <div class="homeContent p2 fullWH">
    <!-- 左区域 -->
    <div class="zoneLeft">
      <!-- 摘要行 -->
      <div class="summaryRow">
        <Card :pt="tagCardTitlePt">
          <template #title>
            <span class="text-muted-color text-base mt-0.5 fontW7">活跃客户</span>
          </template>
          <template #content>
            <span class="font-semibold text-2xl">1,284</span>
          </template>
          <template #footer>
            <p class="text-sm text-surface-500 dark:text-surface-400">
              <span>较上月</span>
              <span class="ml-2 textGreen">+12.5%</span>
            </p>
          </template>
        </Card>
        <Card :pt="tagCardTitlePt">
          <template #title>
            <span class="text-muted-color text-base mt-0.5 fontW7">漏斗转化率</span>
          </template>
        </Card>
        <Card :pt="tagCardTitlePt">
          <template #title>
            <span class="text-muted-color text-base mt-0.5 fontW7">回款率</span>
          </template>
        </Card>
      </div>
      <!-- 业务统计 -->
      <Card :pt="cardLayoutPt()">
        <template #title>
          <span class="text-muted-color text-base mt-0.5 fontW7">业务趋势</span>
        </template>
        <template #content>
          <div class="h-full">
            <TChartLine></TChartLine>
          </div>
        </template>
      </Card>
      <!-- 业务信息 -->
      <Card :pt="cardLayoutPt({})">
        <template #title>
          <span class="text-muted-color text-base mt-0.5 fontW7">业务信息</span>
        </template>
        <template #content>
          <Tabs lazy value="0">
            <TabList>
              <Tab value="0">业务办理
                <Badge size="small" value="5" />
              </Tab>
              <Tab value="1">待办事项
                <Badge size="small" value="5" />
              </Tab>
              <Tab value="2">公告通知
                <Badge size="small" value="2" />
              </Tab>
              <Tab value="3">消息提醒
                <Badge size="small" value="1" />
              </Tab>
              <Tab value="4">系统消息
                <Badge size="small" value="1" />
              </Tab>
            </TabList>
            <!-- 业务办理 -->
            <TabPanel value="0">
              <TCardListPubNotic v-model="bizExecMessage" />
            </TabPanel>
            <!-- 待办事项 -->
            <TabPanel value="1">
              <TTodoList v-model="todoLists" />
            </TabPanel>
            <!-- 公告通知 -->
            <TabPanel value="2">
              <TCardListPubNotic v-model="bizExecMessage" />
            </TabPanel>
            <!-- 消息提醒 -->
            <TabPanel value="3">
              <TCardListPubNotic v-model="bizExecMessage" />
            </TabPanel>
            <!-- 系统消息 -->
            <TabPanel value="4">
              <TCardListPubNotic v-model="bizExecMessage" />
            </TabPanel>
          </Tabs>
        </template>
      </Card>
    </div>
    <!-- 右区域 -->
    <div class="zoneRight">
      <TCardSummary />
      <TCardDateWeather />
      <TCardBirthDay />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Tab from 'primevue/tab';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import Badge from 'primevue/badge';
import TChartLine from '@/components/chart/TChartLine.vue';
import TTodoList from '@/components/dataKit/TTodoList.vue';
import TCardSummary from '@/components/homeKit/TCardSummary.vue';
import TCardDateWeather from '@/components/homeKit/TCardDateWeather.vue';
import TCardListPubNotic from '@/components/homeKit/TCardListPubNotic.vue';
import TCardBirthDay from '@/components/homeKit/TCardBirthDay.vue';
import { tagCardTitlePt, cardLayoutPt } from '@/assets/ts/preSet';
import { bizExecMessage, todoLists } from '@/mock/homePage';
</script>

<style scoped>
.homeContent {
  display: grid;
  grid-template-columns: 1fr 25%;
  column-gap: 16px;

  .zoneLeft {
    display: grid;
    grid-template-rows: auto 1fr 1fr;
    row-gap: 16px;
    height: 100%;
    min-height: 0;

    .summaryRow {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
      column-gap: 16px;
    }
  }

  .zoneRight {
    display: grid;
    grid-template-rows: auto 128px 1fr;
    row-gap: 16px;
  }
}
</style>
