<template>
    <div class="color-pick" grid>
        <el-color-picker :predefine="predefineColors" :modelValue="modelValue" @update:modelValue="handlerUpdate"
            show-alpha />
        <el-input type="text" :modelValue="modelValue" @update:modelValue="handlerUpdate"></el-input>
    </div>
</template>

<script setup lang="ts">
import type { AttrEnum } from '@/types';

const props = withDefaults(
    defineProps<{
        type: AttrEnum.COLORPick;
        modelValue: any;
        predefineColors?: string[]
    }>(),
    {
        predefineColors: () => []
    }
);

const emits = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

function handlerUpdate(value: string) {
    emits("update:modelValue", value);
}
</script>

<style scoped lang="scss">
:deep(.el-form-item__content) {
    flex-wrap: nowrap;

    .el-input {
        margin-left: 5px
    }
}

.color-pick{
    grid-template-columns: auto 1fr;
    gap: 0 10px;
}
</style>
