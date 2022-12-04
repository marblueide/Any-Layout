<template>
    <el-image v-bind="{...propValue}" loading="lazy"></el-image>
</template>
    
<script setup lang='ts'>
    const props = defineProps<{
        propValue:{
            src:string,
            fit:"fill" | "contain" | "cover" | "none" |"scale-down",
        }
    }>()
</script>
    
<style>
    
</style>