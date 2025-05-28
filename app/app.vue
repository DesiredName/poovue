<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();

useHead({
    htmlAttrs: {
        'data-app-theme': 'dark',
    },
    titleTemplate: (s) => s != null ? `${s} | ${appConfig.mainTitle}` : appConfig.mainTitle,
});
</script>

<style scoped>
div {
  font-family: Roboto, sans-serif;
}
</style>
