<template>
    <div class="user-menu-compact">
        <div class="menu_button">
            <IconHome class="icon" />
        </div>
        <div class="menu_button">
            <IconBell class="icon" />
        </div>
        <div class="menu_button">
            <IconSearch class="icon" />
        </div>
        <div class="menu_button">
            <IconChat class="icon" />
        </div>
        <div class="menu_button">
            <ElementUserButton class="icon lowercase text-sm bg-text text-primary" />
        </div>
    </div>
</template>

<style scoped>
.user-menu-compact {
	@apply bg-primary flex flex-row justify-center items-stretch;
}

.menu_button {
	@apply flex items-center justify-center h-16 px-2 max-w-40 flex-1;
}
.menu_button .icon {
	@apply w-7 h-7;
}
</style>
