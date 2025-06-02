<template>
    <div class="element_dotz">
        <div class="arrow left" @click="handleNextDot(-1)">
            <IconChevron class="w-6 rotate-180" />
        </div>
        <div
            v-for="dot in dotz"
            :key="dot"
            :class="{ 'dot': true, 'is-active': (dot - 1) === active}"
        />
        <div class="arrow right" @click="handleNextDot(1)">
            <IconChevron class="w-6" />
        </div>
    </div>
</template>

<script setup lang="ts">
import InRangeValue from '~/utils/inRangeValue';

const props = defineProps<{
    dotz: number,
    active?: number
}>();
const emits = defineEmits<{
    next: [idx: number],
}>();

const handleNextDot = (delta: -1 | 1) => {
    const next = (props.active ?? 0) + delta;
    const idx = InRangeValue(next, 0, props.dotz - 1);

    emits('next', idx);
};
</script>

<style scoped>
.element_dotz {
	@apply w-full flex flex-row items-center justify-center gap-2;
}

.element_dotz .arrow {
	@apply flex items-center justify-center size-8 hover:bg-highlight text-text rounded-full cursor-pointer;
}

.element_dotz .arrow.left {
	@apply ml-1 mr-auto ;
}

.element_dotz .arrow.right {
	@apply ml-auto mr-1;
}

.element_dotz .dot {
	@apply bg-highlight rounded-full size-2;
	@apply transition-colors duration-200;
}

.element_dotz .dot.is-active {
	@apply bg-text;
}
</style>
