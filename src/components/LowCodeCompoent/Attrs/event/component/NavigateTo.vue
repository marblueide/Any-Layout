<template>
    <div class="navigate">
        <el-tabs>
            <el-tab-pane label="URL">
                <el-form-item label="请输入URL">
                    <el-input :model-value="url" @input="handleChange('url', $event)"></el-input>
                </el-form-item>
                <el-form-item label="打开目标">
                    <el-select :model-value="target" @change="handleChange('target', $event)">
                        <el-option v-for="item in navigateToSelect" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="页面名称">

            </el-tab-pane>
        </el-tabs>
    </div>
</template>
    
<script setup lang='ts'>
import type {  NavigateToOpenType } from '@/types/LowCode/event';
import { navigateToSelect } from '../event.list';


const props = defineProps<{
    url: string
    target: NavigateToOpenType
}>()

const handleChange = (key: string, value: string) => {
    emit('change', key, value)
}

const emit = defineEmits<{
    (e: 'change', key: string, value: string): void
}>()
</script>
    
<style scoped lang="scss">
.navigate {
    :deep(.el-tabs__nav-scroll) {
        display: flex;
        justify-content: center;
    }

    :deep(.el-form-item) {
        margin-bottom: 10px;

        .el-select {
            width: 100%;
        }
    }
}
</style>