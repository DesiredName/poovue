<template>
    <Dropdown :triggers="['click']">
        <IconFlag v-bind="$attrs" :country-code="locale" />

        <template #popper>
            test
        </template>
    </Dropdown>
</template>

<script setup lang="ts">
import { Dropdown } from 'floating-vue';

const { locale } = useI18n();
</script>
