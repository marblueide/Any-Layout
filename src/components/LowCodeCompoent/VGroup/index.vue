<template>
    <div class="combine" :style="style">
        <Shape :id="item.id!" :key="item.id!" :style="getShapeStyle(item.style)" v-for="item in propValue">
            <component :is="item.component()" :style="getOriginStyle(item.style)" :propValue="item.propValue">
            </component>
        </Shape>
    </div>
</template>
    
<script setup lang='ts'>
import type { LowCanvasData } from "@/types/LowCode"
import type { StyleValue } from "vue";
import Shape from "@/components/editor/Shape.vue";
import { getShapeStyle, getOriginStyle } from '../../../utils/style';

const propps = defineProps<{
    propValue: LowCanvasData[],
    style: StyleValue
}>()
</script>
    
<style>

</style>