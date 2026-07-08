<template>
  <span
    class="tIcon"
    :class="[flipClass, { spin: spin }]"
    :style="wrapStyle"
    :aria-label="ariaLabel"
    role="img"
  >
    <svg
      :width="pxSize"
      :height="pxSize"
      :viewBox="ICON_DEFAULT_VIEWBOX"
      :fill="fillColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      v-html="svgBody"
    ></svg>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { svgStockeWidth } from '@/constant/uiKit';

const props = withDefaults(defineProps<ITIconProps>(), {
  size: 'md',
  color: 'currentColor',
  spin: false,
  strokeWidth: svgStockeWidth,
  ariaLabel: ''
});

const ICON_DEFAULT_VIEWBOX = '0 0 24 24';

export type TIconSize = number | 'sm' | 'md' | 'lg';

export type TIconFlip = 'horizontal' | 'vertical' | 'both';

export interface ITIconProps {
  name: string;
  size?: TIconSize;
  color?: string;
  spin?: boolean;
  flip?: TIconFlip;
  strokeWidth?: number;
  ariaLabel?: string;
}

const SIZE_MAP: Record<string, number> = { sm: 14, md: 16, lg: 20 };

const pxSize = computed<number>(() =>
  typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size] ?? 16)
);

const fillColor = computed<string>(() => props.color ?? 'currentColor');

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
  switch (props.flip) {
    case 'horizontal':
      return 'flipX';
    case 'vertical':
      return 'flipY';
    case 'both':
      return 'flipXY';
    default:
      return '';
  }
});

const wrapStyle = computed<Record<string, string>>(() => ({
  color: fillColor.value
}));
</script>

<style lang="scss" scoped>
.tIcon {
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

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

@keyframes tIconSpin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
