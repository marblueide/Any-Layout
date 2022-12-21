<template>
  <el-form label-position="top">
    <el-form-item label="排列方式">
      <div class="wrapper" grid>
        <div v-for="item in defaultArrangement">{{ item.title }}}</div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { useLowStore } from "../../../stores/useLowStore";
import { SIZE, defaultArrangement } from "./attr.type";
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
