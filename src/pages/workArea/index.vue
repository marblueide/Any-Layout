<template>
  <div class="editor" flex flex-col>
    <Header></Header>
    <div class="main" flex flex-1 overflow="hidden">
      <div class="left" w-65 bg-white border-r-1 border-gray-2>
        <el-tabs type="border-card" class="el-tabs" v-model="activeName">
          <el-tab-pane label="资源管理" name="Administration">
            <componentLayer></componentLayer>
          </el-tab-pane>
          <el-tab-pane label="添加组件" name="add">
            <componentListVue />
          </el-tab-pane>
        </el-tabs>
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
import { ref } from "vue";

const store = useLowStore();
const { currentComponent } = storeToRefs(store);

const activeName = ref("Administration");


</script>

<style scoped lang="scss">
.editor {
  height: 100%;

  .main {
    width: 100%;

    .center {
      background: #fff;

      .edit-container {
        width: 100%;
        height: 100%;
      }
    }

    .left {
      :deep(.el-tabs) {
        height: 100%;

        .el-tabs__header {
          width: 100%;
          display: flex;
          justify-content: center;
          border-bottom: none;
        }

        .el-tabs__content {
          padding: 0;
        }
      }
    }
  }
}
</style>
