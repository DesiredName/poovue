<template>
    <div class="highlights">
        <div class="highlights__container">
            <div class="title">
                <div class="text-lg uppercase font-bold font-oswald">
                    Highlights
                </div>
            </div>

            <div class="content">
                <div class="cards-grid">
                    <UserHighlightsCard
                        v-for="card in data"
                        :key="card.username"
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
const { data } = await useAsyncData(
    'mountains',
    () => $fetch<UserHighlight[]>('/api/highlights'),
);
</script>

<style scoped>
.highlights {
	@apply flex flex-col p-2 h-full relative;
}

.highlights__container {
	@apply flex flex-col items-center justify-stretch bg-primary rounded-xl p-4 w-80;
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

.highlights .content .cards-grid .card {
	@apply overflow-hidden w-72 h-32 rounded-xl;
}
</style>
