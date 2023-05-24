<template>
  <div class="card-box" ref="libParent">
    <div
      class="card"
      h-115px
      bg-white
      px-5
      py-5
      rounded-2
      ref="libRefs"
      v-for="(it, index) in libraryList"
      :class="{ active: activeComponentLibaray == index }"
      @click="handlerLibraryClick(it, index)"
    >
      <div inline-flex items-center h-16 @click.stop>
        <span
          flex-shrink-0
          mr-6
          w-14
          h-14
          lh-14
          text-3xl
          text-center
          bg-blue-50
          rounded-full
        >
          {{ it.libName.slice(0, 1) }}
        </span>
        <div>
          <span>{{ it.libName }}</span>
          <div text-xs color-bluegray-4 mt-1>
            <div class="ellipsis-2" v-if="it.description">
              {{ it.description }}
            </div>
            <div class="ellipsis-2" v-else>作者好像很懒，什么都没写</div>
          </div>
        </div>
      </div>
      <div class="componentList" ref="componentListRef" @click.stop>
        <div v-if="componentList?.length" flex items-center flex-row gap-2>
          <ComponentItem
            v-for="it in componentList"
            :component="it"
            @click="handlerComponentClick(it)"
          />
          <el-icon
            inline-block
            p-2
            bg-blue-gray-4
            rounded-full
            font-bold
            cursor-pointer
            class="text-25px! add"
            @click="handlerComponentDialogState(true, 'add')"
          >
            <Plus color-white />
          </el-icon>
        </div>
        <el-empty v-else description="空">
          <el-button
            type="primary"
            @click="handlerComponentDialogState(true, 'add')"
            >添加组件</el-button
          >
        </el-empty>
      </div>
      <div mt-8 inline-flex items-center justify-between text-14px self-stretch>
        <div color-gray-5 @click.stop>
          <span>开发者: </span>
          <span>admin</span>
        </div>
        <div color-gray-5 text-12px @click.stop>
          <span>{{ dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </div>
      </div>
      <el-dropdown :teleported="false" class="operation">
        <el-icon><Setting /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div @click="handlerUpdateDialog(it)">
                <el-icon><Edit color-blue-6 /></el-icon>
                <span color-blue-6>修改</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handlerDeleteLibrary(it.id)">
                <el-icon><Delete color-red-5 /></el-icon>
                <span color-red-5>删除</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <div h-115px lh-115px text-center p20px class="add-box">
    <el-icon
      inline-block
      p-5
      bg-red-5
      rounded-full
      font-bold
      cursor-pointer
      class="text-25px! add"
      @click="handlerAddBtnClick"
    >
      <Plus color-white />
    </el-icon>
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogType == 'update' ? '修改' : '新增'"
    width="700px"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="id" v-if="dialogType == 'update'">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.libName"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="form.description"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlerSubmit">
          {{ dialogType == "update" ? "修改" : "新增" }}}
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="componentDialog"
    :title="componentDialogType == 'update' ? '修改' : '新增'"
    width="700px"
  >
    <el-form :model="componentForm" label-width="80px">
      <el-form-item label="id" v-if="componentDialogType == 'update'">
        <el-input v-model="componentForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input
          v-model="componentForm.componentName"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="组件JSON">
        <el-input
          type="textarea"
          :rows="4"
          v-model="componentForm.ComponentData"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="componentDialog = false">取消</el-button>
        <el-button type="primary" @click="handlerComponentSubmit">
          {{ componentDialogType == "update" ? "修改" : "新增" }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  createComponent,
  getComponentById,
  getComponentListByLibId,
  updateComponent,
} from "@/api/component";
import {
  createComponentLibrary,
  deleteComponentLibrary,
  getComponentLibraryById,
  getComponentLibraryList,
  updateComponentLibrary,
} from "@/api/componentLibrary";
import type { Component } from "@/types/model/Component";
import type { ComponentLibrary } from "@/types/model/ComponentLibrary";
import {
  Operation,
  Plus,
  Setting,
  Delete,
  Edit,
} from "@element-plus/icons-vue";
import dayjs from "dayjs";
import { ElMessageBox, ElNotification } from "element-plus";
import { tr } from "element-plus/es/locale";
import { nextTick, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ComponentItem from "./component/ComponentItem.vue";

const libraryList = ref<ComponentLibrary[]>([]);
const router = useRouter();
const activeComponentLibaray = ref(-1);
const libParent = ref<HTMLElement>();
const libRefs = ref<HTMLElement[]>();

const componentListRef = ref<HTMLElement>();
const componentList = ref<Component[]>();

const paginated = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const dialogVisible = ref(false);
const dialogType = ref<"update" | "add">("add");
const form = ref<ComponentLibrary>({
  id: "",
  libName: "",
  description: "",
  components: [],
  createTime: "",
  updateTime: "",
  deleteTime: "",
});

const componentForm = ref<Component>({
  id: "",
  componentName: "",
  ComponentData: "",
  libId: "",
});
const componentDialog = ref(false);
const componentDialogType = ref<"update" | "add">("add");

watch(dialogVisible, (newVal) => {
  if (!newVal)
    form.value = {
      id: "",
      libName: "",
      description: "",
      components: [],
      createTime: "",
      updateTime: "",
      deleteTime: "",
    };
});

watch(componentDialog, (newVal) => {
  if (!newVal)
    componentForm.value = {
      id: "",
      componentName: "",
      ComponentData: "",
      libId: "",
    };
});

async function handlerComponentSubmit() {
  if (componentDialogType.value == "add") {
    await addComponent();
  } else {
    await updateComponentContent();
  }
  const { id } = libraryList.value[activeComponentLibaray.value];
  getComponentList(id);
  componentDialog.value = false;
}

async function addComponent() {
  const { componentName, ComponentData, libId } = componentForm.value;
  const res = await createComponent({
    componentName,
    ComponentData,
    libId,
  });
  ElNotification({
    title: "Success",
    message: "添加成功",
    type: "success",
  });
}

async function updateComponentContent() {
  const { componentName, ComponentData, libId, id } = componentForm.value;
  const res = await updateComponent({
    componentName,
    ComponentData,
    libId,
    id,
  });
  ElNotification({
    title: "Success",
    message: "更新成功",
    type: "success",
  });
}

async function handlerComponentClick(item: Component) {
  const res = await getComponentById(item.id);
  componentForm.value = res.data;
  handlerComponentDialogState(true, "update");
}

function handlerComponentDialogState(isOpen: boolean, type: "update" | "add") {
  componentDialog.value = isOpen;
  componentDialogType.value = type;
}

async function getComponentList(id: string) {
  const res = await getComponentListByLibId(id);
  componentList.value = res.data;
}

function asyncRequestAnimationFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(null);
    });
  });
}

async function backAnmiation(dom: HTMLElement) {
  const son = dom.getElementsByClassName("componentList")[0] as HTMLElement;
  const prevSonHeight = son.offsetHeight;
  const prevHeight = dom.offsetHeight;
  dom.style.height = prevHeight + "px";
  son.style.height = prevSonHeight + "px";

  await asyncRequestAnimationFrame();
  const currentHeight = 115;

  dom.style.height = currentHeight + "px";
  son.style.height = "0px";

  dom.addEventListener("transitionend", () => {
    dom.style.height = "";
    son.style.height = "";
  });
}

/** start ComponentLib相关 */

function handlerLibraryClick(item: ComponentLibrary, i: number) {
  if (!libRefs.value) return;
  backAnmiation(libRefs.value[activeComponentLibaray.value]);
  if (i == activeComponentLibaray.value) {
    activeComponentLibaray.value = -1;
  } else {
    activeComponentLibaray.value = i;
  }
  getComponentList(item.id);
  componentForm.value.libId = item.id;
}

async function getLibrary() {
  const { page, limit } = paginated;
  const res = await getComponentLibraryList(page, limit);
  const list = res.data.list;
  const total = res.data.total;
  libraryList.value = list;
  paginated.total = total;
}
getLibrary();

async function handlerUpdateDialog(library: ComponentLibrary) {
  dialogVisible.value = true;
  dialogType.value = "update";
  const id = library.id;
  const res = await getComponentLibraryById(id);
  form.value = res.data;
}

async function handlerDeleteLibrary(id: string) {
  try {
    await ElMessageBox.confirm("是否要删除该组件库？", "Warning", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    await deleteComponentLibrary(id);
    getLibrary();
    ElNotification({
      title: "Success",
      message: "删除成功",
      type: "success",
    });
  } catch (error) {
    ElNotification({
      title: "Info",
      message: "操作取消",
      type: "info",
    });
  }
}

function handlerAddBtnClick() {
  dialogVisible.value = true;
  dialogType.value = "add";
  form.value = {
    id: "",
    libName: "",
    description: "",
    components: [],
    createTime: "",
    updateTime: "",
    deleteTime: "",
  };
}

async function addComponentLib() {
  const { libName, description } = form.value;
  const res = await createComponentLibrary(libName, description);
  ElNotification({
    title: "Success",
    message: "添加成功",
    type: "success",
  });
}

async function updateComponentLib() {
  const res = await updateComponentLibrary(form.value);
  ElNotification({
    title: "Success",
    message: "更新成功",
    type: "success",
  });
}

async function handlerSubmit() {
  if (dialogType.value == "add") {
    await addComponentLib();
  } else {
    await updateComponentLib();
  }
  getLibrary();
  dialogVisible.value = false;
}
/** end ComponentLib相关 */
</script>

<style scoped lang="scss">
.card-box {
  display: flex;
  // grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 330px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  transition: all 1s;
  overflow: hidden;
  &.active {
    transform: scale(1);
    width: 100%;
    height: auto;
    transition-duration: 1s;
    .componentList {
      flex: 1;
    }
  }
  .operation {
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:not(.active):hover {
    transform: scale(1.05);
    transition-duration: 1s;
    .operation {
      opacity: 1;
    }
  }
  &:hover {
    .operation {
      opacity: 1;
    }
  }
  .componentList {
    height: 0px;
    transition: all 1s;
    overflow: hidden;
  }
}
.add-box {
  .add {
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.32);
    transition: transform 0.3s;
  }
  &:hover {
    .add {
      transform: scale(1.05);
    }
  }
}
</style>
