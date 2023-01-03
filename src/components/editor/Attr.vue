<template>
  <div class="attr">
    <el-tabs class="el-tabs" type="border-card" v-model="activeTab">
      <el-tab-pane
        v-for="(tabItem, index) in attrList"
        :label="tabItem.name"
        :name="index"
        :key="index"
      >
<<<<<<< HEAD
        <KeepAlive>
          <el-collapse :model-value="tabItem.all()">
            <el-collapse-item
              v-for="item in tabItem.data"
              :name="item.name"
              :title="item.title"
              v-show="currentComponent?.attr[index].includes(item.name)"
            >
              <el-form label-position="top">
                <component v-for="c in item.components" :is="c"></component>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </KeepAlive>
=======
        <el-collapse v-model="tabItem.active">
          <el-collapse-item
            v-for="item in tabItem.data"
            :name="item.name"
            :title="item.title"
          >
            <el-form label-position="top">
              <component :is="c()" v-for="c in item.components"></component>
            </el-form>
          </el-collapse-item>
        </el-collapse>
>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useLowStore } from "../../stores/useLowStore";
<<<<<<< HEAD
import { attrList } from "../LowCodeCompoent/attr-list";
=======

>>>>>>> fe206e7d4967b068316ee9a340e0b56a3c2e4c91
const store = useLowStore();
const { currentComponent } = storeToRefs(store);

const activeTab = ref(0);
</script>

<style scoped lang="scss">
.attr {
  height: 100%;

  .el-tabs {
    height: 100%;

    :deep(.el-tabs__content) {
      height: 100%;
      overflow: auto;

      .el-collapse {
        padding-bottom: 70px;
      }

      /*里面的代码可以根据自己需求去进行更改*/
      /* 设置滚动条的样式 */
      &::-webkit-scrollbar {
        width: 12px;
      }

      /* 滚动槽 */
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
        border-radius: 10px;
      }

      /* 滚动条滑块 */
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
      }
    }
  }

  :deep(.el-tabs--border-card) {
    border: none;

    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
}
</style>
