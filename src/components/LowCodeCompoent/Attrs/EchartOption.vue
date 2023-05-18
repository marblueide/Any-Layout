<template>
    <div class="echart-option">
        <el-select v-model="selectValue" @change="handleChange">
            <el-option v-for="item in option" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
        <!-- <AceContainer w="100%" h-100 :value="echartOption" /> -->
    </div>
</template>
    
<script setup lang='ts'>
import { computed, ref, watch } from 'vue';
import { presetsMap } from '../Echart/Presets';
import type * as echarts from "echarts";
import { appStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { LabelEnum, type LowCanvasData } from '@/types';
import AceContainer from '@/components/common/AceContainer.vue';


const { setCurrentProps } = appStore.state
const { currentComponent } = storeToRefs(appStore.state)

const echartOption = computed(() => {
    return currentComponent.value?.type == LabelEnum.echart ? (currentComponent.value as LowCanvasData<LabelEnum.echart>).propValue.echartOption : ''
})

const option = Object.keys(presetsMap).map(item => ({
    label: item,
    value: item
}))

const selectValue = ref<echarts.EChartsOption>();

const handleChange = (value: any) => {
    setCurrentProps({
        echartOption: presetsMap[value]
    })
}

</script>
    
<style scoped lang="scss"></style>