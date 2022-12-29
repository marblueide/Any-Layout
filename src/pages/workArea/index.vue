<template>
  <div class="editor" flex flex-col>
    <Header></Header>
    <div class="main" flex flex-1 overflow="hidden">
      <div class="left" w-65 bg-white border-r-1 border-gray-2>
        <componentListVue />
        <componentLayer></componentLayer>
      </div>
      <div class="center" flex-1 p-5 overflow="hidden">
        <el-scrollbar>
          <div class="edit-container">
            <Editor />
          </div>
        </el-scrollbar>
      </div>
      <div class="right" w-75 bg-white border-l-1 border-gray-2>
        <Attr v-show="currentComponent" />
        <default-attr v-show="!currentComponent"></default-attr>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header.vue";
import componentListVue from "@/components/componentList.vue";
import componentLayer from "@/components/componentLayer.vue";
import Editor from "@/components/editor/index.vue";
import Attr from "@/components/editor/Attr.vue";
import { useLowStore } from "../../stores/useLowStore";
import { storeToRefs } from "pinia";

const store = useLowStore();
const { currentComponent } = storeToRefs(store);
</script>

<style scoped lang="scss">
.editor {
  height: 100%;

  .main {
    width: 100%;

    .center {
      background: #f5f5f5;

      .edit-container {
        width: 100%;
        height: 100%;
      }
    }

    .right {
    }
  }
}
</style>
