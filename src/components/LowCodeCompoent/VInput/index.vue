<template>
    <input class="vInput" :type="propValue.type" :placeholder="propValue.placeholder" p-0 :value="propValue.value"
        :style="style" />
</template>
    
<script setup lang='ts'>
import type { StyleValue } from 'vue';

const props = defineProps<{
    propValue: {
        type?: string,
        placeholder?: string,
        value: string,
    },
    style?: StyleValue
}>()
</script>
    
<style scoped lang="scss">
.vInput {
    width: 100%;
    height: 100%;
}
</style>