import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                oswald: ['Oswald', 'sans'],
            },
            colors: {
                'primary': 'var(--color-primary)',
                'secondary': 'var(--color-secondary)',
                'text': 'var(--color-text)',
                'highlight': 'var(--color-highlight)',
                'highlight-text': 'var(--color-highlight-text)',
                'active-element': 'var(--color-active-element)',

                'brand-primary': 'var(--color-brand-primary)',
                'brand-secondary': 'var(--color-brand-secondary)',
                'brand-text': 'var(--color-brand-text)',
            },
            spacing: {
                ['menu-compact']: 'var(--menu-compact-height)',
            },
            height: {
                ['menu-compact']: 'var(--menu-compact-height)',
            },
        },
    },
};
