<template>
    <div class="section_discover">
        <div class="section_discover__container">

            <div class="w-full text-left">
                <div class="text-lg uppercase font-bold font-oswald">
                    {{ $t('appSections.discover') }}
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useHead({
    title: t('appSections.discover'),
});

definePageMeta({
    layout: 'app',
});
</script>

<style scoped>
.section_discover {
	@apply flex flex-col h-full relative;
}

.section_discover__container {
	@apply flex flex-col items-center justify-start flex-1 bg-primary p-4 rounded-xl overflow-scroll;
}
</style>
