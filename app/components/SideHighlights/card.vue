<template>
    <div
        :style="{
            backgroundImage: `url('${card?.backgroundImage}')`
        }"
        class="user-highlight-card"
    >
        <div class="flex-1 relative">
            <button class="follow-button">
                Follow
            </button>
        </div>
        <div class="card-title">
            <div class="text text-sm">{{  card?.username }}</div>
            <div class="text text-xs">{{ card?.nickname }}</div>
        </div>
        <div
            class="card-avatar"
            :style="{
                backgroundImage: `url('${card?.avatar}')`
            }"
        />
    </div>
</template>

<script setup lang="ts">
defineProps<{ card?: UserHighlight }>();
</script>

<style scoped>
.user-highlight-card {
	@apply relative flex flex-col justify-evenly items-stretch gap-0 overflow-hidden w-72 h-32 rounded-xl cursor-pointer;
}

.user-highlight-card .follow-button {
	@apply absolute top-3 right-3 bg-text text-primary font-semibold rounded-full px-4 py-2;
	@apply transition-opacity duration-500 opacity-100 hover:opacity-85;
}

.user-highlight-card .card-title {
	@apply flex-1 bg-black/25 flex flex-col justify-center items-end gap-2;
}

.user-highlight-card .card-title .text {
	@apply w-40 max-w-40 text-ellipsis font-bold whitespace-nowrap overflow-hidden;
}

.user-highlight-card .card-avatar {
	@apply absolute size-24 left-4 rounded-full bg-white border border-solid border-primary bg-cover;
}
</style>
