<template>
  <span class="tScreenServer">
    <TIcon name="screenServer" :size="18" clickAble @click="lock" />
    <BlockUI v-if="isLocked" fullScreen :blocked="isLocked" autoZIndex :baseZIndex="1000">
      <div class="lockOverlay">
        <div class="lockCard">
          <div class="lockIcon"><TIcon name="screenServer" :size="40" /></div>
          <p class="lockHint">已锁屏，请输入密码解锁</p>
          <InputText v-model="pwd" type="password" placeholder="请输入密码" class="lockInput"
            @keyup.enter="unlock" ref="pwdInput" />
          <Button label="解锁" @click="unlock" class="lockBtn" />
        </div>
      </div>
    </BlockUI>
  </span>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import BlockUI from 'primevue/blockui';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import TIcon from '@/components/widget/TIcon.vue';

const LOCK_PWD = '123456';

const isLocked = ref(false);
const pwd = ref('');
const pwdInput = ref<InstanceType<typeof InputText> | null>(null);

const lock = () => {
  document.querySelectorAll('.p-blockui-mask').forEach(m => m.remove());
  isLocked.value = true;
  pwd.value = '';
  nextTick(() => pwdInput.value?.$el?.querySelector('input')?.focus());
};

const unlock = () => {
  if (pwd.value === LOCK_PWD) {
    isLocked.value = false;
    pwd.value = '';
    nextTick(() => document.querySelectorAll('.p-blockui-mask').forEach(m => m.remove()));
  }
};
</script>

<style lang="scss" scoped>
.tScreenServer {
  position: relative;
}

.lockOverlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.lockCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
  background: var(--p-surface-card);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  min-width: 300px;
}

.lockIcon {
  color: var(--p-primary-color);
}

.lockHint {
  margin: 0;
  font-size: 14px;
  color: var(--p-text-muted-color);
}

.lockInput {
  width: 100%;
}

.lockBtn {
  width: 100%;
}
</style>
