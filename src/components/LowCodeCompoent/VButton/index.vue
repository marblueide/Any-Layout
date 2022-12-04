<template>
    <el-button>{{propValue.value}}}</el-button>
</template>
    
<script setup lang='ts'>
    const propps = defineProps<{
        propValue:{
            value:string,
        }
    }>()
</script>
    
<style>
    
</style>