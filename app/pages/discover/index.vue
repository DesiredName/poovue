<template>
    <div class="section_discover">
        <div class="section_discover__container">

            <div class="w-full text-left">
                <div class="text-lg uppercase font-bold font-oswald">
                    {{ $t('appSections.discover') }}
                </div>
            </div>

            <ClientOnly>
                <div ref="swipeable" class="w-full flex mt-8 overflow-hidden">
                    <Carousel
                        class="w-full"
                        :cards="cards"
                        :active="activeCardIdx"
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
import InRangeValue from '~/utils/inRangeValue';
import Carousel from './carousel.vue';
import Placeholder from './placeholder.vue';

const { t } = useI18n();
const { $hammer } = useNuxtApp();
const { discoverSection: {
    highlightsPreviewItems,
    highlightsSwipeAnimationDuration,
    highlightsAutoSwipeAnimationInterval,
}} = useAppConfig();

useHead({
    title: t('appSections.discover'),
});

definePageMeta({
    layout: 'app',
});

const { data } = await useFetch<UserHighlight[]>(UserHighlightsURL(highlightsPreviewItems));
const cards = ref(data.value ?? []);
const activeCardIdx = ref<number>(0);
const isAnimating = ref(false);
const swipeable = useTemplateRef<HTMLElement | null>('swipeable');
let swiper: HammerManager | null = null;

const handleNextIdx = (idx: number) => {
    if (isAnimating.value !== true) {
        activeCardIdx.value = idx;
    }
};

const throttledNextIdx = (() => {
    let timerId: number | undefined;

    return (idx: number) => {
        if (timerId != null) return;

        handleNextIdx(idx);

        timerId = window.setTimeout(() => timerId = undefined, highlightsSwipeAnimationDuration);
    };
})();

const initSwiper = () =>{
    if (swipeable.value != null) {
        swiper = $hammer(swipeable.value);
        swiper.on('swipe', (e) => {
            const delta = (e.direction  === 2 /** HAMMER.DIRECTION_LEFT */ ? 1 : -1);
            const nextIdx = activeCardIdx.value + delta;
            const idx = InRangeValue(nextIdx, 0, cards.value.length - 1);

            handleNextIdx(idx);
        });
    }

    setInterval(() => {
        if (isAnimating.value !== true) {
            const nextIdx = InRangeValue(activeCardIdx.value + 1, 0, cards.value.length - 1);

            handleNextIdx(nextIdx);
        }
    }, highlightsAutoSwipeAnimationInterval);
};

onMounted(async () => {
    await nextTick();
    initSwiper();
});

onBeforeUnmount(() => {
    swiper?.destroy?.();
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
