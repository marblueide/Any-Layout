<template>
  <div class="attr">
    <el-tabs class="el-tabs" type="border-card" v-model="activeTab">
      <el-form label-position="top">
        <el-tab-pane v-for="(tabItem, index) in attrList" :label="tabItem.name" :name="index" :key="index">
          <el-collapse :model-value="currentComponent?.collapse || allCollapse" @change="handleCollapseChange">
            <el-collapse-item v-for="item in tabItem.data"
              v-show="getComponents(item.components, getProp(tabItem, item)).length != 0" :name="item.title"
              :title="item.title">
              <template v-for="data in getComponents(item.components, getProp(tabItem, item))" :key="data.name">
                <component v-if="data.type != AttrEnum.OTHER" :is="data.component" :type="data.type"
                  :label="(data as AttrEnumType<AttrEnum.ALL>)?.label"
                  :step="(data as AttrEnumType<AttrEnum.ALL>)?.step"
                  :modelValue="currentComponent?.[getProp(tabItem, item)][data.name]"
                  @update:modelValue="handleModelValue(getProp(tabItem, item), data.name, $event)"></component>
                <component v-else :is="data.component" :label="data.label"></component>
              </template>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-form>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useLowStore } from "../../stores/useLowStore";
import { attrList, getAllCollapse } from '../LowCodeCompoent/attr-list';
import { AttrEnum, type AttrEnumType, type AttrData, type Attr } from '../../types/LowCode/attr';
import type { LowCanvasData } from '../../types/LowCode/base';
const store = useLowStore();
const { currentComponent } = storeToRefs(store);

const allCollapse = getAllCollapse()

const getComponents = (data: AttrEnumType<AttrEnum>[], prop: keyof LowCanvasData): AttrEnumType<AttrEnum>[] => {
  return data.filter(item => currentComponent.value && currentComponent.value[prop]!.hasOwnProperty(item.name))
}

const getProp = (tabItem: Attr, item: AttrData) => {
  return 'prop' in tabItem ? tabItem.prop : item.prop!
}

const handleModelValue = (prop: keyof LowCanvasData, key: string, value: string) => {
  console.log(prop, key, value)
  if (prop == "style") {
    store.setCurrentComponentStyle({
      [key]: value
    })
  } else if (prop == "propValue") {
    store.setCurrentProps({
      [key]: value
    })
  }
}

const handleCollapseChange = (data: string[]) => {
  store.setCurrentState("collapse", data)
}

const activeTab = ref(0);
</script>

<style scoped lang="scss">
.attr {
  height: 100%;

  .el-tabs {
    height: 100%;

    :deep(.el-tabs__content) {
      height: 90%;
      overflow: auto;

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

  :deep(.el-collapse) {
    padding-bottom: 0 !important;
  }

  :deep(.el-tabs--border-card) {
    border: none;

    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }


}
</style>
