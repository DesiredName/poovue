<template>
    <div class="relative w-full overflow-hidden">
        <!-- Main Gallery Container -->
        <div
            ref="galleryContainer"
            class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4"
            @scroll="handleScroll"
        >
            <!-- Left Spacer (for centering) -->
            <div :style="{ minWidth: `${spacerWidth}px` }"/>

            <!-- Gallery Items -->
            <div
                v-for="(card, index) in cards"
                :key="index"
                class="snap-center flex-shrink-0 transition-all duration-150"
                :style="{
                    width: `${itemWidth}px`,
                    opacity: getItemOpacity(index),
                    transform: getItemTransform(index),
                }"
            >
                <Card :card="card" class="h-full" :style="{ width: `${itemWidth}px`, }" />
            </div>

            <!-- Right Spacer (for centering) -->
            <div :style="{ minWidth: `${spacerWidth}px` }"/>
        </div>

        <!-- Navigation Arrows -->
        <button
            v-if="showNavigation"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10"
            :class="{ 'opacity-50 cursor-not-allowed': !canScrollLeft }"
            :disabled="!canScrollLeft"
            @click="scroll(-1)"
        >
            &larr;
        </button>
        <button
            v-if="showNavigation"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10"
            :class="{ 'opacity-50 cursor-not-allowed': !canScrollRight }"
            :disabled="!canScrollRight"
            @click="scroll(1)"
        >
            &rarr;
        </button>
    </div>
</template>

<script lang="ts">
import Card from './card.vue';

import { ref, computed, onMounted, onUnmounted, watch, type PropType } from 'vue';

export default {
    name: 'ImageGallery',
    components: {
        Card,
    },
    props: {
        cards: {
            type: Array as PropType<UserHighlight[]>,
            required: true,
        },
        visibleCount: {
            type: Number,
            default: 3,
            validator: (value: number) => value > 0,
        },
        visiblePercent: {
            type: Number,
            default: 30,
            validator: (value: number) => value >= 0 && value <= 100,
        },
        itemWidth: {
            type: Number,
            default: 200,
        },
        itemGap: {
            type: Number,
            default: 16,
        },
    },
    emits: ['image-selected'],
    setup(props, { emit }) {
        const galleryContainer = ref<HTMLElement | null>(null);
        const scrollPosition = ref(0);
        const maxScroll = ref(0);
        const containerWidth = ref(0);
        const showNavigation = ref(false);

        // Calculate spacer width to center the gallery
        const spacerWidth = computed(() => {
            return (containerWidth.value - props.itemWidth * props.visibleCount - props.itemGap * (props.visibleCount - 1)) / 2;
        });

        // Calculate if we can scroll left/right
        const canScrollLeft = computed(() => scrollPosition.value > 0);
        const canScrollRight = computed(() => scrollPosition.value < maxScroll.value);

        // Calculate opacity for flank images
        const getItemOpacity = (index: number) => {
            const centerIndex = scrollPosition.value / (props.itemWidth + props.itemGap);
            const distanceFromCenter = Math.abs(index - centerIndex);
            const visibleThreshold = props.visibleCount / 2;

            if (distanceFromCenter <= visibleThreshold) {
                return 1; // Fully visible
            }

            // Calculate how far beyond the threshold we are
            const excessDistance = distanceFromCenter - visibleThreshold;
            const maxExcess = Math.ceil(props.cards.length / 2) - visibleThreshold;
            const opacityReduction = (excessDistance / maxExcess) * (1 - props.visiblePercent / 100);

            return Math.max(props.visiblePercent / 100, 1 - opacityReduction);
        };

        // Calculate scale transform for flank images
        const getItemTransform = (index: number) => {
            const centerIndex = scrollPosition.value / (props.itemWidth + props.itemGap);
            const distanceFromCenter = Math.abs(index - centerIndex);
            const visibleThreshold = props.visibleCount / 2;

            if (distanceFromCenter <= visibleThreshold) {
                return 'scale(1)'; // Full size
            }

            // Scale down based on distance
            const scale = 1 - (distanceFromCenter - visibleThreshold) * 0.1;
            return `scale(${Math.max(0.7, scale)})`;
        };

        // Handle scroll events
        const handleScroll = () => {
            if (galleryContainer.value) {
                scrollPosition.value = galleryContainer.value.scrollLeft;
            }
        };

        // Programmatic scroll
        const scroll = (direction: number) => {
            if (!galleryContainer.value) return;

            const scrollAmount = (props.itemWidth + props.itemGap) * direction;
            galleryContainer.value.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        };

        // Select an image
        const selectImage = (index: number) => {
            emit('image-selected', index);
        };

        // Update container measurements
        const updateMeasurements = () => {
            if (galleryContainer.value) {
                containerWidth.value = galleryContainer.value.clientWidth;
                maxScroll.value = galleryContainer.value.scrollWidth - galleryContainer.value.clientWidth;
                showNavigation.value = galleryContainer.value.scrollWidth > galleryContainer.value.clientWidth;
            }
        };

        // Initialize and handle resize
        onMounted(() => {
            updateMeasurements();
            window.addEventListener('resize', updateMeasurements);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', updateMeasurements);
        });

        // Watch for prop changes
        watch(() => [props.cards, props.visibleCount, props.itemWidth], updateMeasurements);

        return {
            galleryContainer,
            spacerWidth,
            canScrollLeft,
            canScrollRight,
            showNavigation,
            getItemOpacity,
            getItemTransform,
            handleScroll,
            scroll,
            selectImage,
        };
    },
};
</script>

<style scoped>
/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  display: none;
}

/* For Firefox */
.scroll-hide {
  scrollbar-width: none;
}
</style>
