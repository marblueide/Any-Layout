<template>
  <div class="shadows">
    <el-form-item label="应用阴影">
      <div class="wrapper" grid>
        <el-tooltip placement="top" :content="item.title" v-for="item in defaultShadow">
          <div border="1 solid" w-8 h-8 flex justify-center items-center cursor-pointer :class="
  currentComponent?.style?.boxShadow == item.value
    ? 'border-black'
    : 'border-gray'
" @click="handleChange('boxShadow', item.value)">
            <div border-gray-7 w-4 h-4 :style="{ boxShadow: item.value }"></div>
          </div>
        </el-tooltip>
      </div>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { defaultShadow } from "./attr.type";
import { useAttr } from "./useAttr";

const { currentComponent, handleChange } = useAttr();
</script>

<style scoped lang="scss">
.wrapper {
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.5rem;
}
</style>
