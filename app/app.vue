<template>
    <div>
        Hello Nuxt Fonts!
    </div>
</template>

<script setup lang="ts">
useHead({
    htmlAttrs: {
        'data-theme': 'dark',
    },
});
</script>

<style scoped>
div {
  font-family: Roboto, sans-serif;
}
</style>
