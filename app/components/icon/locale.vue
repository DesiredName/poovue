<template>
    <span class="flex flex-row items-center gap-2">
        <span :class="`flag:${countryCode.toUpperCase()}`" />
        <span v-if="countryName">{{ countryName }}</span>
    </span>
</template>

<script setup lang="ts">
defineProps<{
    countryCode: string,
    countryName?: string,
}>();
</script>
