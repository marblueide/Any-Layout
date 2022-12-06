<template>
    <el-image v-bind="{...propValue}" loading="lazy" class="el-image"></el-image>
</template>
    
<script setup lang='ts'>
    const props = defineProps<{
        propValue:{
            src:string,
            fit:"fill" | "contain" | "cover" | "none" |"scale-down",
        }
    }>()
</script>
    
<style scoped lang="scss">
    .el-image{
        width: 100%;
        height: 100%;
    }
</style>