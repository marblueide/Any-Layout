<template>
    <div class="shape" :style="style">
        <slot></slot>
    </div>
</template>
    
<script setup lang='ts'>
import type {StyleValue} from 'vue';
const props = defineProps<{
    style:StyleValue
}>()
</script>
    
<style>
    
</style>