/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRIMEUI_LICENSE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'primevue/config' {
  interface PrimeVueConfiguration {
    /**
     * PrimeUI license key.
     * @see https://primevue.dev/vite/#license
     */
    license?: string;
  }
}

export {};