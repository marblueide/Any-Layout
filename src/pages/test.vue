<template>

    <div class="test" w="600px" h="500px">
        <h1>Test</h1>
        <Echarts :option="option"/>
    </div>
</template>
    
<script setup lang='ts'>
import Echarts from "@/components/LowCodeCompoent/Echart/indedx.vue.js"
import { reactive } from "vue";
const option = reactive<echarts.EChartsCoreOption>({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }
    ]
})
</script>
    
<style scoped lang="scss"></style>