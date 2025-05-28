<template>
    <div class="user-menu-compact">
        <ElementsIcon class="user-menu-compact__button"/>
        <ElementsIcon class="user-menu-compact__button"/>
        <ElementsIcon class="user-menu-compact__button"/>
        <ElementsIcon class="user-menu-compact__button"/>
    </div>
</template>

<style scoped>
.user-menu-compact {
	@apply bg-primary flex flex-row justify-center items-center;
}

.user-menu-compact .user-menu-compact__button {
	@apply flex items-center justify-center h-16 px-2 w-28;
}
</style>
