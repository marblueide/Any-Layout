
<template>
    <div class="events">
        <el-form-item :label="label">
            <div class="wrapper" grid>
                <!-- {{ currentComponent!.events[label]!.type }} -->
                <el-select class="m-2" placeholder="Select" :modelValue="currentComponent!.events[label]!.type"
                    @change="handleChangeType">
                    <el-option v-for="(item, index) in eventSelect" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
                <div my-2 p-2 border="l-3 gray-2" v-show="eventComponent[currentComponent!.events[label]!.type]">
                    <component :is="eventComponent[currentComponent!.events[label]!.type]"
                        v-bind="{ ...currentComponent!.events[label] }" @change="handleChange"></component>
                </div>
            </div>
        </el-form-item>
    </div>
</template>
    
<script setup lang='ts'>
import { eventDefaultList, eventSelect, eventComponent } from './event.list';
import { storeToRefs } from 'pinia';
import type { EventEnum, EventTypeEnum } from '@/types/LowCode/event';
import { appStore } from '@/stores';

const { currentComponent } = storeToRefs(appStore.state)
const {setCUrrentCompoentEvent} = appStore.state

const handleChangeType = (value: EventTypeEnum) => {
    console.log(value)
    setCUrrentCompoentEvent({
        [props.label]: eventDefaultList[value]
    },false)
}

const handleChange = (key: string, value: EventTypeEnum) => {
    console.log(key,value)
    setCUrrentCompoentEvent({
        [props.label]: {
            [key]: value
        }
    })
}

const props = defineProps<{
    label: keyof typeof EventEnum
}>()
</script>
    
<style scoped lang="scss">
.events {
    .wrapper {
        width: 100%;

        .el-select {
            margin: 0;
        }
    }
}
</style>