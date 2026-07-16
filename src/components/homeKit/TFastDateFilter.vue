<template>
  <div ref="wrapperRef" class="dataRangeFilterWrapper pX1 pYSm" :class="{ 'no-transition': isInitialRender }"
    :style="{ '--i-left': pos.left + 'px', '--i-width': pos.width + 'px', '--i-opacity': pos.opacity }">

    <div class="slidingIndicator" />
    <div class="rangeText fontW4">{{ rangeText }}</div>

    <Divider v-show="dateFilterRange" layout="vertical" />

    <span :ref="setResetRef" class="dateSelectItem pX1 pYSm flexXY handLike" @click="selectItem(-1)">重置</span>

    <template v-for="(item, idx) in FAST_DATE_FILTER_SHORTCUTS" :key="item.label">
      <span :ref="setItemRef(idx)" class="dateSelectItem pX1 pYSm flexXY handLike"
        :class="{ 'active': idx === currIdx }" @click="selectItem(idx, item)">
        {{ item.label }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue';
import Divider from 'primevue/divider';
import { FAST_DATE_FILTER_SHORTCUTS } from '@/util/uiKit/filterShortcuts';

const setResetRef = (el: unknown) => { resetRef.value = el as HTMLElement | null; };
const setItemRef = (idx: number) => (el: unknown) => { itemRefs.value[idx] = el as HTMLElement | null; };

const currIdx = ref(-1);
const wrapperRef = ref<HTMLElement | null>(null);
const resetRef = ref<HTMLElement | null>(null);
const itemRefs = ref<(HTMLElement | null)[]>([]);
const pos = ref({ left: 0, width: 0, opacity: 0 });
const isInitialRender = ref(true);

const dateFilterRange = defineModel<[string, string] | undefined>({ required: true });

const rangeText = computed(() => dateFilterRange.value ? `数据范围： [ ${([...new Set(dateFilterRange.value)]).join(' ~ ')} ]` : '');

onMounted(() => {
  if (wrapperRef.value) {
    const centerLeft = wrapperRef.value.offsetWidth / 2;
    pos.value = {
      left: centerLeft,
      width: 0,
      opacity: 0
    };
  }
});

const selectItem = (idx: number, item?: { value: () => [string, string] }) => {
  currIdx.value = idx;
  dateFilterRange.value = item?.value();

  nextTick(() => {
    // 如果是重置按钮（idx === -1），隐藏指示器
    if (idx === -1) {
      pos.value = {
        left: pos.value.left, // 保持当前位置
        width: 0,
        opacity: 0
      };
      return;
    }

    const targetEl = itemRefs.value[idx];

    if (targetEl && wrapperRef.value) {
      const newLeft = targetEl.offsetLeft;
      const newWidth = targetEl.offsetWidth;

      if (isInitialRender.value) {
        pos.value = {
          left: newLeft,
          width: newWidth,
          opacity: 1
        };
        isInitialRender.value = false;
      } else {
        pos.value = {
          left: newLeft,
          width: newWidth,
          opacity: 1
        };
      }
    }
  });
};
</script>

<style scoped lang="scss">
.dataRangeFilterWrapper {
  display: inline-flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-self: center;
  column-gap: 6px;
  border-radius: 50px;
  position: relative;
  overflow: hidden;

  &.no-transition {
    .slidingIndicator {
      transition: none !important;
    }
  }

  .slidingIndicator {
    position: absolute;
    width: var(--i-width);
    height: 80%;
    top: 10%;
    left: var(--i-left);
    border-radius: 50px;
    background: var(--p-primary-900);
    opacity: var(--i-opacity);
    transition: left 0.25s ease, width 0.25s ease, opacity 0.2s ease;
    z-index: 0;
    pointer-events: none;
  }

  .rangeText {
    color: var(--p-primary-500);
  }

  .dateSelectItem {
    position: relative;
    z-index: 1;
    border-radius: 50px;
    color: var(--p-primary-900);

    &.active {
      color: #fff;
    }
  }
}
</style>
