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
                <div
                    v-tooltip="tooltipSetup('appSections.home')"
                    class="block__element"
                    @click="$router.push(WellKnownRoutes.HOME)"
                >
                    <div class="element__content">
                        <IconHome class="element__icon" />
                        <span class="element__title">{{$t('appSections.home')}}</span>
                    </div>
                </div>
                <div
                    v-tooltip="tooltipSetup('appSections.discover')"
                    class="block__element"
                    @click="$router.push(WellKnownRoutes.DISCOVER)"
                >
                    <div class="element__content">
                        <IconSearch class="element__icon" />
                        <span class="element__title">{{ $t('appSections.discover') }}</span>
                    </div>
                </div>
                <div v-tooltip="tooltipSetup('appSections.notifications')" class="block__element">
                    <div class="element__content">
                        <IconBell class="element__icon" />
                        <span class="element__title">{{ $t('appSections.notifications') }}</span>
                    </div>
                </div>
                <div v-tooltip="tooltipSetup('appSections.chats')" class="block__element">
                    <div class="element__content">
                        <IconChat class="element__icon" />
                        <span class="element__title">{{ $t('appSections.chats') }}</span>
                    </div>
                </div>
                <div v-tooltip="tooltipSetup('appSections.createAndEarn')" class="block__element">
                    <div class="element__content">
                        <IconDollar class="element__icon" />
                        <span class="element__title">{{ $t('appSections.createAndEarn') }}</span>
                    </div>
                </div>
                <div v-tooltip="tooltipSetup('appSections.follow')" class="block__element">
                    <div class="element__content">
                        <IconFollow class="element__icon" />
                        <span class="element__title">{{ $t('appSections.follow') }}</span>
                    </div>
                </div>
                <div v-tooltip="tooltipSetup('appSections.founds')" class="block__element">
                    <div class="element__content">
                        <IconWallet class="element__icon" />
                        <span class="element__title">{{ $t('appSections.founds') }}</span>
                    </div>
                </div>
                <div v-tooltip="tooltipSetup('appSections.yourProfile')" class="block__element">
                    <div class="element__content">
                        <IconProfile class="element__icon" />
                        <span class="element__title">{{ $t('appSections.yourProfile') }}</span>
                    </div>
                </div>
            </div>

            <div class="container_block">
                <div v-tooltip="tooltipSetup('appSections.settings')" class="block__element">
                    <div class="element__content">
                        <IconSettings class="element__icon" />
                        <span class="element__title">{{ $t('appSections.settings') }}</span>
                    </div>
                </div>
                <div v-tooltip="tooltipSetup('appSections.whatsNew')" class="block__element">
                    <div class="element__content">
                        <IconNew class="element__icon" />
                        <span class="element__title">{{ $t('appSections.whatsNew') }}</span>
                    </div>
                </div>
                <div v-tooltip="tooltipSetup('appSections.logout')" class="block__element">
                    <div class="element__content">
                        <IconLogout class="element__icon" />
                        <span class="element__title">{{ $t('appSections.logout') }}</span>
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
                <ElementLocaleSelector class="rounded-md w-8">
                    <div class="block__element">
                        <div class="footer__element">
                            <IconFlag class="size-4" :country-code="locale" />
                        </div>
                    </div>
                </ElementLocaleSelector>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { vTooltip } from 'floating-vue';
import { WellKnownRoutes } from '~/constants';

const { locale, t } = useI18n();
const { nickname, username, toggleUnsafeContentAllowed } = await useMe();
const { switchTheme } = useTheme();
const isExpanded = useCookie('is-menu-expanded', { default: () => ref<boolean>(false) });

const handleToggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
};

const tooltipSetup = (tKey: string) => ({
    content: t(tKey),
    disabled: isExpanded,
    placement: 'right',
    triggers: ['hover'],
    distance: 20,
    theme: 'small-tooltip',
});
</script>

<style scoped>
.user-menu {
	@apply flex flex-col h-full relative;
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
	@apply flex flex-col items-center justify-start flex-1 bg-primary px-2 rounded-xl;
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
.container_block_footer {
	@apply grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] justify-center gap-2 py-2 w-full;
}

.container_block_footer .block__element {
	@apply flex items-center justify-center flex-1 min-w-10 h-10 cursor-pointer rounded-md bg-[rgba(255,255,255,5%)];
	@apply transition-colors duration-200;
	@apply hover:bg-highlight;
}

.container_block_footer .block__element .footer__element {
    @apply flex items-center justify-center size-8;
}
</style>
