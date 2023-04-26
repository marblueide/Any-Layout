<template>
    <div class="wrapper">
        <el-input type=" text" :modelValue="value" :placeholder="placeholder" @update:modelValue="handlerUpdate"></el-input>
        <el-select v-model="postfix" @change="handlerUpdate">
            <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </div>
</template>

<script setup lang="ts">
import { AttrEnum } from '@/types';
import { computed, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        type?: AttrEnum.INPUTTYPE;
        modelValue: any;
        placeholder?: string;
        selectOptions: {
            value: any,
            label: string
        }[],
        defaultOption: any
    }>(),
    {
        placeholder: "请输入内容",
        type: AttrEnum.INPUTTYPE
    }
);

const postfix = ref(props.defaultOption);
const value = computed(() => {
    const regExp = new RegExp(postfix.value, 'g')
    return props.modelValue.replace(regExp, '')
})

const emits = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

function handlerUpdate(value: string) {
    emits("update:modelValue", value + postfix.value);
}
</script>

<style scoped lang="scss">
.wrapper {
    display: grid;
    grid-template-columns: 1fr 30%;
    gap: 0 4px;
}
</style>
