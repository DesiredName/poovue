// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    future: { compatibilityVersion: 4 },
    devtools: { enabled: false },
    css: [
        './app/assets/main.css',
        './app/assets/tooltip.css',
        './app/assets/transitions.css',
        // NOTE: This is just a source for flags, package is not used directly in ther code
        //       !!! DO NOT IMPORT ALL !!!
        //       use only those that are needed in icon components
        // './node_modules/country-flag-icons/flags/3x2/flags.css',
        './node_modules/floating-vue/dist/style.css',
    ],
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@nuxtjs/google-fonts',
    ],
    googleFonts: {
        families: {
            Roboto: true,
            Oswald: true,
        },
        download: true,
        overwriting: true,
        display: 'block',
    },
    i18n: {
        bundle: { optimizeTranslationDirective: false },
        locales: [
            { code: 'us', name: 'English', language: 'en-US', file: 'en-US.ts' },
            { code: 'ru', name: 'Russian', language: 'ru-RU', file: 'ru-RU.ts' },
            { code: 'cz', name: 'Czech', language: 'cs-CZ', file: 'cs-CZ.ts' },
        ],
        defaultLocale: 'us',
        strategy: 'no_prefix',
        langDir: './locales',
        lazy: true,
    },
    tailwindcss: {
        exposeConfig: true,
        quiet: false,
    },
});
