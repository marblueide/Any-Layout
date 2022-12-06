<template>
    <div class="shape" :style="style" @mousedown="handleMouseDown">
        <slot></slot>
    </div>
</template>
    
<script setup lang='ts'>
import type {StyleValue} from 'vue';
import { useLowStore } from '../../stores/useLowStore';


const props = defineProps<{
    style:StyleValue,
    id:string
}>()
const store = useLowStore()
const canvasData = store.getCanvasDataById(props.id)

const handleMouseDown = (e:MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    //@ts-ignore
    const {left,top} = canvasData?.style
    const startX = e.clientX
    const startY = e.clientY

    store.setCurrentComponent(props.id)

    const move = (e:MouseEvent) => {
        const endX = e.clientX
        const endY = e.clientY
        const curX = endX - startX + left
        const curY = endY - startY + top
        store.setCurrentComponentPos(curX,curY)
    }

    const up = () => {
        document.removeEventListener("mousemove",move)
        document.removeEventListener("mouseup",up)
    }

    document.addEventListener("mousemove",move)
    document.addEventListener("mouseup",up)
}

</script>
    
<style scoped lang="scss">
    .shape{
        position: absolute;
    }
</style>