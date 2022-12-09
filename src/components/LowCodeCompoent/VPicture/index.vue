
<template>
    <el-image :style="style" v-bind="{ ...propValue }" loading="lazy" class="el-image"></el-image>
</template>
    
<script setup lang='ts'>
import type { StyleValue } from 'vue';
const props = defineProps<{
    propValue: {
        src: string,
        fit: "fill" | "contain" | "cover" | "none" | "scale-down",
    },
    style: StyleValue
}>()
</script>
    
<style scoped lang="scss">
.el-image {
    width: 100%;
    height: 100%;
}
</style>