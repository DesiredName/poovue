<template>
    <div :class="{ 'user-menu': true, 'is-expanded': isExpanded }">
        <div class="user-menu__expand" @click="handleToggleExpanded">
            <IconChevron class="w-6 h-6 rounded-full bg-text text-primary" />
        </div>

        <div class="user-menu__container">

            <div class="container_block">
                <div class="block__element no-padding">
                    <div class="element__content">
                        <div class="element__content">
                            <ElementUserButton class="size-10 bg-text text-primary uppercase" />
                        </div>
                        <span class="element__title">
                            <div class="font-bold">{{ username }}</div>
                            <div>{{ nickname }}</div>
                        </span>
                    </div>
                </div>
            </div>

            <div class="container_block flex-1">
                <div class="block__element">
                    <div class="element__content">
                        <IconHome class="element__icon" />
                        <span class="element__title">Home</span>
                    </div>
                </div>
                <div class="block__element">
                    <div class="element__content">
                        <IconSearch class="element__icon" />
                        <span class="element__title">Discover</span>
                    </div>
                </div>
                <div class="block__element">
                    <div class="element__content">
                        <IconBell class="element__icon" />
                        <span class="element__title">Notifications</span>
                    </div>
                </div>
                <div class="block__element">
                    <div class="element__content">
                        <IconChat class="element__icon" />
                        <span class="element__title">Chats</span>
                    </div>
                </div>
                <div class="block__element">
                    <div class="element__content">
                        <IconDollar class="element__icon" />
                        <span class="element__title">Create & Earn</span>
                    </div>
                </div>
                <div class="block__element">
                    <div class="element__content">
                        <IconFollow class="element__icon" />
                        <span class="element__title">Follow</span>
                    </div>
                </div>
                <div class="block__element">
                    <div class="element__content">
                        <IconWallet class="element__icon" />
                        <span class="element__title">Founds</span>
                    </div>
                </div>
                <div class="block__element">
                    <div class="element__content">
                        <IconProfile class="element__icon" />
                        <span class="element__title">You profile</span>
                    </div>
                </div>
            </div>

            <div class="container_block">
                <div class="block__element">
                    <div class="element__content">
                        <IconSettings class="element__icon" />
                        <span class="element__title">Settings</span>
                    </div>
                </div>
                <div class="block__element">
                    <div class="element__content">
                        <IconNew class="element__icon" />
                        <span class="element__title">What's new</span>
                    </div>
                </div>
                <div class="block__element">
                    <div class="element__content">
                        <IconLogout class="element__icon" />
                        <span class="element__title">Logout</span>
                    </div>
                </div>
            </div>

            <div class="container_block_footer">
                <div class="block__element">
                    <div class="footer__element">
                        <IconOthers class="size-4"/>
                    </div>
                </div>
                <div class="block__element">
                    <div class="footer__element" @click="switchTheme">
                        <IconTheme class="size-4"/>
                    </div>
                </div>
                <div class="block__element">
                    <div class="footer__element" @click="toggleUnsafeContentAllowed">
                        <IconEye class="size-4" />
                    </div>
                </div>
                <div class="block__element">
                    <div class="footer__element">
                        <span class="flag:EN" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { nickname, username, toggleUnsafeContentAllowed } = useUser();
const { switchTheme } = useTheme();
const isExpanded = useCookie('is-menu-expanded', { default: () => ref<boolean>(false) });

const handleToggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.user-menu {
	@apply flex flex-col p-2 h-full relative;
}

.user-menu:hover .user-menu__expand {
	@apply opacity-100 pointer-events-auto;
}

.user-menu.is-expanded .user-menu__expand {
	@apply rotate-180;
}

.user-menu__expand {
	@apply flex items-center justify-center;
	@apply absolute -right-3 top-[50%] w-10 h-10 cursor-pointer;
	@apply opacity-0 pointer-events-none transition-[opacity,transform] duration-200 delay-300;
}

.user-menu__container {
	@apply flex flex-col items-center justify-start flex-1 bg-primary px-2 rounded-lg;
}

/*  */

.user-menu.is-expanded .container_block .block__element {
	@apply w-60;
}

.user-menu.is-expanded .container_block .element__content .element__title {
	@apply opacity-100 pointer-events-auto;
}

.container_block {
	@apply flex flex-col gap-1 py-2 w-full;
	@apply border-b-[1px] border-b-secondary;
}

.container_block .block__element {
	@apply flex items-center justify-start min-h-10 py-2 cursor-pointer;
	@apply hover:bg-highlight rounded-md transition-[colors,width] duration-200 w-10 px-3;
}

.container_block .block__element.no-padding {
	@apply p-0;
	@apply hover:bg-transparent;
}

.container_block .element__content {
	@apply flex flex-row flex-nowrap text-nowrap items-center justify-start gap-4;
}

.container_block .element__content .element__icon {
	@apply size-4;
}

.container_block .element__content .element__title {
	@apply overflow-hidden text-ellipsis whitespace-nowrap max-w-32 transition-opacity duration-200;
	@apply opacity-0 pointer-events-none;
}

/*  */

.user-menu.is-expanded .container_block_footer {
	@apply justify-center flex-row;
}

.user-menu.is-expanded .container_block_footer .block__element .footer__element {
	@apply flex-1;
}

.container_block_footer {
	@apply flex flex-col gap-2 py-2 w-full;
}

.container_block_footer .block__element {
	@apply flex items-center justify-center flex-1 min-w-10 min-h-10 cursor-pointer rounded-md bg-[rgba(255,255,255,5%)];
	@apply transition-colors duration-200;
	@apply hover:bg-highlight;
}

.container_block_footer .block__element .footer__element {
    @apply flex items-center justify-center size-8;
}
</style>
