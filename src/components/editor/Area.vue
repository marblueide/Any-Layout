<template>
    <div class="area" absolute border="1 blue-400" z-1 cursor-move box-border :style="{
        left: left + 'px',
        top: top + 'px',
        width: width + 'px',
        height: height + 'px'
    }">

    </div>
</template>
    
<script setup lang='ts'>
const props = withDefaults(defineProps<{
    left: number,
    top: number
    width?: number,
    height?: number,
}>(), {
    width: 0,
    height: 0
})
</script>
    
<style scoped lang="scss">
.area {}
</style>