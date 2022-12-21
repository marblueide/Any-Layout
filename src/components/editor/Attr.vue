<template>
  <div class="attr">
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane
        :label="tabItem.name"
        :name="index"
        :key="index"
        v-for="(tabItem, index) in currentComponent?.attr"
      >
        <el-collapse v-model="tabItem.active">
          <el-collapse-item
            :name="item.name"
            :title="item.title"
            v-for="item in getComponents(index)"
          >
            <component :is="item.component()"></component>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useLowStore } from "../../stores/useLowStore";
import { baseAttr } from "../LowCodeCompoent/component-list";

const store = useLowStore();
const { currentComponent } = storeToRefs(store);

const activeTab = ref(0);

const getComponents = (i: number) => {
  return currentComponent.value?.attr[i].data.map((k) => baseAttr[k]);
};
</script>

<style scoped lang="scss">
.attr {
  :deep(.el-tabs--border-card) {
    border: none;

    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
}
</style>
