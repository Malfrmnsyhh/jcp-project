import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
    {
        ignores: [
            'node_modules/**',
            'public/build/**',
            'vendor/**',
            'storage/**',
            'bootstrap/cache/**',
        ],
    },
    js.configs.recommended,
    reactHooks.configs.flat['recommended-latest'],
    {
        files: ['resources/js/**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                route: 'readonly', // disediakan direktif @routes milik Ziggy
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['*.config.js'],
        languageOptions: {
            globals: globals.node,
        },
    },
];
