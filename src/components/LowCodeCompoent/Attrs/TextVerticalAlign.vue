<template>
  <div class="textAlign">
    <el-form-item label="垂直方向方向">
      <div class="vz" grid>
        <div
          v-for="item in defaultTextverticalAlign"
<<<<<<< HEAD
          :class="
            item.value == currentComponent?.style?.alignItems
              ? 'border-black'
              : 'border-gray-3'
          "
=======
          :class="item.value == alignItems ? 'border-black' : 'border-gray-3'"
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
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
  </div>
</template>

<script setup lang="ts">
import { defaultTextverticalAlign } from "./attr.type";
<<<<<<< HEAD
import { useAttr } from "./useAttr";

const { currentComponent, handleChange } = useAttr();
=======
import { useLowStore } from "../../../stores/useLowStore";
import { storeToRefs } from "pinia";
import { toRefs } from "vue";

const store = useLowStore();
const { currentComponent } = storeToRefs(store);

//@ts-ignore
const { alignItems } = toRefs(currentComponent.value?.style);
const handleChange = (key: string, value: any) => {
  store.setCurrentComponentStyle({
    [key]: value,
  });
};
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
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
