<template>
    <span class="element_user-button">
        {{ abbr }}
    </span>
</template>

<script setup lang="ts">
const user = useUser();
const abbr = user.username.value.split(/\s/).map(word=>word.charAt(0)).join('');
</script>

<style>
.element_user-button {
	@apply inline-block rounded-full text-center overflow-hidden text-ellipsis;
}
</style>
