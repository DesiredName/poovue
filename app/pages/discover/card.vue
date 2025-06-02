<template>
    <div
        class="user-highlight-card"
    >
        <div
            class="card-content"
            :style="{
                backgroundImage: `url('${card.discoverImage}')`,
            }"
        >
            <div class="card-title">
                <div class="name">{{ card.username }}</div>
                <div class="short-description">{{ card.shortDescription }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    card: UserHighlight,
}>();
</script>

<style scoped>
.user-highlight-card {
	@apply relative select-none cursor-pointer px-2;
}

.user-highlight-card .card-content {
	@apply relative rounded-md w-full h-full bg-cover bg-no-repeat bg-left-top bg-secondary;
	@apply transition-transform duration-300 delay-150;
}

.user-highlight-card .card-content:hover {
	@apply scale-105;
}

.user-highlight-card .card-title {
	@apply absolute bottom-0 left-0 right-0 p-4 ;
}

.user-highlight-card .card-title .name {
	@apply font-oswald font-bold break-words max-w-min text-4xl text-white;
}

.user-highlight-card .card-title .short-description {
	@apply font-oswald font-bold whitespace-nowrap max-w-min text-lg text-accent italic;
}
</style>
