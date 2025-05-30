<template>
    <div class="page-layout">
        <div class="page-layout__user-menu__desktop">
            <UserMenu />
        </div>

        <div class="page-layout__content">
            <NuxtPage />
        </div>

        <div class="page-layout__highlights">
            <UserHighlights />
        </div>

        <div class="page-layout__user-menu__compact">
            <UserMenuCompact />
        </div>

        <ClientOnly>
            <CookiePolicy />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
useHead({
    bodyAttrs: {
        class: 'body__page-layout-container',
    },
});
</script>

<style >
.body__page-layout-container {
	@apply bg-secondary text-text fixed inset-0 overflow-hidden ;
}

.body__page-layout-container .page-layout {
	@apply fixed inset-0 flex flex-col xl:flex-row gap-0;
}

.body__page-layout-container .page-layout .page-layout__user-menu__desktop {
	@apply hidden xl:block;
}

.body__page-layout-container .page-layout .page-layout__content {
	@apply flex-1 min-h-0;
}

.body__page-layout-container .page-layout .page-layout__highlights {
	@apply hidden xl:block;
}

.body__page-layout-container .page-layout .page-layout__user-menu__compact {
	@apply block xl:hidden;
}
</style>
