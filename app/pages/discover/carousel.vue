<template>
    <div
        ref="viewport"
        class="overflow-visible flex flex-row flex-nowrap min-w-0 transition-transform duration-300"
        :style="{
            height: cardHeight + 'px',
            minHeight: cardHeight + 'px',
            transform: `translateX(-${carouselCardsOffset}px)`,
        }"
    >
        <Card
            v-for="(card, idx) in carouselCards"
            :ref="`card-${idx}`"
            :key="`${card.nickname}-${idx}`"
            :style="{
                minWidth: cardWidth + 'px',
                minHeight: cardHeight + 'px',
            }"
            :card="card"
        />
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import Card from './card.vue';

const {
    cards,
    active,
    numberOfDisplayedCards,
    sideCardsWidthRatio,
    cardHeightToWidthRatio,
} = defineProps({
    cards: {
        type: Array as PropType<UserHighlight[]>,
        required: true,
    },
    /** Active card index, that is displayed to user */
    active: {
        type: Number,
        required: true,
    },
    /**
	 *  Total number of cards in viewport, including side cards:
	 *  4 cards -> 1) [2, 3] (4
	 *
	 *  3 cards -> 1) [2, 3, 4] (5 where
	 *     #1 & #5    - side cards on left & right, partially visible
	 *     #2. #3, #4 - fully visible cards
	 *
	 *  2 cards -> 1) [2, 3] (4
	 *
	 *  1 card  => 1) [2] (3
	 **/
    numberOfDisplayedCards: {
        type: Number,
        default: 5,
    },
    /**
	 *  How much of side cards on left and right should be displayed
	 *  Should be in range [0 (not visible) ... 1 (fully visible)]
	 */
    sideCardsWidthRatio: {
        type: Number,
        default: 0.3,
        validator: v => typeof v === 'number' && (v >= 0 && v <= 1),
    },
    /**
	 * What the card's height will be in relation to it's width
	 * height = width * cardHeightToWidthRatio
	 */
    cardHeightToWidthRatio: {
        type: Number,
        default: 2,
    },
});

const viewport = useTemplateRef('viewport');
const cardWidth = ref(0);
const cardHeight = ref(0);
const carouselCards = ref<UserHighlight[]>([]);
const carouselCardsOffset = ref(0);

const rotateCarusel = () => {
    carouselCardsOffset.value = (active + (numberOfDisplayedCards > cards.length ? cards.length : numberOfDisplayedCards) + (1 - sideCardsWidthRatio))  * cardWidth.value;
};

const updateCaruselCards = () => {
    const cardsCount = cards.length;

    if (cardsCount === 0) {return;}

    const newCardsArray: UserHighlight[] = [];

    for(let i = 0; i < cardsCount; i++) {
        newCardsArray[i] = cards[i]!;
        newCardsArray[cardsCount + i] = cards[i]!;
        newCardsArray[2 * cardsCount + i] = cards[i]!;
    }

    carouselCards.value = newCardsArray;
};

const alterSize = (viewportSize: DOMRect) => {
    const width = viewportSize.width;
    const expectedRatio = (numberOfDisplayedCards > cards.length ? cards.length : numberOfDisplayedCards) + (2 * sideCardsWidthRatio);

    cardWidth.value = Math.floor(width / expectedRatio / 2) * 2; // make it even;
    cardHeight.value = cardHeightToWidthRatio * cardWidth.value;
};

let lastViewportSize: DOMRect = new DOMRect(0,0,0,0);
const updateState = () => {
    if (viewport.value == null) {
        return;
    }

    const viewportSize = viewport.value.getBoundingClientRect();

    if (viewportSize.toJSON() != lastViewportSize.toJSON()) {
        lastViewportSize = viewportSize;
        alterSize(viewportSize);
        updateCaruselCards();
        rotateCarusel();
    }
};

const debouncedUpdateState = (() => {
    let timerId: number | undefined;

    return () => {
        window.clearTimeout(timerId);
        timerId = window.setTimeout(() => updateState(), 150);
    };
})();

watch(() => [cards], () => {
    updateCaruselCards();
});

watch(() => [active], () => {
    rotateCarusel();
});

onMounted(() => {
    window.addEventListener('resize', debouncedUpdateState);
    updateState();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedUpdateState);
});
</script>
