<template>
    <div class="box" w="100%" h="100%" relative v-if="currentComponent">
        <div class="margin-box" relative b="1 dashed black">
            <div class="top">
                        <dbInput type="number" :value="margin?.[0] ?? '-'" @update:value="handlePadingOrMargin('margin',0,$event)" />
                    </div>
                    <div class="right">
                        <dbInput type="number" :value="margin?.[1] ?? '-'" @update:value="handlePadingOrMargin('margin',1,$event)" />
                    </div>
                    <div class="bottom">
                        <dbInput type="number" :value="margin?.[2] ?? '-'" @update:value="handlePadingOrMargin('margin',2,$event)" />
                    </div>
                    <div class="left">
                        <dbInput type="number" :value="margin?.[3] ?? '-'" @update:value="handlePadingOrMargin('margin',3,$event)" />
                    </div>
                    <div class="title">margin</div>
            <div class="border-box" relative h="100%" b="1 solid black">
                <div class="top">
                    <dbInput type="number" :value="borderTopWidth ?? '-'"  @update:value="handleBorderChange('borderTopWidth',$event)"/>
                </div>
                <div class="right">
                    <dbInput type="number" :value="borderRightWidth ?? '-'"  @update:value="handleBorderChange('borderRightWidth',$event)"/>
                </div>
                <div class="bottom">
                    <dbInput type="number" :value="borderBottomWidth ?? '-'"  @update:value="handleBorderChange('borderBottomWidth',$event)"/>
                </div>
                <div class="left">
                    <dbInput type="number" :value="borderLeftWidth ?? '-'"  @update:value="handleBorderChange('borderLeftWidth',$event)"/>
                </div>
                <div class="title">border</div>
                <div class="padding-box" relative h="100%" b="1 dashed black">
                    <div class="top">
                        <dbInput type="number" :value="padding?.[0] ?? '-'"  @update:value="handlePadingOrMargin('padding',0,$event)"/>
                    </div>
                    <div class="right">
                        <dbInput type="number" :value="padding?.[1] ?? '-'" @update:value="handlePadingOrMargin('padding',1,$event)" />
                    </div>
                    <div class="bottom">
                        <dbInput type="number" :value="padding?.[2] ?? '-'" @update:value="handlePadingOrMargin('padding',2,$event)" />
                    </div>
                    <div class="left">
                        <dbInput type="number" :value="padding?.[3] ?? '-'" @update:value="handlePadingOrMargin('padding',3,$event)" />
                    </div>
                    <div class="title">padding</div>
                    <div class="content" h="100%" b="1 solid black" flex justify-center items-center>
                        <dbInput type="number" :value="currentComponent.style.width" @update:value="handleChange('width', $event)" /> ×
                        <dbInput type="number" :value="currentComponent.style.height" @update:value="handleChange('height', $event)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { computed, ref } from "vue";
import { useAttr } from "../useAttr";
import dbInput from "./dbInput.vue";

const { currentComponent, handleChange } = useAttr();

const padding = ref(currentComponent.value?.style.padding?.trim().replace(/\s+/g, ' ').split(' ').map(item => parseInt(item)));
const margin = ref(currentComponent.value?.style.margin?.trim().replace(/\s+/g, ' ').split(' ').map(item => parseInt(item)));

const borderTopWidth = ref(currentComponent.value?.style.borderTopWidth)
const borderBottomWidth = ref(currentComponent.value?.style.borderBottomWidth)
const borderRightWidth = ref(currentComponent.value?.style.borderRightWidth)
const borderLeftWidth = ref(currentComponent.value?.style.borderLeftWidth)

const handlePadingOrMargin = (key:'padding' | 'margin',index:number,value:number) => {
    if(key == 'padding'){
        padding.value![index] = value;
        handleChange(key,padding.value!.map(item => item + 'px').join(' '))
    }else if(key == 'margin'){
        margin.value![index] = value;
        handleChange(key,margin.value!.map(item => item + 'px').join(' '))
    }
}

const handleBorderChange = (direction:'borderTopWidth' | 'borderBottomWidth' | 'borderRightWidth' | 'borderLeftWidth',value:Number) => {
    handleChange(direction,value)
}


const width = ref('25px')
const height = ref('20px')

</script>
    
<style scoped lang="scss">
.margin-box {
    width: calc(10 * v-bind(width));
    height: calc(9 * v-bind(height));
    display: grid;
    grid-template-columns: repeat(10, v-bind(width));
    grid-template-rows: repeat(9, v-bind(height));
    grid-template-areas:
        "a b b b b b b b b c"
        "d h h h h h h h h e"
        "d h h h h h h h h e"
        "d h h h h h h h h e"
        "d h h h h h h h h e"
        "d h h h h h h h h e"
        "d h h h h h h h h e"
        "d h h h h h h h h e"
        "f g g g g g g g g i";
}

.border-box {
    grid-area: h;
    display: grid;
    width: calc(8 * v-bind(width));
    height: calc(7 * v-bind(height));
    grid-template-columns: repeat(8, v-bind(width));
    grid-template-rows: repeat(7, v-bind(height));
    grid-template-areas:
        "a b b b b b b c"
        "d h h h h h h e"
        "d h h h h h h e"
        "d h h h h h h e"
        "d h h h h h h e"
        "d h h h h h h e"
        "f g g g g g g i";
}

.padding-box {
    grid-area: h;
    display: grid;
    width: calc(6 * v-bind(width));
    height: calc(5 * v-bind(height));
    grid-template-columns: repeat(6, v-bind(width));
    grid-template-rows: repeat(5, v-bind(height));
    grid-template-areas:
        "a b b b b c"
        "d h h h h e"
        "d h h h h e"
        "d h h h h e"
        "f g g g g i";
}

.content {
    grid-area: h;
}

.top {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: b;
}

.right {
    grid-area: e;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bottom {
    grid-area: g;
    display: flex;
    justify-content: center;
    align-items: center;
}

.left {
    grid-area: d;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title{
    grid-area: a;
    transform: translateY(-5px);
}
</style>