<template>
  <div class="combine" :style="style" v-if="isShow">
    <Shape
      :id="item.id!"
      :key="item.id!"
      :style="getShapeStyle(item.style)"
      v-for="item in propValue"
    >
      <component
        :is="labelEnumMapComponent[item.type]"
        :style="getOriginStyle(item.style)"
        :propValue="item.propValue"
      >
      </component>
    </Shape>
  </div>
</template>

<script setup lang="ts">
import type { LowCanvasData } from "@/types/LowCode";
import { onMounted, ref, type StyleValue } from "vue";
import Shape from "@/components/editor/Shape.vue";
import { getShapeStyle, getOriginStyle } from "../../../utils/style";
const isShow = ref(false)
let labelEnumMapComponent:any;
import(new URL('@/components/LowCodeCompoent/component-list',import.meta.url).href).then(res => {
    labelEnumMapComponent = res.labelEnumMapComponent
    isShow.value = true
})

const props = defineProps<{
  propValue: LowCanvasData[];
  style: StyleValue;
}>();
</script>

<script lang="ts">
    export default {
        name:"Group"
    }
</script>

<style></style>
