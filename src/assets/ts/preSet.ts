import type { Preset } from '@primeuix/themes/types';
import type { PrimeVueConfiguration } from 'primevue';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// 主题微调预设
const themePreSet: Preset = {
  semantic: {
    primary: {
      50: '#f7f8fd',
      100: '#eef0fa',
      200: '#d6d9f0',
      300: '#b8bfe3',
      400: '#9ba3d4',
      500: '#8088c4',
      600: '#6a72b2',
      700: '#565c9e',
      800: '#454a8e',
      900: '#35397e',
      950: '#2c2867'
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
          color: '{primary.900}',
          hoverColor: '#1e293b',
          mutedColor: '#94a3b8',
          hoverMutedColor: '#64748b'
        },
        color: {
          gray: '{primary.500}'
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
        text: {
          color: '#e8eafa',
          hoverColor: '#cbd5e1',
          mutedColor: '#94a3d4',
          hoverMutedColor: '#7c84c0'
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
      root: {
        borderRadius: '16px',
        background: '{content.background}'
      },
      header: {
        padding: '8px 16px',
        background: '{content.background}'
      }
    },
    card: {
      root: {
        borderRadius: '16px',
        background: '{content.background}'
      },
      title: {
        fontSize: '1.125rem',
        fontWeight: '600'
      }
    },
    tabs: {
      tab: {
        fontWeight: '500'
      }
    }
  }
};

export const tagCardTitlePt = {
  title: { class: 'tagCardTitle' }
};

export const cardLayoutPt = (opt: { overY?: boolean } = {}) => ({
  ...tagCardTitlePt,
  root: { class: 'h-full min-h-0' },
  body: { class: 'h-full flex flex-col min-h-0' },
  content: { class: `h-full flex-1 min-h-0 ${opt.overY ? 'overY' : 'overHidden'}`, style: { 'container-type': 'size' } }
});

const preset = definePreset(Aura, themePreSet);

export const primeVueOpt: PrimeVueConfiguration = {
  theme: {
    preset,
    options: {
      darkModeSelector: '.dark'
    }
  },
  license: import.meta.env.VITE_PRIMEUI_LICENSE_KEY,
  ripple: true,
  pt: {
    tabpanel: {
      root: { class: 'fullWH' }
    }
  }
};
