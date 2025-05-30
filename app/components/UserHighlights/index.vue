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
                    <UserHighlightsCard
                        v-for="(card, idx) in data"
                        :key="`${card.username}.${idx}`"
                        class="card"
                        :card="card"
                    />
                </div>
            </div>

            <div class="controls">
                controls
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $hammer } = useNuxtApp();
const swipeable = useTemplateRef<HTMLElement | null>('swipeable');
let swipeGrid: HammerManager | null = null;
const { data } = await useFetch<UserHighlight[]>(
    '/api/highlights',
);

onMounted(async () => {
    await nextTick();

    if (swipeable.value != null) {
        swipeGrid = $hammer(swipeable.value);
        swipeGrid.on('swipe', (e) => {
            console.log(e);
        });
    }
});

onBeforeUnmount(() => {
    swipeGrid?.destroy?.();
});
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
	@apply grid grid-cols-[repeat(2,1fr)] grid-rows-[repeat(3,auto)] gap-2;
}
</style>
