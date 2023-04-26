<template>
    <el-select :model-value="modelValue" :placeholder="placeholder" @change="handlerUpdate">
        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: any;
        placeholder?: string
        selectOptions: {
            value: any,
            label: any
        }[]
    }>(),
    {
        placeholder: "请选择",
    }
);

const emits = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

function handlerUpdate(value: string) {
    emits("update:modelValue", value);
}
</script>

<style scoped></style>
