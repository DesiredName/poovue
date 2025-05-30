export default defineNuxtPlugin(() => {
    return {
        provide: {
            // Stub
            'hammer': (_el: HTMLElement, _options?: HammerOptions) => {},
        },
    };
});
