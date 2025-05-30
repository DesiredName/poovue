<template>
    <div
        ref="source"
        class="border-none outline-none select-none"
        @click="isActive = !isActive"
    >
        <slot />

        <ElementDropback
            v-if="isActive"
            @click.self="isActive = false"
        >
            <div
                ref="target"
                style="position: absolute !important;"
                :class="$attrs.class"
                class="locales-list"
            >
                <div
                    v-for="locale in localeCodes"
                    :key="locale"
                    class="locales-list-item"
                    @click="handleSetLocale(locale)"
                >
                    <IconFlag :country-code="locale"/> {{ localeNamesDict.get(locale) }}
                </div>
            </div>
        </ElementDropback>
    </div>
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';

const source = useTemplateRef<HTMLElement | null>('source');
const target = useTemplateRef<HTMLElement | null>('target');

const isActive = ref<boolean>(false);
const { setLocale, localeCodes, locales } = useI18n();
const handleSetLocale = (locale: Locale) => {
    setLocale(locale);
    isActive.value = false;
};
const localeNamesDict = locales.value.reduce((acc, locale) => {
    acc.set(locale.code, locale.name ?? locale.code);
    return acc;
}, new Map<Locale, string>());
const props = withDefaults(defineProps<{
    /** Defines how list of locales is aligned on X axis relative to source element */
    xAlign?: 'left' | 'right',
    /** Defines how list of locales is aligned on Y axis relative to source element */
    yAlign?: 'top' | 'bottom',
}>(), {
    xAlign: 'left',
    yAlign: 'bottom',
});

watch(isActive, async () => {
    await nextTick();

    if (target.value != null && source.value != null && isActive.value === true) {
        const sourceRect = source.value.getBoundingClientRect();

        switch(props.xAlign) {
            case 'right':
                target.value.style.right = window.innerWidth - sourceRect.right + 'px';
                break;
            case 'left':
            default:
                target.value.style.left = sourceRect.x + 'px';
                break;
        }

        switch(props.yAlign) {
            case 'top':
                target.value.style.top = sourceRect.y + 'px';
                break;
            case 'bottom':
            default:
                target.value.style.bottom = window.innerHeight - sourceRect.bottom + 'px';
                break;
        }
    }
});
</script>

<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<style scoped>
.locales-list {
	@apply flex flex-col gap-2 min-w-10 w-max max-w-60 min-h-10 h-max max-h-40 bg-secondary p-2;
}

.locales-list-item {
	@apply flex flex-row flex-nowrap whitespace-nowrap overflow-hidden text-ellipsis max-w-60 first-letter:uppercase gap-4 cursor-pointer select-none;
	@apply px-4 py-2 rounded-md;
	@apply hover:bg-highlight transition-colors duration-200;
}
</style>
