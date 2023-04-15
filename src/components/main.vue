<template>
  <div class="main" flex flex-1 overflow="hidden" @mousedown="handleMainDown">
    <div class="left" bg-white border-r-1 border-gray-2 transition-all-500 overflow-hidden :class="{'w-65':!isPreView,'w-0':isPreView}">
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
    <div class="right"  bg-white border-l-1 border-gray-2 transition-all-500 overflow-hidden  :class="{'w-75':!isPreView,'w-0':isPreView}">
      <Attr v-show="currentComponent" />
      <default-attr v-show="!currentComponent"></default-attr>
    </div>
  </div>
</template>

<script setup lang="ts">
import componentListVue from "@/components/componentList.vue";
import componentLayer from "@/components/componentLayer.vue";
import Editor from "@/components/editor/index.vue";
import Attr from "@/components/editor/Attr.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { appStore } from "@/stores";

const { currentComponent,isPreView } = storeToRefs(appStore.state);
const { hideAce } = appStore.ace;
const { hideArea } = appStore.area;

const activeName = ref("Administration");

const handleMainDown = () => {
  hideAce();
  hideArea();
};
</script>

<style scoped lang="scss">
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
</style>
