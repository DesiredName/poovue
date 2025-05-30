<template>
    <div class="section_home">
        <div class="section_home__container">

            <div class="w-full text-left">
                <div class="text-lg uppercase font-bold font-oswald">
                    {{ $t('appSections.home') }}
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useHead({
    title: t('appSections.home'),
});

definePageMeta({
    layout: 'app',
});
</script>

<style scoped>
.section_home {
	@apply h-full p-2;
}

.section_home__container {
	@apply flex flex-col items-center justify-start flex-1 bg-primary p-4 rounded-xl overflow-scroll;
}
</style>
