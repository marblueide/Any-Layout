<template>
    <div class="copy">
        <el-form-item label="需要复制的内容">
            <el-input :model-value="value" @input="emit('change','value',$event)" ></el-input>
        </el-form-item>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        value:string
    }>()

    const emit = defineEmits<{
        (e:'change',type:string,value:any):void
    }>()
</script>