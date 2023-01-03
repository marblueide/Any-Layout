<template>
  <el-form-item label="边框大小">
    <el-input
      type="number"
<<<<<<< HEAD
      :model-value="currentComponent?.style.borderWidth"
=======
      :model-value="borderWidth"
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
      @update:modelValue="handleChange('borderWidth', +$event)"
    ></el-input>
  </el-form-item>
  <el-form-item label="边框圆角">
    <div class="wrapper" grid>
      <el-tooltip
        placement="top"
        :content="item.title"
        v-for="item in defaultRadius"
      >
        <div
          border="1 solid"
          w-8
          h-8
          flex
          justify-center
          items-center
          cursor-pointer
<<<<<<< HEAD
          :class="
            currentComponent?.style.borderRadius == item.value
              ? 'border-black'
              : 'border-gray'
          "
=======
          :class="borderRadius == item.value ? 'border-black' : 'border-gray'"
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
          @click="handleChange('borderRadius', item.value)"
        >
          <div
            border-gray-7
            b-l-2
            b-t-2
            w-4
            h-4
            :style="{ borderTopLeftRadius: item.value + 'px' }"
          ></div>
        </div>
      </el-tooltip>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
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
