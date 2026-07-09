<template>
  <TRouterPanel>
    <template #header>
      <span class="font-bold">个人中心</span>
    </template>

    <div class="p2">
      <div class="grid grid-cols-12 gap-4">
        <!-- Left: Profile card -->
        <div class="col-span-4">
          <Panel>
            <template #header>
              <span class="font-bold">个人信息</span>
            </template>
            <div class="flex flex-column align-items-center py-4">
              <div
                class="flex align-items-center justify-content-center border-circle bg-primary mb-3"
                style="width: 80px; height: 80px; font-size: 2rem; color: var(--p-primary-contrast-color)"
              >
                {{ profile.name.charAt(0) }}
              </div>
              <span class="text-xl font-bold mb-1">{{ profile.name }}</span>
              <span class="text-surface-500 mb-1">{{ profile.dept }}</span>
              <Tag :value="profile.role" severity="info" />
            </div>
          </Panel>
        </div>

        <!-- Right: Info panels -->
        <div class="col-span-8">
          <Panel>
            <template #header>
              <span class="font-bold">基本信息</span>
            </template>
            <div class="grid grid-cols-12 gap-4 p-3">
              <div class="col-span-6 flex flex-column gap-1">
                <label class="text-sm text-surface-500">姓名</label>
                <InputText :modelValue="profile.name" readonly />
              </div>
              <div class="col-span-6 flex flex-column gap-1">
                <label class="text-sm text-surface-500">部门</label>
                <InputText :modelValue="profile.dept" readonly />
              </div>
              <div class="col-span-6 flex flex-column gap-1">
                <label class="text-sm text-surface-500">职位</label>
                <InputText :modelValue="profile.position" readonly />
              </div>
              <div class="col-span-6 flex flex-column gap-1">
                <label class="text-sm text-surface-500">手机号</label>
                <InputText :modelValue="profile.phone" readonly />
              </div>
              <div class="col-span-12 flex flex-column gap-1">
                <label class="text-sm text-surface-500">邮箱</label>
                <InputText :modelValue="profile.email" readonly />
              </div>
            </div>
          </Panel>

          <Divider />

          <Panel>
            <template #header>
              <span class="font-bold">安全设置</span>
            </template>
            <div class="flex gap-3 p-3">
              <Button label="修改密码" icon="pi pi-key" severity="secondary" />
              <Button label="修改邮箱" icon="pi pi-envelope" severity="secondary" />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  </TRouterPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TRouterPanel from '@/components/layer/TRouterPanel.vue';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Divider from 'primevue/divider';
import { USER_PROFILE } from '@/mock/sysData.ts';

const profile = ref(USER_PROFILE);
</script>

<style scoped></style>