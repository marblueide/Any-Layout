<template>
  <div class="textAlign">
    <el-form-item label="水平方向">
      <div class="hz" grid>
        <div v-for="item in defaultTextHorizontalAlign" :class="
  item.value == currentComponent?.style?.justifyContent
    ? 'border-black'
    : 'border-gray-3'
" p-1 border="1 solid" cursor-pointer hover=" bg-gray-3 " transition
          @click="handleChange('justifyContent', item.value)">
          {{ item.title }}
        </div>
      </div>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { onActivated, ref, toRefs } from "vue";
import { defaultTextHorizontalAlign } from "./attr.type";
import { useAttr } from "./useAttr";

const { currentComponent, handleChange } = useAttr();
</script>

<style scoped lang="scss">
.textAlign {
  font-size: 0.8rem;

  .hz,
  .vz {
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 0.5rem;
    justify-content: space-around;
    text-align: center;
  }
}
</style>
