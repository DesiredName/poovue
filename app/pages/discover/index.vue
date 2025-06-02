<template>
    <div class="section_discover">
        <div class="section_discover__container">

            <div class="w-full text-left">
                <div class="text-lg uppercase font-bold font-oswald">
                    {{ $t('appSections.discover') }}
                </div>
            </div>

            <div class="w-full flex mt-8 overflow-hidden">
                <ClientOnly>
                    <Carousel
                        class="w-full"
                        :cards="cards"
                        :active="activeCardIdx"
                        :number-of-displayed-cards="3"
                        @next="handleNextIdx"
                    />
                </ClientOnly>
            </div>

            <div class="mt-4">
                <ElementDotz
                    :dotz="cards.length"
                    :active="activeCardIdx"
                    @next="handleNextIdx"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Carousel from './carousel.vue';

const { t } = useI18n();

useHead({
    title: t('appSections.discover'),
});

definePageMeta({
    layout: 'app',
});

const { data } = await useFetch<UserHighlight[]>(UserHighlightsURL(7));
const cards = ref(data.value ?? []);
const activeCardIdx = ref<number>(0);

const handleNextIdx = (idx: number) => {
    activeCardIdx.value = idx;

    // if (swipeable.value) {
    //     // NOTE: idx -> [1,...,gridCols]
    //     const child = swipeable.value.children[0]?.children?.[idx - 1];

    //     if (child) {
    //         child.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }
};
</script>

<style scoped>
.section_discover {
	@apply flex flex-col h-full relative;
}

.section_discover__container {
	@apply flex flex-col items-center justify-start flex-1 bg-primary p-4 rounded-xl overflow-scroll;
}
</style>
