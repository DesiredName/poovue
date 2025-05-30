<template>
    <div class="highlights">
        <div class="highlights__container">
            <div class="title">
                <div class="text-lg uppercase font-bold font-oswald">
                    Highlights
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.highlights {
	@apply flex flex-col p-2 h-full relative;
}

.highlights__container {
	@apply flex flex-col items-center justify-stretch bg-primary rounded-xl p-4 min-w-72;
}

.highlights .title {
	@apply text-left w-full;
}
</style>
