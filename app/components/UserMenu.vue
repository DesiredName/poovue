<template>
    <div class="user-menu">
        <div class="user-menu__container">
            <div class="user-menu__container__block">
                <div class="min-w-10 min-h-10 cursor-pointer">
                    <ElementUserButton class="w-10 h-10 bg-text text-primary" />
                </div>
            </div>
            <div class="user-menu__container__block flex-1">
                <div class="user-menu__container__block__element">
                    <IconHome class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <IconSearch class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <IconBell class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <IconChat class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <IconDollar class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <IconFollow class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <IconWallet class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <IconProfile class="w-4 h-4"/>
                </div>
            </div>
            <div class="user-menu__container__block">
                <div class="user-menu__container__block__element">
                    <IconSettings class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <IconNew class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <IconLogout class="w-4 h-4"/>
                </div>
            </div>
            <div class="user-menu__container__block">
                <div class="user-menu__container__block__element">
                    <IconOthers class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <IconEye class="w-4 h-4"/>
                </div>
                <div class="user-menu__container__block__element">
                    <ElementUserButton class="w-10 h-10 bg-text text-primary" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.user-menu {
	@apply flex flex-col p-2 h-full;
}

.user-menu .user-menu__container {
	@apply flex flex-col items-center justify-start flex-1 min-w-14 bg-primary px-2 rounded-lg;
}

.user-menu .user-menu__container .user-menu__container__block {
	@apply flex flex-col gap-1 py-2;
}

.user-menu .user-menu__container .user-menu__container__block:not(:last-of-type) {
	@apply border-b-[1px] border-b-secondary;
}

.user-menu .user-menu__container .user-menu__container__block .user-menu__container__block__element {
	@apply flex items-center justify-center min-w-10 min-h-10 py-2 cursor-pointer;
	@apply hover:bg-highlight rounded-md transition-colors duration-200;
}
</style>
