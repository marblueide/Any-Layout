<template>
    <el-button class="btn" :style="style" v-bind="{ ...propValue }">{{ propValue.value }}</el-button>
</template>
    
<script setup lang='ts'>
import type { StyleValue } from 'vue';

const propps = defineProps<{
    propValue: {
        value: string,
    },
    style?: StyleValue
}>()
</script>
    
<style scoped lang="scss">
.btn {
    width: 100%;
    height: 100%;
}
</style>