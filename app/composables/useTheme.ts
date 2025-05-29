declare type AppTheme = 'dark' | 'light';

const THEME_KEY = Object.freeze('app-theme');

export default function useTheme() {
    const theme = useCookie(THEME_KEY, {
        default: () => ref<AppTheme | null>(null),
    });

    const setIntialTheme = () => {
        if (import.meta.client && window && theme.value == null) {
            const result = window.matchMedia('(prefers-color-scheme: dark)');

            if (result.matches){
                setTheme('dark');
            } else {
                setTheme('light');
            }
        }
    };

    const setTheme = (selected: AppTheme) => {
        theme.value = selected;

        if (import.meta.client && window) {
            document.body.parentElement!.setAttribute(THEME_KEY, selected);
        }
    };

    return {
        theme: readonly(theme),
        setTheme,
        setIntialTheme,
    };
}
