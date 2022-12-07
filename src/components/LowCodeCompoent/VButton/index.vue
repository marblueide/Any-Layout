<template>
    <el-button class="btn">{{propValue.value}}</el-button>
</template>
    
<script setup lang='ts'>
    const propps = defineProps<{
        propValue:{
            value:string,
        }
    }>()
</script>
    
<style scoped lang="scss">
    .btn{
        width: 100%;
        height: 100%;
    }
</style>