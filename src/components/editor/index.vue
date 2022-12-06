<template>
    <div class="editor" ref="editorRef" :style="editorStyle" @drop="handleDrop" @dragover="handleDragOver">
        <Grid :width="lowCanvasState.width" :height="lowCanvasState.height" />
        <Shape v-for="item in lowCanvasState.data" :id="item.id!" :style="getShapeStyle(item.style)">
            <component :is="item.component()" :propValue="item.propValue"></component>
        </Shape>
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
import {cloneDeep} from "lodash-es"

const store = useLowStore()
const { lowCanvasState,zIndex } = storeToRefs(store)

const editorRef = ref()
let editorRect: DOMRect;

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
    const data = cloneDeep(componentList[e.dataTransfer?.getData("index") as unknown as number])
    if (!editorRect) editorRect = editorRef.value.getBoundingClientRect()
    //@ts-ignore
    const { width, height } = data.style
    //@ts-ignore
    let left = e.clientX - editorRect.x - width / 2
    let top = e.clientY - editorRect.y - height / 2
    left = left < 0 ? 0 : left >= lowCanvasState.value.width - width ? lowCanvasState.value.width - width : left
    top = top < 0 ? 0 : top >= lowCanvasState.value.height - height ? lowCanvasState.value.height - height : top
    //@ts-ignore
    data.style.left = left
    //@ts-ignore
    data.style.top = top
    data.style.zIndex = zIndex.value
    zIndex.value++
    store.addLowCanvasData(data)
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