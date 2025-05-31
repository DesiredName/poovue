<template>
    <span class="element_user-button">
        <span>
            {{ user.shortname }}
        </span>
    </span>
</template>

<script setup lang="ts">
const user = await useUser(2);
</script>

<style>
.element_user-button {
	@apply inline-flex rounded-full items-center content-center justify-center text-center overflow-hidden text-ellipsis;
}
</style>
