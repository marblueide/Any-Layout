<template>
    <div class="editor" ref="editorRef" :style="editorStyle" @drop="handleDrop" @dragover="handleDragOver">
        <Grid :width="lowCanvasState.width" :height="lowCanvasState.height" />
        <Shape v-for="item in lowCanvasState.data" :style="getShapeStyle(item.style)"/>
    </div>
</template>
    
<script setup lang='ts'>
import { useLowStore } from '@/stores/useLowStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { getShapeStyle } from '../../utils/style';
import { componentList } from '@/components/LowCodeCompoent/component-list';
import Grid from "./Grid.vue"
import Shape from './Shape.vue';

const store = useLowStore()
const { lowCanvasState } = storeToRefs(store)

const editorRef = ref()
let editorRect:DOMRect;

const editorStyle = computed(() => {
    return {
        width: lowCanvasState.value.width + 'px',
        height: lowCanvasState.value.height + 'px',
        background: lowCanvasState.value.background,
        opacity: lowCanvasState.value.opacity,
        transform: `scalc(${lowCanvasState.value.scale})`
    }
})

const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const data = componentList[e.dataTransfer?.getData("index") as unknown as number]
    if(!editorRect) editorRect = editorRef.value.getBoundingClientRect()
    //@ts-ignore
    const left  =  e.clientX - editorRect.x
    const top = e.clientY - editorRect.y
    
}

const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
}
</script>
    
<style scoped lang="scss">
.editor {
    position: relative;
}
</style>