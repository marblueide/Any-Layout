<template>
  <div
    class="editor-header"
    box-border
    h-20
    border="b-1 gray-2"
    items-center
    p-4
    flex
    justify-between
    @click="handleHeadDown"
  >
    <div>
      <el-button m-x-1 type="primary" plain @click="back"
        ><el-icon><ArrowLeftBold /></el-icon
      ></el-button>
      <el-button m-x-1 @click.stop="triggerAce">JSON</el-button>
      <el-button m-x-1 @click="handleBack" :disabled="stackIndex == -1"
        >撤销</el-button
      >
      <el-button
        m-x-1
        @click="handleForward"
        :disabled="stackIndex == stack.length - 1"
        >回退</el-button
      >
      <el-button m-x-1>预览</el-button>
      <el-button m-x-1 @click="clearCanvas">清空画布</el-button>
      <el-button m-x-1 @click="init">初始化</el-button>
      <el-button
        m-x-1
        @click="compose"
        :disabled="areaData.components.length == 0"
        >组合</el-button
      >
      <el-button
        m-x-1
        @click="splite"
        :disabled="!Array.isArray(currentComponent?.propValue)"
        >拆分</el-button
      >
    </div>
    <div>
      <el-button m-x-1>.vue生成</el-button>
      <el-button m-x-1 @click="triggerPreView">预览</el-button>
      <el-button m-x-1 type="primary" plain @click="save">保存</el-button>
    </div>

    <!-- <div class="canvas-size" grid h-10 w-80 items-center mx-2>
      <span color-gray-7>画布大小</span>
      <el-input :model-value="lowCanvasState.width" type="number" @input="handleInput('width', +$event)">
      </el-input>
      <el-input :model-value="lowCanvasState.height" type="number" @input="handleInput('height', +$event)">
      </el-input>
    </div> -->
    <AceEditor />
  </div>
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import { storeToRefs } from "pinia";
import AceEditor from "./AceEditor.vue";
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { updatePage } from "@/api";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { ref, unref } from "vue";

const { currentComponent } = storeToRefs(appStore.state);
const { stackIndex, stack } = storeToRefs(appStore.stack);
const { areaData } = storeToRefs(appStore.area);
const { clearCanvas, splite, init } = appStore.lowStore;
const { setLowCanvasState, triggerPreView } = appStore.state;
const { compose, hideArea } = appStore.area;
const { triggerAce, hideAce } = appStore.ace;

const { backSnapshot, forwardSnapshot } = appStore.stack;
const { lowCanvasData, lowCanvasState } = storeToRefs(appStore.state);

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id as string);

const handleBack = () => {
  backSnapshot();
};

const handleForward = () => {
  forwardSnapshot();
};

const handleInput = (key: string, val: number) => {
  setLowCanvasState({
    [key]: val,
  });
};

const handleHeadDown = () => {
  hideAce();
  hideArea();
};

const save = async () => {
  try {
    const pageData = JSON.stringify({
      lowCanvasState:unref(lowCanvasState),
      lowCanvasData:unref(lowCanvasData),
    });
    const res = await updatePage({
      id: id.value,
      pageData,
    });
    ElMessage({
      type: "success",
      message: res.message,
    });
    router.push("/")
  } catch (error) {
    ElMessage({
      type: "error",
      message: error as string,
    });
  }
};

const back = async () => {
  router.push("/")
}
</script>

<style lang="scss" scoped>
.editor-header {
  position: relative;

  .canvas-size {
    grid-template-columns: auto 1fr 1fr;
    grid-column-gap: 0.5rem;

    span {
      font-size: 0.8rem;
    }
  }
}
</style>
