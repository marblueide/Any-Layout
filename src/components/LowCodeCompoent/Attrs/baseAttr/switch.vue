<template>
    <el-switch :model-value="modelValue" @change="handlerUpdate"></el-switch>
</template>

<script setup lang="ts">
import { AttrEnum } from '@/types';

const props = withDefaults(
    defineProps<{
        modelValue: any;
    }>(),
    {}
);

const emits = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

function handlerUpdate(value: string) {
    emits("update:modelValue", value);
}
</script>

<style scoped></style>
