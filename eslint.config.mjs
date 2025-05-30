// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import stylisticJs from '@stylistic/eslint-plugin';

export default withNuxt({
    plugins: {
        '@stylistic': stylisticJs,
    },
    rules: {
        '@stylistic/semi': 'error',
        '@stylistic/indent': ['error', 4],
        '@stylistic/quotes': ['error', 'single'],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, {
            'baseIndent': 0,
            'switchCase': 1,
            'ignores': [],
        }],
    },
});
