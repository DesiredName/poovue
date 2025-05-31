<template>
    <div class="section_discover">
        <div class="section_discover__container">

            <div class="w-full text-left">
                <div class="text-lg uppercase font-bold font-oswald">
                    {{ $t('appSections.discover') }}
                </div>
            </div>

            <div class="w-full flex mt-8 overflow-hidden">
                <div class="flex flex-row flex-nowrap gap-4">
                    <Card
                        v-for="(card, idx) in gridItems"
                        :key="`${card.nickname}-${idx}`"
                        :card="card"
                    />
                </div>
            </div>

            <div class="mt-4">
                <ElementDotz
                    :dotz="gridItems?.length ?? 0"
                    :active="activeItemIdx"
                    @next="handleNextDot"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from './card.vue';

const { t } = useI18n();

useHead({
    title: t('appSections.discover'),
});

definePageMeta({
    layout: 'app',
});

const { data: gridItems } = await useFetch<UserHighlight[]>(UserHighlightsURL(12));
const activeItemIdx = ref<number>(1);

const handleNextDot = (idx: number) => {
    activeItemIdx.value = idx;

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
