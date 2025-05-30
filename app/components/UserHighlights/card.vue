<template>
    <div
        :style="{
            backgroundImage: `url('${card?.background}')`
        }">
        <div/>
        <div>
            {{  card?.username }}
            <br>
            {{  card?.nickname }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ card?: UserHighlight }>();
</script>
