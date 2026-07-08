<template>
  <div class="t-popove-trigger" @click="onClick" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <TIcon :name="icon" :size :overlay :stroke-width="svgStockeWidth" />

    <Popover ref="opRef">
      <ul class="t-popover-list" @mouseenter="clearHideTimer" @mouseleave="hide">
        <li v-for="item in items" :key="item.value" class="t-popover-item" @click="select(item)">
          <img v-if="item.image" :src="item.image" class="t-popover-avatar" />
          <TIcon v-else-if="item.icon" :name="item.icon" :stroke-width="svgStockeWidth" :size="20" />
          <div class="t-popover-text">
            <span class="t-popover-label">{{ item.label }}</span>
            <span v-if="item.description" class="t-popover-desc">{{ item.description }}</span>
          </div>
        </li>
      </ul>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Popover from 'primevue/popover';
import TIcon from '@/components/widget/TIcon.vue';
import type { IBadgeOverlay } from '@/components/widget/TIcon.vue';
import { svgStockeWidth } from '@/constant/uiKit';

export interface TPopoverItem {
  label: string;
  description?: string;
  value: string | number;
  image?: string;
  icon?: string;
}

export type TPopoverSelectPayload = Omit<TPopoverItem, 'image' | 'icon'>;

export type TriggerType = 'hover' | 'click';

const props = withDefaults(defineProps<{
  items: TPopoverItem[];
  icon?: string;
  size?: 'sm' | 'md' | 'lg' | number;
  triggerType?: TriggerType;
  overlay?: IBadgeOverlay;
}>(), {
  icon: '',
  size: 24,
  triggerType: 'hover'
});

const emit = defineEmits<{
  select: [payload: TPopoverSelectPayload];
}>();

const opRef = ref();
const selectedItem = ref<TPopoverItem | null>(null);
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const clearHideTimer = (): void => {
  if (hideTimer !== null) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
};

const show = (event: Event): void => {
  clearHideTimer();
  opRef.value.show(event);
};

const hide = (): void => {
  hideTimer = setTimeout(() => {
    opRef.value.hide();
    hideTimer = null;
  }, 200);
};

const onClick = (event: Event): void => {
  if (props.triggerType !== 'click') return;
  opRef.value.toggle(event);
};

const onMouseEnter = (event: Event): void => {
  if (props.triggerType !== 'hover') return;
  show(event);
};

const onMouseLeave = (): void => {
  if (props.triggerType !== 'hover') return;
  hide();
};

const select = (item: TPopoverItem): void => {
  selectedItem.value = item;
  emit('select', { label: item.label, description: item.description, value: item.value });
  opRef.value.hide();
};
</script>

<style scoped lang="scss">
.t-popove-trigger {
  display: inline-flex;
  position: relative;
}

.t-popover-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.t-popover-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: var(--p-content-hover-background);
  }
}

.t-popover-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.t-popover-label {
  font-weight: 500;
}

.t-popover-desc {
  font-size: 0.8rem;
  color: var(--p-text-muted-color);
}

.t-popover-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
</style>
