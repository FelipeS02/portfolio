import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import reactCompiler from 'eslint-plugin-react-compiler';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { fileURLToPath } from 'url';

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    ignores: [
      // Next.js build output
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',

      // Dependencies
      'node_modules/**',

      // Coverage reports
      'coverage/**',

      // Cache
      '.cache/**',
      '.eslintcache',

      'tailwind.config.ts',

      // Environment files
      '.env*',
    ],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'react-compiler': reactCompiler,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      'react-hooks/refs': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^next', '^@next'],

            ['^@?\\w'], // External packages

            ['^@/components/ui', '^@/components', '^@/public'],

            ['^@/lib', '^@/hooks', '^@/models'],

            ['^@/'], // Other alias imports

            ['^.+\\.css$'], // Styles

            ['^\\.'], // Relative imports

            ['^\\u0000'], // Side effect imports
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
