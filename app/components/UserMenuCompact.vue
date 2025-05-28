<template>
    <div class="user-menu-compact">
        <div class="user-menu-compact__button">
            <IconHome class="user-menu-compact__button__element" />
        </div>
        <div class="user-menu-compact__button">
            <IconBell class="user-menu-compact__button__element" />
        </div>
        <div class="user-menu-compact__button">
            <IconSearch class="user-menu-compact__button__element" />
        </div>
        <div class="user-menu-compact__button">
            <IconChat class="user-menu-compact__button__element" />
        </div>
        <div class="user-menu-compact__button">
            <ElementUserButton class="user-menu-compact__button__element lowercase bg-text text-primary" />
        </div>
    </div>
</template>

<style scoped>
.user-menu-compact {
	@apply bg-primary flex flex-row justify-center items-stretch;
}

.user-menu-compact .user-menu-compact__button {
	@apply flex items-center justify-center h-16 px-2 max-w-40 flex-1;
}
.user-menu-compact .user-menu-compact__button .user-menu-compact__button__element {
	@apply w-7 h-7;
}
</style>
