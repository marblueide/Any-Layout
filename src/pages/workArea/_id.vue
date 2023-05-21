<template>
  <div class="editor" flex flex-col>
    <Header></Header>
    <Main />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header.vue";
import Main from "@/components/main.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { downKeys, keysMapFn, singleKey } from "@/components/editor/event";
import { useRoute, useRouter } from "vue-router";
import { getPageById } from "@/api";
import { appStore } from "@/stores";

const { setLowCanvasData,setLowCanvasState,initLowCanvasState } = appStore.state;

const route = useRoute();
const router = useRouter();
const id = ref<string>(route.params.id as string);

const handleKeyDown = (e: KeyboardEvent) => {
  // e.preventDefault()
  if (e.ctrlKey && typeof keysMapFn[e.keyCode] == "function") {
    keysMapFn[e.keyCode]();
    return false;
  }
};

const init = async () => {
  //初始化
  if (!id.value) {
    return router.push("/");
  }
  const res = await getPageById(id.value as string);
  const pageData = JSON.parse(res.data.pageData ?? "{}");
  console.log(pageData)
  setLowCanvasData(pageData.lowCanvasData ?? []);
  if (pageData.lowCanvasState) {
    setLowCanvasState(pageData.lowCanvasState)
  } else {
    initLowCanvasState()
  }
};

init();

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped lang="scss">
.editor {
  height: 100%;
}
</style>
