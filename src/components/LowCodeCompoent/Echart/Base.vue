<template>
    <div class="Base" ref="parentRef">
        <div class="echart" ref="echartRef" :style="style"></div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import * as echarts from 'echarts';

const echartRef = ref<HTMLElement>();
const parentRef = ref<HTMLElement>();
let echart: echarts.ECharts;
const style = reactive({
    width: '0px',
    height: '0px'
})

const props = defineProps<{
    option: echarts.EChartsCoreOption
}>()

const unWatch = watch(props.option, (value) => {
    echart && echart.setOption(value)
})

onMounted(() => {
    initEchart()

})

const reSize = () => {
    echart.resize()
}

const initEchart = async () => {
    const rect = parentRef.value!.getBoundingClientRect()
    style.width = rect.width + 'px'
    style.height = rect.height + 'px'
    echart = echarts.init(echartRef.value!);
    echart.setOption(props.option)
    await nextTick()
    echart.resize()
    window.addEventListener("resize", reSize)
}

onUnmounted(() => {
    window.removeEventListener('resize', reSize)
    unWatch()
})

</script>


<style scoped lang="scss">
.Base {
    width: 100%;
    height: 100%;

    .echart {}
}
</style>