export default ({
    mainTitle: 'TechTribe',

    discoverSection: {
        /** How many preview items to load */
        highlightsPreviewItems: 7,

        /** How many preview items to display */
        highlightsPreviewItemsDisplayed: {
            desktop: 3,
            mobile: 1,
        },

        /** How many in % [0...1] of flank items in gallery should be displayed */
        highlightsPreviewItemsFlanDisplayRatio: {
            desktop: 0.25,
            mobile: 0.15,
        },

        /** Time in MS for a 1 card to swipe */
        highlightsSwipeAnimationDuration: 450,

        /** Time in MS for automatic carousel swipe */
        highlightsAutoSwipeAnimationInterval: 5000,
    },
});
