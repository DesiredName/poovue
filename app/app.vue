<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const { setIntialTheme } = useTheme();

setIntialTheme();

useHead({
    titleTemplate: (s) => s != null ? `${s} | ${appConfig.mainTitle}` : appConfig.mainTitle,
});
</script>
