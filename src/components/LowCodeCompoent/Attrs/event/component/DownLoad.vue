<template>
    <div class="download">
        <el-form-item label="下载地址">
            <el-input :model-value="url" @input="emit('change','url',$event)"></el-input>
        </el-form-item>
        <el-form-item label="文件名">
            <el-input :model-value="name" @input="emit('change','name',$event)"></el-input>
        </el-form-item>
        <el-form-item label="文件类型">
            <el-select :model-value="subType" @change="emit('change','subType',$event)">
                <el-option v-for="item in DownLoadSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
    </div>
</template>

<script  setup lang="ts">
import { DownLoadSelect } from '../event.list';

    const props = defineProps<{
        url:string,
        name:string,
        subType:string
    }>()

    const emit = defineEmits<{
        (e:'change',type:string,value:any):void
    }>()

</script>