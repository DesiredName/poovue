<template>
    <span class="element_user-button">
        <span class="translate-y-[-2px]">
            {{ abbr }}
        </span>
    </span>
</template>

<script setup lang="ts">
const user = useUser();
const abbr = user.username.value.split(/\s/).map(word=>word.charAt(0)).join('');
</script>

<style>
.element_user-button {
	@apply inline-flex rounded-full items-center content-center justify-center text-center overflow-hidden text-ellipsis;
}
</style>
