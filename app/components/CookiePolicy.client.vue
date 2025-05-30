<template>
    <div v-if="userActionReceived !== true" class="cookie-policy-dialog">
        <h3 class="text-lg font-bold">Your Privacy</h3>
        <p class="py-3">
            We use cookies and similar technologies to help personalise content, tailor and measure ads, and provide a better experience. By clicking OK, you agree to this, as outlined in our Cookie Policy.
        </p>
        <div class="flex gap-10 justify-between items-center">
            <button
                class="uppercase underline text-sm xl:text-lg font-bold md:whitespace-nowrap"
                @click="declinePolicy"
            >Continue without accepting</button>
            <button
                class="px-4 py-2 text-md xl:text-lg bg-text text-primary rounded-full whitespace-nowrap"
                @click="acceptPolicy"
            >Accept all</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const { userActionReceived, declinePolicy, acceptPolicy } = useCookiePolicy();
</script>

<style scoped>
.cookie-policy-dialog {
	@apply fixed bottom-menu-compact left-0 right-0 bg-primary px-6 py-4;
	@apply xl:rounded-xl xl:left-10 xl:right-10;
}
</style>
