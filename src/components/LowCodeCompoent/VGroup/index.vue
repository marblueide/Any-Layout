<template>
    <div class="combine" :style="data.style">
        <component :is="item.component" :style="item.style" :propValue="item.propValue" v-for="item in data.propValue">
        </component>
    </div>
</template>
    
<script setup lang='ts'>
import type { LowCanvasData } from "@/types/LowCode"

const propps = defineProps<{
    data: LowCanvasData,
}>()
</script>
    
<style>

</style>