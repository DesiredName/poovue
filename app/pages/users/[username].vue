<template>
    <div>
        {{ username }}
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const username = route.params.username as string;

useHead({
    title: username,
});
</script>
