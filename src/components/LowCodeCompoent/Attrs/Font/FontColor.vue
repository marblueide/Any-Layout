<template>
  <div class="font-size">
    <el-form-item label="文字颜色">
      <div class="inner" grid>
        <el-color-picker
          :model-value="currentComponent?.style.color"
          @change="handleChange('color', $event)"
        />
        <el-input
          :model-value="currentComponent?.style.color"
          @input="handleChange('color', $event)"
        ></el-input>
      </div>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { useAttr } from "../useAttr";

const { currentComponent, handleChange } = useAttr();
</script>

<style scoped lang="scss">
.font-size {
  .inner {
    grid-template-columns: auto 1fr;
    grid-column-gap: 0.3rem;
  }
}
</style>
