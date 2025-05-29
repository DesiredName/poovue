<template>
    <svg
        v-if="countryCode === 'us'"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 513 342"
        style="pointer-events: none;"
        v-bind="$attrs"
    >
        <path fill="#FFF" d="M0 0h513v342H0z" />
        <g fill="#D80027">
            <path
                d="M0 0h513v26.3H0zM0 52.6h513v26.3H0zM0 105.2h513v26.3H0zM0 157.8h513v26.3H0zM0 210.5h513v26.3H0zM0 263.1h513v26.3H0zM0 315.7h513V342H0z"
            />
        </g>
        <path fill="#2E52B2" d="M0 0h256.5v184.1H0z" />
        <g fill="#FFF">
            <path
                d="m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zM104.1 138.9l-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zM160.6 138.9l-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zM216.8 138.9l-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zM43.8 75.3l-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zM156.3 75.3l-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zM212.8 75.3l-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zM43.8 24.7l-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zM100 24.7l-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zM156.3 24.7l-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zM212.8 24.7l-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z"
            />
        </g>
    </svg>


    <svg
        v-if="countryCode === 'ru'"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 85.333 512 341.333"
        style="pointer-events: none;"
        v-bind="$attrs"
    >
        <path fill="#FFF" d="M0 85.33v341.332h512V85.33z"/>
        <path fill="#0052B4" d="M0 85.333h512V426.67H0z"/>
        <path fill="#FFF" d="M0 85.333h512v113.775H0z"/>
        <path fill="#D80027" d="M0 312.884h512v113.775H0z"/>
    </svg>


    <svg
        v-if="countryCode === 'cz'"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 513 342"
        style="pointer-events: none;"
        v-bind="$attrs"
    >
        <path fill="#11457e" d="M0 0h513v342H0z"/>
        <path fill="#d7141a" d="M513 171v171H0l256.5-171z"/>
        <path fill="#FFF" d="M513 0v171H256.5L0 0z"/>
    </svg>
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';

defineProps<{
    countryCode: Locale
}>();
</script>
