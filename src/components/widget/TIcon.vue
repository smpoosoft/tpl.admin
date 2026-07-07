<template>
  <span class="tIcon" :class="[flipClass, { spin: spin }]" :style="wrapStyle" :aria-label="ariaLabel" role="img">
    <svg :width="pxSize" :height="pxSize" :viewBox="ICON_DEFAULT_VIEWBOX" :fill="fillColor"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" v-html="svgBody">
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<ITIconProps>(), {
  size: 'md',
  color: 'currentColor',
  spin: false,
  flip: 'both',
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
  ariaLabel?: string;
}

const SIZE_MAP: Record<string, number> = { sm: 14, md: 16, lg: 20 };

const pxSize = computed<number>(() =>
  typeof props.size === 'number' ? props.size : (SIZE_MAP[props.size] ?? 16)
);

const fillColor = computed<string>(() => props.color ?? 'currentColor');

const ICON_MODULES = import.meta.glob<{ ICON_BODY: string }>('./icons/*.ts', { eager: true });

const svgBody = computed<string>((): string => {
  const mod = ICON_MODULES[`./icons/${props.name}.ts`];
  return mod?.ICON_BODY ?? '';
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
}

.tIcon.spin>svg {
  animation: tIconSpin 1.6s linear infinite;
}

.tIcon.flipX>svg {
  transform: scaleX(-1);
}

.tIcon.flipY>svg {
  transform: scaleY(-1);
}

.tIcon.flipXY>svg {
  transform: scale(-1, -1);
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
