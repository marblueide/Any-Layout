<template>
  <div class="preview" h="100%" relative>
    <Shape
      v-for="item in lowCanvasData"
      :id="item.id!"
      :key="item.id!"
      :style="getShapeStyle(item.style)"
    >
      <component
        :is="labelEnumMapComponent[item.type]"
        :propValue="item.propValue"
        :style="getOriginStyle(item.style)"
        :events="item.events"
      >
      </component>
    </Shape>
  </div>
</template>

<script setup lang="ts">
import { appStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { componentList, labelEnumMapComponent } from "@/components/LowCodeCompoent/component-list";
import { getShapeStyle, getOriginStyle } from '@/utils';
import { getPageById } from '@/api';
import { onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const { lowCanvasState, lowCanvasData } = storeToRefs(appStore.state);
const { setLowCanvasData,setLowCanvasState,initLowCanvasState,triggerPreView } = appStore.state;

const route = useRoute();
const router = useRouter();
const id = ref<string>(route.params.id as string);

const init = async () => {
  //初始化
  if (!id.value) {
    return router.push("/");
  }
  const res = await getPageById(id.value as string);
  const pageData = JSON.parse(res.data.pageData ?? "{}");
  setLowCanvasData(pageData.lowCanvasData ?? []);
  if (pageData.lowCanvasState) {
    setLowCanvasState(pageData.lowCanvasState)
  } else {
    initLowCanvasState()
  }
  triggerPreView()
};

init();

onUnmounted(() => {
  triggerPreView()
})

</script>

<style></style>
