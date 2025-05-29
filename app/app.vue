<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { THEME_KEY } from '~/composables/useTheme';

const appConfig = useAppConfig();
const { theme, setTheme } = useTheme();

useHead({
    htmlAttrs: {
        [THEME_KEY]: theme.value ?? 'dark',
    },
    titleTemplate: (s) => s != null ? `${s} | ${appConfig.mainTitle}` : appConfig.mainTitle,
});

onMounted(() => {
    if (theme.value == null) {
        const result = window.matchMedia('(prefers-color-scheme: dark)');

        if (result.matches){
            setTheme('dark');
        } else {
            setTheme('light');
        }
    } else {
        setTheme(theme.value);
    }
});
</script>
