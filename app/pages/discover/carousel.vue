<template>
    <div
        ref="viewport"
        class="overflow-visible flex flex-row flex-nowrap min-w-0"
        :style="{
            height: cardHeight + 'px',
            minHeight: cardHeight + 'px',
            transform: `translateX(-${carouseTotalOffset}px)`,
        }"
    >
        <Card
            v-for="({card, cardOffset}, idx) in carouselCards"
            :id="`${card.nickname}-${idx}`"
            :ref="`card-${idx}`"
            :key="`${card.nickname}-${idx}`"
            :style="{
                transitionDuration: cardAnimationDuration + 'ms',
                minWidth: cardWidth + 'px',
                minHeight: cardHeight + 'px',
                transform: `translateX(-${cardOffset ?? 0}px)`,
            }"
            :card="card"
            class="transition-transform"
        />
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import Card from './card.vue';

type SwapDirection = 'no-swap' | 'first-to-last-swap' | 'last-to-frist-swap';
type CarouselCard = {
    card: UserHighlight,
    cardOffset?: number;
};

const {
    cards,
    active,
    numberOfDisplayedCards,
    sideCardsWidthRatio,
    cardHeightToWidthRatio,
    cardAnimationDuration,
} = defineProps({
    cards: {
        type: Array as PropType<UserHighlight[]>,
        required: true,
    },
    /** Active card index, that is displayed to user in the center of the area */
    active: {
        type: Number,
        required: true,
    },
    /**
	 * Number of cards been displayed in center and fully visible
	 */
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
    /**
	 *  This is a an animation time for carousel.
	 *  This DOES NOT include time time to swap cards on animation ended.
	 *  When it start, the `animating` event is emitted.
	 *  The `finished` is emmited when carousel finshed animation and
	 *  cards structure swap.
	 */
    cardAnimationDuration: {
        type: Number,
        default: 300,
    },
});

const emit = defineEmits<{
    'animating': [],
    'finished': [],
}>();

const viewport = useTemplateRef('viewport');
const cardWidth = ref(0);
const cardHeight = ref(0);
const carouselCards = ref<CarouselCard[]>([]);
const carouseTotalOffset = ref(0);

let timerId: number | undefined;

const rotateCarusel = (swapDirection: SwapDirection) => {
    emit('animating');

    // carouselCards.value.forEach((card, idx) => {
    //     card.cardOffset = carouseTotalOffset.value - (idx - 1) * cardWidth.value;
    // });

    clearTimeout(timerId);
    timerId = window.setTimeout(() => {
        switch (swapDirection) {
            case 'first-to-last-swap': {
                const card = carouselCards.value.shift()!;
                carouselCards.value.push(card);
                break;
            }

            case 'last-to-frist-swap': {
                const card = carouselCards.value.pop()!;
                carouselCards.value.unshift(card);
                break;
            }

            case 'no-swap':
            default:
                break;
        }

        // carouselCards.value.forEach((card, idx) => {
        //     card.cardOffset = carouseTotalOffset.value - idx * cardWidth.value;
        // });

        emit('finished');
    }, cardAnimationDuration);
};

const updateCaruselCards = () => {
    const cardsCount = cards.length;

    if (cardsCount === 0) {return;}

    const newCardsArray: CarouselCard[] = [];

    for(let i = 0; i < cardsCount; i++) {
        newCardsArray[i] = { card: cards[i]! };
        newCardsArray[cardsCount + i] = { card: cards[i]! };
        newCardsArray[2 * cardsCount + i] = { card: cards[i]! };
    }

    carouselCards.value = newCardsArray;
    carouseTotalOffset.value = (active + cards.length - Math.floor(numberOfDisplayedCards / 2) - sideCardsWidthRatio) * cardWidth.value;
};

const alterSize = (viewportSize: DOMRect) => {
    const width = viewportSize.width;
    const expectedRatio = numberOfDisplayedCards + (2 * sideCardsWidthRatio);

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
        rotateCarusel('no-swap');
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

watch(() => active, (newVal, oldVal) => {
    let swapDirection: SwapDirection = 'no-swap';

    if (newVal === 0) {
        if (oldVal === 1) {
            swapDirection='last-to-frist-swap';
        } else if (oldVal === cards.length - 1) {
            swapDirection='first-to-last-swap';
        } else {
            swapDirection = (newVal > oldVal) ? 'first-to-last-swap' : 'last-to-frist-swap';
        }
    } else if (oldVal === 0) {
        if (newVal === 1) {
            swapDirection='first-to-last-swap';
        } else if (newVal === cards.length - 1) {
            swapDirection='last-to-frist-swap';
        } else {
            swapDirection = (newVal > oldVal) ? 'first-to-last-swap' : 'last-to-frist-swap';
        }
    } else {
        swapDirection = (newVal > oldVal) ? 'first-to-last-swap' : 'last-to-frist-swap';
    }

    rotateCarusel(swapDirection);
});

onMounted(() => {
    window.addEventListener('resize', debouncedUpdateState);
    updateState();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedUpdateState);
});
</script>
