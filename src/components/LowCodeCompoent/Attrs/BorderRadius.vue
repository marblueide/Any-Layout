<template>
  <div v-if="currentComponent">
    <div class="wrapper" grid mb-3>
      <el-tooltip placement="top" :content="item.title" v-for="item in defaultRadius">
        <div border="1 solid" w-8 h-8 flex justify-center items-center cursor-pointer :class="currentComponent?.style.borderRadius == item.value
            ? 'border-black'
            : 'border-gray'" @click="handleChange('borderRadius', item.value)">
          <div border-gray-7 b-l-2 b-t-2 w-4 h-4 :style="{ borderTopLeftRadius: item.value + 'px' }"></div>
        </div>
      </el-tooltip>
    </div>
    <inputVue :modelValue="currentComponent.style.borderRadius" :type="AttrEnum.INPUTNUMBER"
      @update:modelValue="handleChange('borderRadius', $event)" postfix='px' />
  </div>
</template>

<script setup lang="ts">
import { defaultRadius } from "./attr.type";
import { useAttr } from "./useAttr";
import inputVue from "./baseAttr/input.vue";
import { AttrEnum } from "@/types";

const { currentComponent, handleChange } = useAttr();
</script>

<style scoped lang="scss">
.wrapper {
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.5rem;
}
</style>
