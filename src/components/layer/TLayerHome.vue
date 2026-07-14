<template>
  <TLayerBase>
    <div class="homeWrapper fullW-H overHidden">
      <!-- 左侧边栏 -->
      <div class="sliderMenu p2 fullH overHidden">
        <span class="font-bold">Amy Elsner</span>
        <!-- 菜单区域 -->
        <TMenu v-model="dataMenus" class="w-full h-full overY"></TMenu>
        <!-- 侧边栏页脚卡片 -->
        <Card>
          <template #title>Simple Card</template>
          <template #content>
            <p class="m-0">
              <Button label="Open Drawer" @click="visibleRight = true" />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
              numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis
              esse, cupiditate neque
              quas!
            </p>
          </template>
        </Card>

      </div>

      <!-- 工作区 -->
      <Panel class="workSpaceWrpper fullW fullH-H overHidden" :pt="panelPt">
        <!-- 工作区顶部导航条 -->
        <template #header>
          <!-- <span class="flexVY pX2">
            <span class="font-bold">CRM.pro</span>
            <span class="text-sm text-gray-500 mt-1">探索，发现，洞见</span>
          </span> -->

          <div class="card flex justify-center">
            <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems">
              <template #item="{ item, props }">
                <a :href="item.url" :target="item.target" v-bind="props.action">
                  <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
                </a>
              </template>
            </Breadcrumb>
          </div>

          <span></span>

          <TPageToolBar v-model="dataHomeToolBar" class="w-full h-full overY"></TPageToolBar>
        </template>

        <!-- 工作区路由区域 -->
        <router-view v-slot="{ Component }">
          <Transition mode="out-in" enter-active-class="animate__animated animate__zoomIn route-enter-active"
            leave-active-class="animate__animated animate__zoomOutDown route-leave-active">
            <component :is="Component" />
          </Transition>
        </router-view>
      </Panel>
    </div>
    <!-- 右侧边栏抽屉 -->
    <Drawer v-model:visible="visibleRight" header="Right Drawer" position="right">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </Drawer>

  </TLayerBase>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TLayerBase from './TLayerBase.vue';
import Panel, { type PanelPassThroughOptions } from 'primevue/panel';
import TMenu from '@/components/widget/TMenu.vue';
import TPageToolBar from '@/components/widget/TPageToolBar.vue';
import Breadcrumb from 'primevue/breadcrumb';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import Card from 'primevue/card';

import type { IHomeToolBar, TPopoverItem } from '@/types/uiKite/index.js';
import { dataMenus } from '@/mock/homePage.ts';

const panelPt: PanelPassThroughOptions = {
  root: { class: 'workSpaceWrpper fullH-H overHidden' },
  header: { class: 'workSpaceHeader fullWH' },
  contentContainer: { class: 'workSpaceContainer p2 fullH overHidden' },
  contentWrapper: { class: 'workspaceCZone fullWH overHidden' },
  content: { class: 'panelContent fullWH overHidden' }
};

const AVATAR_BASE = 'https://i.pravatar.cc/40?u=';

const visibleRight = ref(false);

const breadcrumbHome = ref({
  label: '首页',
  // icon: 'pi pi-home',
  route: '/'
});
const breadcrumbItems = ref([
  { label: 'Components' },
  { label: 'Form' },
  { label: 'InputText', route: '/inputtext' }
]);


const commentItems = ref<TPopoverItem[]>([
  { label: 'Amy Elsner', description: 'Re: Project timeline update', value: '1', image: `${AVATAR_BASE}amy` },
  { label: 'Bernardo Dominic', description: 'Design review completed', value: '2', image: `${AVATAR_BASE}bernardo` },
  { label: 'Ioni Bowcher', description: 'Meeting notes from sprint', value: '3', image: `${AVATAR_BASE}ioni` }
]);

const bellItems = ref<TPopoverItem[]>([
  { label: 'System Update', description: 'v2.4.1 deployed to staging', value: 'update', icon: 'info' },
  { label: 'New User', description: 'John joined your workspace', value: 'user', icon: 'success' },
  { label: 'Server Alert', description: 'CPU usage exceeded 90%', value: 'alert', icon: 'warning' }
]);

const mailItems = ref<TPopoverItem[]>([
  { label: 'Xavit Wiliams', description: 'Invoice #2024-08 attached', value: 'inbox', image: `${AVATAR_BASE}xavit` },
  { label: 'Sonya Kaur', description: 'Q3 report for your review', value: 'sent', image: `${AVATAR_BASE}sonya` },
  { label: 'Tara Williams', description: 'Meeting rescheduled to 3pm', value: 'drafts', image: `${AVATAR_BASE}tara` }
]);

const userItems = ref<TPopoverItem[]>([
  { label: '个人中心', description: 'user profiles', value: 'inbox' },
  { label: '修改密码', description: 'change password', value: 'sent' },
  { label: '注销', description: 'sign out', value: 'drafts' }
]);

const dataHomeToolBar = ref<IHomeToolBar>({
  comments: { overlay: 5, vals: commentItems.value },
  notifications: { overlay: 2, vals: bellItems.value },
  mails: { overlay: 1, vals: mailItems.value },
  user: { vals: userItems.value }
});
</script>

<style lang="scss" scoped>
.homeWrapper {
  display: grid;
  grid-template-columns: 260px 1fr;
  background-color: var(--p-bg-page);
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  .sliderMenu {
    display: grid;
    grid-template-rows: 64px 1fr auto;
    row-gap: 8px;
    background-color: var(--p-content-background);
  }

  .workSpaceWrpper {
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: transparent;

    :deep(.workSpaceHeader) {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;

      .avatar20 {
        width: 20px;
        height: 20px;
      }
    }

    :deep(.workSpaceContainer) {
      overflow: hidden;
    }

    // :deep(.workspaceCZone) {
    //   height: 100%;
    //   display: flex;
    //   flex-direction: column;
    // }

    :deep(.panelContent) {
      padding: 0;
    }

    .content-row {
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-border);
    }
  }
}

.route-enter-active {
  animation-delay: -0.15s;
}

.route-leave-active {
  animation-duration: 0.4s;
}

:deep(.badge-sm) {
  font-size: 0.6rem;
  min-width: 1.2rem;
  height: 1.2rem;
  padding: 0 0.3rem;
  border-radius: 3px;
  line-height: 1;
}
</style>
