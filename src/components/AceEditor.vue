<template>
  <div
    class="ace-editor"
    v-show="aceState"
    text-right
    bg-white
    b="1 gray-3"
    m-1
    @click.stop
  >
    <div id="ace-content" ref="aceContent"></div>
    <el-button class="reset" @click="handleReSet" m-1>重置</el-button>
    <el-button class="reset" @click="handleSave" m-1>保存</el-button>
  </div>
</template>

<script setup lang="ts">
import ace from "ace-builds";
import "ace-builds/src-min-noconflict/theme-one_dark";
import "ace-builds/src-min-noconflict/mode-json5";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { onMounted, ref, watchEffect, watch } from "vue";
import { storeToRefs } from "pinia";
import { appStore } from "@/stores";
import type { LowCanvasData, LowCanvasType } from "@/types";
import { cloneDeep } from "lodash";

const { lowCanvasState, currentComponent } = storeToRefs(appStore.state);
const { aceState } = storeToRefs(appStore.ace);
const { setComponent, setCanvasState } = appStore.state;
const aceContent = ref<Element>();
let editor: ace.Ace.Editor;
let lastData: string;
let isUpdate = false;
let isState = true;

window.addEventListener("resize", () => {
  editor && editor.resize();
});

watch(currentComponent, () => {
  let data;
  if (currentComponent.value != undefined) {
    data = JSON.stringify(currentComponent.value, null, 4);
    isState = false;
  } else {
    data = JSON.stringify(lowCanvasState.value, null, 4);
    isState = true;
  }
  isUpdate = false;
  lastData = data;
  editor.setValue(data);
});

const handleReSet = () => {
  if (isUpdate) {
    editor && editor.setValue(lastData);
    handleSave();
  }
};

const handleSave = () => {
  if (isUpdate) {
    let str = JSON.parse(editor.getValue());
    if (isState) {
      setCanvasState(str as unknown as LowCanvasType);
    } else {
      setComponent(currentComponent.value?.id!, str);
    }
  }
};

onMounted(() => {
  editor = ace.edit(aceContent.value!, {});
  editor.setOptions({
    // 启用滚动
    //     autoScrollEditorIntoView: true,
    // 启用换行
    wrap: true,
    fontSize: "15px",
    theme: "ace/theme/one_dark",
    mode: "ace/mode/json5",
    enableSnippets: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    tabSize: 4,
  });
  editor.addEventListener("input", () => {
    isUpdate = true;
  });
  lastData = JSON.stringify(lowCanvasState.value, null, 4);
  editor.setValue(lastData);
});
</script>

<style scoped lang="scss">
.ace-editor {
  position: absolute;
  left: 0;
  top: 5.2rem;
  z-index: 3;
  #ace-content {
    width: 25vw;
    height: 40vh;
  }
}
</style>
