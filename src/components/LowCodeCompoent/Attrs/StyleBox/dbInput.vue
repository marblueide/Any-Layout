<template>
    <span v-show="!isEditor" @dblclick="setIsEditor(true)" ref="spanRef">{{ value }}</span>
    <input ref="inputRef" :type="type" :value="value" :style="style" border-none outline-none @input="handleInput"
        @blur="setIsEditor(false)" v-show="isEditor" @keydown.enter="handleEnter">
</template>
    
<script setup lang='ts'>
import { ref, type InputHTMLAttributes, onMounted, nextTick } from 'vue'

const props = withDefaults(defineProps<{
    value: any,
    type?: 'text' | 'number'
}>(), {
    type: "number"
})

const isEditor = ref(false)
const spanRef = ref<HTMLElement>();
const inputRef = ref<HTMLElement>();

const style = ref({
    width: '0px',
    height: '0px'
})

const emit = defineEmits<{
    (e: 'update:value', value: any): void
}>()

const handleInput = (e: Event) => {
    const value = props.type == 'number' ? Number((e.target as InputHTMLAttributes).value) : (e.target as InputHTMLAttributes).value
    emit('update:value', value);
    const metrics = getTextWidth((e.target as InputHTMLAttributes).value)
    style.value.width = metrics.width + 10 + 'px';
}

const getTextWidth = (text: string, font: string = 'Microsoft YaHei') => {
    //获取文本宽度
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context!.font = font;
    const metrics = context!.measureText(text);
    return metrics;
}

const setIsEditor = (value: boolean) => {
    if (value) {
        const rect = spanRef.value!.getBoundingClientRect()
        style.value.width = rect.width + 'px';
        style.value.height = rect.height + 'px';
        nextTick().then(() => {
            inputRef.value?.focus()
        })
    }
    isEditor.value = value;
}

const handleEnter = (e: KeyboardEvent) => {
    isEditor.value = false
}
</script>
    
<style scoped lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>