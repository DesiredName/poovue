<template>
    <ClientOnly>
        <Teleport to="body">
            <div class="fixed inset-0 bg-black/30" v-bind="$attrs">
                <slot />
            </div>
        </Teleport>
    </ClientOnly>
</template>

<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
