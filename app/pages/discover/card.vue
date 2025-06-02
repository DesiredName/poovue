<template>
    <div
        class="user-highlight-card"
        :style="{
            backgroundImage: `url('${card.discoverImage}')`
        }"
    >
        <div class="card-title">
            <div class="name">{{ card.username }}</div>
            <div class="short-description">{{ card.shortDescription }}</div>
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
	@apply relative bg-cover rounded-md select-none cursor-pointer;
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
