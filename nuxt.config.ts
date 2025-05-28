// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    future: { compatibilityVersion: 4 },
    devtools: { enabled: true },
    css: [
        './app/assets/main.css',
    ],
    modules: [
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
    ],
    i18n: {
        bundle: { optimizeTranslationDirective: false },
        locales: [
            { code: 'gb', name: 'EN', renderKey: 'EN', language: 'en-US', file: 'en-US.ts' },
            { code: 'ru', name: 'RU', renderKey: 'RU', language: 'ru-RU', file: 'ru-RU.ts' },
            { code: 'cz', name: 'CZ', renderKey: 'CZ', language: 'cs-CZ', file: 'cs-CZ.ts' },
        ],
        defaultLocale: 'gb',
        strategy: 'prefix_except_default',
        langDir: './locales',
        lazy: true,
    },
    tailwindcss: {
        quiet: true,
    },
});
