<!-- Landing page view -->
<template>
    <div>
        <ElementLocaleSelector>
            <IconFlag class="size-4" :country-code="locale" />
        </ElementLocaleSelector>
    </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

definePageMeta({
    layout: 'landing',
});
</script>
