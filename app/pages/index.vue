<!-- Landing page view -->
<template>
    <div>
        landing page

        <Dropdown :triggers="['click']">
            <div class="size-10">testsss</div>
            <template #popper>
                test
            </template>
        </Dropdown>
    </div>
</template>

<script setup lang="ts">
import { Dropdown } from 'floating-vue';
definePageMeta({
    layout: 'landing',
});
</script>
