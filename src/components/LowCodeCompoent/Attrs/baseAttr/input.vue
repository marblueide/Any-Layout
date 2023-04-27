<template>
    <el-input :type="type == 'inputNumber' ? 'number' : 'text'" :modelValue="modelValue" :placeholder="placeholder"
        @update:modelValue="handlerUpdate" :step="step">
        <template #append v-if="postfix">{{postfix}}</template>
    </el-input>
</template>

<script setup lang="ts">
import { AttrEnum } from '@/types';

const props = withDefaults(
    defineProps<{
        type: AttrEnum.INPUT | AttrEnum.INPUTNUMBER;
        modelValue: any;
        placeholder?: string;
        step?: number,
        postfix?:string
    }>(),
    {
        placeholder: "请输入内容",
        step: 1
    }
);

const emits = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

function handlerUpdate(value: string) {
    emits("update:modelValue", props.type == AttrEnum.INPUTNUMBER ? Number(value) : value);
}
</script>

<style scoped></style>
