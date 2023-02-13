<template>
    <div class="navigate">
        <el-form-item label="提示消息">
            <el-input :model-value="message" @input="emit('change','message', $event)"></el-input>
        </el-form-item>
        <el-form-item label="提示类型">
            <el-select :model-value="subType" @change="emit('change','subType',$event)">
                <el-option v-for="item in ShowAlertSelect" 
                :key="item.value" :label="item.label" :value="item.value" 
                >
                </el-option>
            </el-select>
        </el-form-item>
    </div>
</template>
    
<script setup lang='ts'>
import type { ShowAlertType } from '@/types/LowCode/event';
import { ShowAlertSelect } from '../event.list';


const props = defineProps<{
    message: string,
    subType: ShowAlertType
}>()

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