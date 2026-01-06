// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [// 1. 기본 자바스크립트 추천 설정
js.configs.recommended, // 2. Next.js 및 Airbnb 설정 변환 적용
...compat.extends(
  'next/core-web-vitals',
  'next/typescript',
  'airbnb-base',
  'prettier',
), // 3. 커스텀 규칙 (테스트를 위해 에러로 설정)
{
  rules: {
    'no-unused-vars': 'error',
    'no-var': 'error',
    'no-console': 'warn',
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
