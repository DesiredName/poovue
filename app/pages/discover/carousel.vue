<template>
    <div
        ref="viewport"
        class="overflow-visible flex flex-row flex-nowrap min-w-0"
        :style="{
            height: cardHeight + 'px',
            minHeight: cardHeight + 'px',
            transform: `translateX(${carouseTotalOffset}px)`,
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
                transform: `translateX(${cardOffset ?? 0}px)`,
            }"
            :card="card"
            class="transition-transform ease-[cubic-bezier(.35,1,.8,1)]"
        />

        <div
            ref="mobile_detector"
            class="max-w-0 max-h-0 top-0 left-0 absolute bg-transparent opacity-0 xl:opacity-100"
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
        type: Object as PropType<null | { desktop: number, mobile: number }>,
        default: null,
    },
    /**
	 *  How much of side cards on left and right should be displayed
	 *  Should be in range [0 (not visible) ... 1 (fully visible)]
	 */
    sideCardsWidthRatio: {
        type: Object as PropType<null | { desktop: number, mobile: number }>,
        default: null,
        validator: v => v != null && typeof v === 'object' && ('desktop' in v) && ('mobile' in v),
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

const { discoverSection: {
    highlightsPreviewItemsDisplayed,
    highlightsPreviewItemsFlanDisplayRatio,
}} = useAppConfig();

const viewport = useTemplateRef('viewport');
const mobile_detector = useTemplateRef('mobile_detector');
const cardWidth = ref(0);
const cardHeight = ref(0);
const carouselCards = ref<CarouselCard[]>([]);
const carouseTotalOffset = ref(0);

let timerId: number | undefined;

const isMobile = () => {
    if (window && mobile_detector.value) {
        // Detect device using CSS function. We consider `mobile` any device, that has
        // width <= xl: size of Tailwind class. Detector has opacity of `0` if this is
        // `mobile` and `1` otherwise
        const opacity = window.getComputedStyle(mobile_detector.value).opacity;

        return opacity == '0';
    }

    return false;
};

const rotateCarousel = (options?: {
    updateImmediately?: boolean;
    swapDirection?: SwapDirection;
    /**
	 * We can programmatocally change active idx, number of swaps might be > 1.
	 * Passing this value allows the carousel to swap as many cards as needed in
	 * a loop.
	 */
    swapChanges?: number;
}) => {
    emit('animating');

    const {
        updateImmediately = false,
        swapChanges = 1,
        swapDirection = 'no-swap',
    } = options ?? {};

    let swaps = swapChanges;

    const offset = swapDirection === 'no-swap'
        ? 0
        : (swapDirection === 'first-to-last-swap' ? -1 : 1) * cardWidth.value * swaps;

    carouselCards.value.forEach(card => {
        card.cardOffset = offset;
    });

    clearTimeout(timerId);

    timerId = window.setTimeout(async () => {
        const newCardsArray: CarouselCard[] = Array.from(carouselCards.value);
        while(swaps-- > 0) {
            switch (swapDirection) {
                case 'first-to-last-swap': {
                    const card = newCardsArray.shift()!;
                    newCardsArray.push(card);
                    break;
                }

                case 'last-to-frist-swap': {
                    const card = newCardsArray.pop()!;
                    newCardsArray.unshift(card);
                    break;
                }

                case 'no-swap':
                default:
                    break;
            }
        }

        newCardsArray.forEach((card) => {
            card.cardOffset = 0;
        });

        carouselCards.value = newCardsArray;

        await nextTick();

        emit('finished');
    }, updateImmediately ? 0 : cardAnimationDuration);
};

const updateCarouselCards = () => {
    const cardsCount = cards.length;

    if (cardsCount === 0) {
        return;
    }

    const newCardsArray: CarouselCard[] = [];

    for(let i = 0; i < cardsCount; i++) {
        newCardsArray[i] = { card: cards[i]! };
        newCardsArray[cardsCount + i] = { card: cards[i]! };
        newCardsArray[2 * cardsCount + i] = { card: cards[i]! };
    }

    carouselCards.value = newCardsArray;
};

const alterSize = (viewportSize: DOMRect) => {
    const _numberOfDisplayedCards = numberOfDisplayedCards ?? highlightsPreviewItemsDisplayed;
    const _sideCardsWidthRatio = sideCardsWidthRatio ?? highlightsPreviewItemsFlanDisplayRatio;

    const displayedCards = isMobile() === true
        ? _numberOfDisplayedCards.mobile
        : _numberOfDisplayedCards.desktop;

    const cardsWidthRatio = isMobile() === true
        ? _sideCardsWidthRatio.mobile
        : _sideCardsWidthRatio.desktop;

    const width = viewportSize.width;
    const expectedRatio = displayedCards + (2 * cardsWidthRatio);

    cardWidth.value = Math.floor(width / expectedRatio / 2) * 2; // make it even;
    cardHeight.value = cardHeightToWidthRatio * cardWidth.value;

    carouseTotalOffset.value = -1 * (active + cards.length - Math.floor(displayedCards / 2) - cardsWidthRatio) * cardWidth.value;
};

let lastViewportSize: DOMRect = new DOMRect(0,0,0,0);
const updateState = () => {
    if (viewport.value == null) {
        return;
    }

    const viewportSize = viewport.value.getBoundingClientRect();

    if ((viewportSize.width != lastViewportSize.width) || (viewportSize.height != lastViewportSize.height)) {
        lastViewportSize = viewportSize;
        alterSize(viewportSize);
        updateCarouselCards();
        rotateCarousel({ updateImmediately: true });
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
    debouncedUpdateState();
});

watch(() => active, (newVal, oldVal) => {
    let swapChanges: number = 1;
    let swapDirection: SwapDirection = 'no-swap';

    if (newVal === 0) {
        if (oldVal === 1) {
            swapDirection='last-to-frist-swap';
        } else if (oldVal === cards.length - 1) {
            swapDirection='first-to-last-swap';
        } else {
            swapChanges = Math.abs(newVal - oldVal);
            swapDirection = (newVal > oldVal) ? 'first-to-last-swap' : 'last-to-frist-swap';
        }
    } else if (oldVal === 0) {
        if (newVal === 1) {
            swapDirection='first-to-last-swap';
        } else if (newVal === cards.length - 1) {
            swapDirection='last-to-frist-swap';
        } else {
            swapChanges = Math.abs(newVal - oldVal);
            swapDirection = (newVal > oldVal) ? 'first-to-last-swap' : 'last-to-frist-swap';
        }
    } else {
        swapChanges = Math.abs(newVal - oldVal);
        swapDirection = (newVal > oldVal) ? 'first-to-last-swap' : 'last-to-frist-swap';
    }

    rotateCarousel({
        swapDirection,
        swapChanges,
    });
});

onMounted(() => {
    window.addEventListener('resize', debouncedUpdateState);
    updateState();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedUpdateState);
});
</script>
