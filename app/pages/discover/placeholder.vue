<template>
    <div class="w-full">
        <div class="flex flex-row overflow-visible gap-4 min-w-0">
            <div
                v-for="p in 15"
                :key="p"
                class="min-w-[320px] min-h-[550px] bg-secondary"
            />
        </div>
        <br>
        <div class="bg-secondary min-h-6"/>
    </div>
</template>

