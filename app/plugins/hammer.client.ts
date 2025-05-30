import Hammer from 'hammerjs';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            'hammer': (el: HTMLElement, options?: HammerOptions) => new Hammer(el, options),
        },
    };
});
