<template>
    <div class="section_discover">
        <div class="section_discover__container">

            <div class="w-full text-left">
                <div class="text-lg uppercase font-bold font-oswald">
                    {{ $t('appSections.discover') }}
                </div>
            </div>

            <ClientOnly>
                <div class="w-full flex mt-8 overflow-hidden">
                    <Carousel
                        class="w-full"
                        :cards="cards"
                        :active="activeCardIdx"
                        :number-of-displayed-cards="3"
                        :card-animation-duration="cardAnimationDuration"
                        @next="throttledNextIdx"
                        @animating="isAnimating = true"
                        @finished="isAnimating = false"
                    />
                </div>

                <div class="mt-4">
                    <ElementDotz
                        :dotz="cards.length"
                        :active="activeCardIdx"
                        @next="throttledNextIdx"
                    />
                </div>

                <template #fallback>
                    <!-- this will be rendered on server side -->
                    <Placeholder class="w-full min-h-96"/>
                </template>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
import Carousel from './carousel.vue';
import Placeholder from './placeholder.vue';

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
const cardAnimationDuration = ref(300);
const isAnimating = ref(false);

const handleNextIdx = (idx: number) => {
    if (isAnimating.value === true) {
        return;
    }

    activeCardIdx.value = idx;

    // if (swipeable.value) {
    //     // NOTE: idx -> [1,...,gridCols]
    //     const child = swipeable.value.children[0]?.children?.[idx - 1];

    //     if (child) {
    //         child.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }
};

const throttledNextIdx = (() => {
    let timerId: number | undefined;

    return (idx: number) => {
        if (timerId != null) return;

        handleNextIdx(idx);

        timerId = window.setTimeout(() => timerId = undefined, cardAnimationDuration.value);
    };
})();
</script>

<style scoped>
.section_discover {
	@apply flex flex-col h-full relative;
}

.section_discover__container {
	@apply flex flex-col items-center justify-start flex-1 bg-primary p-4 rounded-xl overflow-scroll;
}
</style>
