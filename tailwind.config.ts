import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                'primary': 'var(--color-primary)',
                'secondary': 'var(--color-secondary)',
                'text': 'var(--color-text)',
                'highlight': 'var(--color-highlight)',
                'highlight-text': 'var(--color-highlight-text)',

                'brand-primary': 'var(--color-brand-primary)',
                'brand-secondary': 'var(--color-brand-secondary)',
                'brand-text': 'var(--color-brand-text)',
            },
        },
    },
};
