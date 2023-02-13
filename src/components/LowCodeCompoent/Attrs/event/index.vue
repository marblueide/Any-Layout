
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
import { eventList, eventSelect, eventComponent } from './event.list';
import { ref, toRefs, watch } from 'vue';
import { useLowStore } from '@/stores/useLowStore';
import { storeToRefs } from 'pinia';
import type { EventEnum, EventTypeEnum } from '@/types/LowCode/event';

const store = useLowStore()
const { currentComponent } = storeToRefs(store)


const handleChangeType = (value: EventTypeEnum) => {
    store.setCUrrentCompoentEvent({
        [props.label]: eventList[value]
    })
}

const handleChange = (key: string, value: EventTypeEnum) => {
    console.log(key,value)
    store.setCUrrentCompoentEvent({
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