<template>
    <el-input :type="type == 'inputNumber' ? 'number' : 'text'" :modelValue="modelValue" :placeholder="placeholder"
        @update:modelValue="handlerUpdate" :step="step"></el-input>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        type: "input" | "inputNumber";
        modelValue: any;
        placeholder?: string;
        step?: number
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
    emits("update:modelValue", props.type == "inputNumber" ? Number(value) : value);
}
</script>

<style scoped></style>
