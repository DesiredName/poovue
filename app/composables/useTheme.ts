declare type AppTheme = 'dark' | 'light';

export const THEME_KEY = Object.freeze('app-theme');

export default function useTheme() {
    const theme = useCookie(THEME_KEY, {
        default: () => ref<AppTheme | null>(null),
    });

    const switchTheme = () => {
        if (import.meta.client && window) {
            setTheme( theme.value === 'dark' ? 'light' : 'dark');
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
        switchTheme,
    };
}
