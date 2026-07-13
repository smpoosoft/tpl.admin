<template>
  <span class="tIcon" :class="[flipClass, { spin: spin, handLike: clickAble }]" :aria-label="ariaLabel" role="img">
    <svg :width="pxSize" :height="pxSize" :viewBox="ICON_DEFAULT_VIEWBOX" fill="currentColor"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" v-html="svgBody"></svg>
    <span v-if="overlay && (overlay.val ?? 0) > 0" class="tIcon-overlay" :class="{ dot: overlay.type === 'dot' }"
      :style="{ background: overlay.color || 'red' }">{{ overlay.type === 'dot' ? '' : overlay.val }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { badgeOverlayColor, svgStockeWidth } from '@/constant/uiKit';
import type { IBadgeOverlay } from '@/types/uiKite';

const props = withDefaults(defineProps<{
  name: string;
  /** 图标尺寸 */
  size?: TIconSize;
  /** 是否旋转 */
  spin?: boolean;
  /** 图标是否翻转 */
  flip?: TIconFlip;
  /** 指定图标粗细 */
  strokeWidth?: number;
  /** 角标信息 */
  overlay?: IBadgeOverlay;
  /** 无障碍标签 */
  ariaLabel?: string;
  /** 是否允许点击 */
  clickAble?: boolean;
}>(), {
  size: 'md',
  spin: false,
  strokeWidth: svgStockeWidth,
  overlay: () => ({ color: badgeOverlayColor }),
  flip: 'none',
  ariaLabel: ''
});

const ICON_DEFAULT_VIEWBOX = '0 0 24 24';

export type TIconSize = number | 'sm' | 'md' | 'lg';

export type TIconFlip = 'none' | 'horizontal' | 'vertical' | 'both';

const SIZE_MAP: Record<string, number> = { sm: 14, md: 16, lg: 20 };

const pxSize = computed<number>(() =>
  typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size] ?? 16)
);

const ICON_MODULES = import.meta.glob<{ ICON_BODY: string }>('../../assets/icons/**/*.ts', { eager: true });

const svgBody = computed<string>((): string => {
  const key = Object.keys(ICON_MODULES).find(k => k.endsWith(`/${props.name}.ts`));
  let body = key ? (ICON_MODULES[key]?.ICON_BODY ?? '') : '';
  if (body && props.strokeWidth > 0) {
    if (body.includes('stroke-width')) {
      body = body.replace(/stroke-width="[^"]*"/g, `stroke-width="${props.strokeWidth}"`);
    } else {
      body = body.replace(/(<[a-z][^>]*)(\/?>)/gi, (_match, prefix, suffix) => {
        const attr = prefix.includes('stroke=') ? '' : ' stroke="currentColor"';
        return `${prefix}${attr} stroke-width="${props.strokeWidth}"${suffix}`;
      });
    }
  }
  return body;
});

const flipClass = computed<string>(() => {
  return ((props.flip === 'horizontal') && 'flipX')
    || ((props.flip === 'vertical') && 'flipY')
    || ((props.flip === 'both') && 'flipXY')
    || '';
});
</script>

<style lang="scss" scoped>
.tIcon {
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  position: relative;

  &.spin>svg {
    animation: tIconSpin 1.6s linear infinite;
  }

  &.flipX>svg {
    transform: scaleX(-1);
  }

  &.flipY>svg {
    transform: scaleY(-1);
  }

  &.flipXY>svg {
    transform: scale(-1, -1);
  }
}

.tIcon-overlay {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 14px;
  height: 14px;
  padding: 0 4px;
  border-radius: 7px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: #fff;
  pointer-events: none;
  box-sizing: border-box;

  &.dot {
    min-width: 8px;
    width: 8px;
    height: 8px;
    padding: 0;
    border-radius: 50%;
    top: -2px;
    right: -2px;
  }
}

@keyframes tIconSpin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
