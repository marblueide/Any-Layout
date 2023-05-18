<template>
    <div class="echart" ref="echartRef" :style="style"></div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import * as echarts from 'echarts';
import { throttle } from "lodash-es"

const echartRef = ref<HTMLElement>();
let echart: echarts.ECharts;
let observer;
const style = reactive({
    width: '100%',
    height: '0px'
})

const props = defineProps<{
    propValue: {
        echartOption: echarts.EChartsCoreOption
    }
}>()

const unWatchEchartOption = watch(() =>  props.propValue.echartOption, (value) => {
    echart.clear()
    echart && echart.setOption(value)
})

onMounted(() => {
    initEchart()
})

const reSize = () => {
    echart.resize()
}

const setStyle = () => {
    const rect = echartRef.value!.parentElement!.getBoundingClientRect()
    style.width = rect.width + 'px'
    style.height = rect.height + 'px';
    echart && echart.resize()
}

const initEchart = async () => {
    setStyle();
    observer = new MutationObserver(setStyle)
    observer.observe(echartRef.value!.parentElement!,{
        attributes:true,
        attributeFilter:['style']
    })
    echart = echarts.init(echartRef.value!);
    echart.setOption(props.propValue.echartOption)
    await nextTick()
    echart.resize()
}

onUnmounted(() => {
    unWatchEchartOption()
})

defineExpose({
    reSize
})

</script>


<style scoped lang="scss">
.Base {
    width: calc(100% - 1px);
    height: calc(100% - 1px);

    .echart {}
}
</style>