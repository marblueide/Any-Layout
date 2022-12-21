<template>
  <div class="textAlign">
    <el-form label-position="top">
      <el-form-item label="水平方向">
        <div class="hz" grid>
          <div
            v-for="item in defaultTextHorizontalAlign"
            :class="
              item.value == justifyContent ? 'border-black' : 'border-gray-3'
            "
            p-1
            border="1 solid"
            cursor-pointer
            hover=" bg-gray-3 "
            transition
            @click="handleChange('justifyContent', item.value)"
          >
            {{ item.title }}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="垂直方向方向">
        <div class="vz" grid>
          <div
            v-for="item in defaultTextverticalAlign"
            :class="item.value == alignItems ? 'border-black' : 'border-gray-3'"
            p-1
            border="1 solid"
            cursor-pointer
            hover=" bg-gray-3 "
            transition
            @click="handleChange('alignItems', item.value)"
          >
            {{ item.title }}
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {
  defaultTextHorizontalAlign,
  defaultTextverticalAlign,
} from "./attr.type";
import { useLowStore } from "../../../stores/useLowStore";
import { storeToRefs } from "pinia";
import { toRefs } from "vue";

const store = useLowStore();
const { currentComponent } = storeToRefs(store);

//@ts-ignore
const { justifyContent, alignItems } = toRefs(currentComponent.value?.style);

const handleChange = (key: string, value: any) => {
  store.setCurrentComponentStyle({
    [key]: value,
  });
};
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
