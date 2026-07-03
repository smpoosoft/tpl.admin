import type { EcmaVersion, SourceType } from '@typescript-eslint/types';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { globalIgnores } from 'eslint/config';
import pluginJsonc from 'eslint-plugin-jsonc';
import pluginVue from 'eslint-plugin-vue';
import pluginOxlint from 'eslint-plugin-oxlint';
import { tCoffeEslint, overrridEslint } from 'smpoo_lint';

export default defineConfigWithVueTs(
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'tsconfig.*json', 'tsconfig.*', '**/*.d.ts', '**/*', '!src/**', '!test/**']),
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  ...pluginOxlint.configs['flat/recommended'],
  ...pluginJsonc.configs['flat/recommended-with-jsonc'],
  skipFormatting,
  ...tCoffeEslint<EcmaVersion, SourceType>('fEnd'),
  ...overrridEslint
);
