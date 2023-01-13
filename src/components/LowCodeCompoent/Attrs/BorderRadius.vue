<template>
  <el-form-item label="边框圆角">
    <div class="wrapper" grid>
      <el-tooltip placement="top" :content="item.title" v-for="item in defaultRadius">
        <div border="1 solid" w-8 h-8 flex justify-center items-center cursor-pointer :class="
      currentComponent?.style.borderRadius == item.value
        ? 'border-black'
        : 'border-gray'" @click="handleChange('borderRadius', item.value)">
          <div border-gray-7 b-l-2 b-t-2 w-4 h-4 :style="{ borderTopLeftRadius: item.value + 'px' }"></div>
        </div>
      </el-tooltip>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { defaultRadius } from "./attr.type";
import { useAttr } from "./useAttr";

const { currentComponent, handleChange } = useAttr();
</script>

<style scoped lang="scss">
.wrapper {
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.5rem;
}
</style>
