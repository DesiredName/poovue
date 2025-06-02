<template>
    <div class="highlights">
        <div class="highlights__container">
            <div class="title">
                <div class="text-lg uppercase font-bold font-oswald">
                    Highlights
                </div>
            </div>

            <div ref="swipeable" class="content">
                <div class="cards-grid">
                    <SideHighlightsCard
                        v-for="(card, idx) in cards"
                        :key="`${card.username}.${idx}`"
                        class="card"
                        :card="card"
                    />
                </div>
            </div>

            <div class="controls">
                <ElementDotz
                    :dotz="gridCols"
                    :active="activeCardIdx"
                    @next="handleNextIdx"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InRangeValue from '~/utils/inRangeValue';

const { $hammer } = useNuxtApp();

const swipeable = useTemplateRef<HTMLElement | null>('swipeable');
let swiper: HammerManager | null = null;

const { data: cards } = await useFetch<UserHighlight[]>(UserHighlightsURL(6));
const gridRows = ref<number>(3);
const gridCols = ref<number>((cards.value ? Math.ceil(cards.value.length / gridRows.value) : 1));
const activeCardIdx = ref<number>(0);

onMounted(async () => {
    await nextTick();

    if (swipeable.value != null) {
        swiper = $hammer(swipeable.value);
        swiper.on('swipe', (e) => {
            const delta = (e.direction  === 2 /** HAMMER.DIRECTION_LEFT */ ? 1 : -1);
            const nextIdx = activeCardIdx.value + delta;
            const idx = InRangeValue(nextIdx, 0, gridCols.value - 1, false);

            handleNextIdx(idx);
        });
    }
});

onBeforeUnmount(() => {
    swiper?.destroy?.();
});

const handleNextIdx = (idx: number) => {
    activeCardIdx.value = idx;

    if (swipeable.value) {
        const child = swipeable.value.children[0]?.children?.[idx];

        if (child) {
            child.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
</script>

<style scoped>
.highlights {
	@apply flex flex-col h-full relative select-none;
}

.highlights__container {
	@apply flex flex-col items-center justify-stretch gap-4 bg-primary rounded-xl p-4 w-80;
}

.highlights .title {
	@apply text-left w-full;
}

.highlights .content {
	@apply flex flex-col gap-0 justify-start items-start overflow-hidden w-72;
}

.highlights .content .cards-grid {
	@apply grid grid-cols-[repeat(v-bind('gridCols'),1fr)] grid-rows-[repeat(v-bind('gridRows'),auto)] gap-2;
}

.highlights .controls {
	@apply w-full;
}
</style>
