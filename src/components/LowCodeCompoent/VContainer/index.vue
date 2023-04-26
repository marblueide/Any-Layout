<template>
        <div class="container" w="100%" h="100%" :style="style">

        </div>
</template>
    
<script setup lang='ts'>
import { StyleValue } from 'vue';

const props = defineProps<{
        style?: StyleValue
}>()
</script>
    
<style scoped lang="scss"></style>