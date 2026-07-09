import type { Preset } from '@primeuix/themes/types';
import type { PrimeVueConfiguration } from 'primevue';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// 主题微调预设
const themePreSet: Preset = {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.900}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.800}',
          activeColor: '{primary.950}'
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.800}',
          focusColor: '{primary.900}'
        },
        text: {
          color: '{surface.800}',
          hoverColor: '{surface.900}',
          mutedColor: '{surface.500}',
          hoverMutedColor: '{surface.600}'
        },
        color: {
          gray: '{slate.500}'
        },
        bg: {
          gray: '{slate.300}',
          page: '{surface.100}'
        }
      },
      dark: {
        primary: {
          color: '{slate.300}',
          contrastColor: '{surface.900}',
          hoverColor: '{slate.200}',
          activeColor: '{slate.300}'
        },
        highlight: {
          background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
          focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        },
        color: {
          gray: '{slate.400}'
        },
        bg: {
          gray: '{slate.700}',
          page: '#3b3b40'
        }
      }
    }
  },
  components: {
    button: {
      root: {
        label: {
          fontWeight: '300'
        },
        borderRadius: '4px'
      }
    },
    panel: {
      header: {
        padding: '8px',
        background: '{content.background}'
      }
    }
  }
};

const preset = definePreset(Aura, themePreSet);

export const primeVueOpt: PrimeVueConfiguration = {
  theme: {
    preset,
    options: {
      darkModeSelector: '.dark'
    }
  },
  ripple: true
};
