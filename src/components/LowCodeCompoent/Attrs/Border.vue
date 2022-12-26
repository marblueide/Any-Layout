<template>
  <el-form-item label="边框大小">
    <el-input
      type="number"
      :model-value="borderWidth"
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
          :class="borderRadius == item.value ? 'border-black' : 'border-gray'"
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
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { useLowStore } from "../../../stores/useLowStore";
import { SIZE, defaultRadius } from "./attr.type";
const store = useLowStore();
const { currentComponent } = storeToRefs(store);
//@ts-ignore
const { borderRadius, borderWidth } = toRefs(currentComponent.value?.style);
const handleChange = (key: string, value: any) => {
  store.setCurrentComponentStyle({
    [key]: value,
  });
};
</script>

<style scoped lang="scss">
.wrapper {
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.5rem;
}
</style>
