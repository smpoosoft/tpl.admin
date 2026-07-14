<template>
  <div class="flex items-center gap-4">
    <ul class="tPageToolBar">
      <li class="flexXY">
        <TDarkSwitcher class="mR1"></TDarkSwitcher>
      </li>
      <li v-if="modelValue.comments?.vals" class="flexXY">
        <TPopoveIcon :items="modelValue.comments?.vals" icon="comment" :size="20"
          :overlay="{ val: modelValue.comments?.overlay, color: badgeOverlayColor }" class="mR1">
        </TPopoveIcon>
      </li>
      <li v-if="modelValue.notifications?.vals" class="flexXY">
        <TPopoveIcon :items="modelValue.notifications?.vals" icon="bell" :size="20"
          :overlay="{ val: modelValue.notifications?.overlay, color: badgeOverlayColor }" class="mR1">
        </TPopoveIcon>
      </li>
      <li v-if="modelValue.mails?.vals" class="flexXY">
        <TPopoveIcon :items="modelValue.mails?.vals" icon="mail" :size="20"
          :overlay="{ val: modelValue.mails?.overlay, type: 'dot', color: badgeOverlayColor }" class="mR1">
        </TPopoveIcon>
      </li>
      <li class="flexXY">
        <TScreenServer></TScreenServer>
      </li>

      <Divider layout="vertical" />

      <TPopoveIcon :items="modelValue.user?.vals || []" icon="mail" :size="20"
        :overlay="{ val: modelValue.user?.overlay, color: badgeOverlayColor }" class="mR2">
        <span class="flexXY">
          <span class="font-bold mR1">Amy Elsner</span>
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle"
            :pt="avatarPt" />
        </span>
      </TPopoveIcon>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { IHomeToolBar } from '@/types/uiKite';
import type { AvatarPassThroughOptions } from 'primevue';
import TDarkSwitcher from '@/components/widget/TDarkSwitcher.vue';
import TScreenServer from '@/components/widget/TScreenServer.vue';
import TPopoveIcon from '@/components/widget/TPopoveIcon.vue';
import { badgeOverlayColor } from '@/constant/uiKit';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';

const modelValue = defineModel<IHomeToolBar>({ required: true, default: () => ({}) });


const avatarPt: AvatarPassThroughOptions = {
  root: { class: 'avatar40' }
};
</script>

<style scoped>
.tPageToolBar {
  align-items: center;
  display: flex;
  gap: 16px;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
