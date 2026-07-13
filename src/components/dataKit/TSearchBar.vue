<template>
  <div class="searchBox">
    <span class="optIcon flexXY fullWH">
      <TIcon name="search" :size="16"></TIcon>
    </span>
    <input v-model="searchKeyword" type="text" class="searchInput" :placeholder="placeholderText" />
    <span class="optIcon flexXY fullWH" :class="{ clear: searchKeyword, handLike: searchKeyword }"
      @click="clearSearchKeyword">
      <TIcon :name="!searchKeyword ? 'dot' : 'close'" :size="16" aria-label="清除搜索内容"></TIcon>
    </span>
    <span v-if="!hideInnerFilter" class="optIcon opt flexXY fullWH handLike" @click="onFilter">
      <TIcon name="filter" :size="16" aria-label="更多筛选条件"></TIcon>
    </span>
    <span class="optIcon opt flexXY fullWH handLike" @click="onNotEquals">
      <TIcon name="notEquals" :size="16" aria-label="反向搜索"></TIcon>
    </span>
  </div>
</template>

<script setup lang="ts">
import TIcon from '@/components/widget/TIcon.vue';
import { computed } from 'vue';

const props = defineProps<{
  /** 隐藏内部筛选图标 */
  hideInnerFilter?: boolean;
  /** 搜索框占位符 */
  placeholder?: string;
}>();

const emits = defineEmits<{
  (e: 'onClearSearchKeyword'): void;
  (e: 'onFilterMore'): void;
  (e: 'onNotEqualsClick'): void;
}>();

const searchKeyword = defineModel<string>({ required: true, default: '' });

const placeholderText = computed(() => props.placeholder || '搜索...');

const clearSearchKeyword = () => {
  if (searchKeyword.value) {
    searchKeyword.value = '';
    emits('onClearSearchKeyword');
  }
};

const onFilter = () => {
  emits('onFilterMore');
};

const onNotEquals = () => {
  emits('onNotEqualsClick');
};
</script>

<style lang="scss" scoped>
.searchBox {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  align-self: center;
  gap: 6px;
  height: 27px;
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--bg-panel) 100%);
  border: 1px solid var(--p-content-border-color);
  border-radius: 4px;
  transition: border-color 0.15s ease;
  position: relative;

  &:focus-within {
    border-color: var(--primary-700);
  }

  .searchInput {
    width: 100%;
    height: 27px;
    border: none;
    outline: none;
    font-size: 12px;
    color: var(--accent);
    font-family: inherit;
    background: transparent;

    &::placeholder {
      color: var(--primary-400);
    }
  }

  .optIcon {
    width: 27px;
    color: var(--primary-200);
    flex-shrink: 0;
    border: none;

    &.clear {
      &:hover {
        color: red;
        background-color: var(--p-primary-100);
      }
    }

    &.opt {
      &:hover {
        color: var(--p-primary-900);
        background-color: var(--p-primary-100);
      }
    }
  }
}
</style>
