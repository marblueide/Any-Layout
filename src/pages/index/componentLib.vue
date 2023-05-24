<template>
  <div class="card-box" ref="libParent">
    <div
      class="card"
      h-115px
      bg-white
      cursor-pointer
      px-5
      py-5
      rounded-2
      ref="libRefs"
      v-for="(it, index) in libraryList"
      :class="{ active: activeComponentLibaray == index }"
      @click="handlerLibraryClick(it, index)"
    >
      <div flex items-center h-16>
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
      <div class="componentList" ref="componentListRef"></div>
      <div mt-8 flex justify-between text-14px>
        <div color-gray-5>
          <span>开发者: </span>
          <span>admin</span>
        </div>
        <div color-gray-5 text-12px>
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
        <el-button type="primary" @click="handlerSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getComponentList, getComponentListByLibId } from "@/api/component";
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
import { nextTick, reactive, ref } from "vue";
import { useRouter } from "vue-router";

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

function handlerLibraryClick(item: ComponentLibrary, i: number) {
  if (!libRefs.value) return;
  activeComponentLibaray.value = i;
  const dom = libRefs.value[i];
  startLibraryAnimation(dom);
  setTimeout(() => {
    recoverLibraryAnmiation(dom)
  }, 3000);
  // getComponentList(item.id);
}

async function startLibraryAnimation(dom: HTMLElement) {
  const parentWidth = libParent.value!.offsetWidth;
  const prevWidth = dom.offsetWidth;
  const prevHeight = dom.offsetHeight;
  const span = Math.floor(parentWidth / 330) + 1;
  dom.style.gridColumn = `1 / ${span}`;
  dom.style.transitionDuration = "1s";
  dom.style.height = "auto";
  await asyncRequestAnimationFrame();

  const currentWidth = dom.offsetWidth;
  const currentHeight = dom.offsetHeight;
  dom.style.width = prevWidth + "px";
  dom.style.height = prevHeight + "px";

  await asyncRequestAnimationFrame();
  dom.style.width = currentWidth - 40 + "px";
  dom.style.height = currentHeight + "px";

  dom.addEventListener("transitionend", () => {
    dom.style.transitionDuration = "0.3s";
    dom.style.width = "auto";
    dom.style.height = "auto";
  });
}

async function recoverLibraryAnmiation(dom: HTMLElement) {
  const prevWidth = dom.offsetWidth;
  dom.style.gridColumn = "auto";
  dom.style.transitionDuration = "1s";
  dom.style.height = 115 + 'px'

  await asyncRequestAnimationFrame();
  const currentWidth = dom.offsetWidth;
  dom.style.width = prevWidth + "px";

  await asyncRequestAnimationFrame();
  dom.style.width = currentWidth + "px";

  dom.addEventListener("transitionend", () => {
    dom.style.transitionDuration = "0.3s";
    dom.style.width = "auto";
  });
}

function asyncRequestAnimationFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(null);
    });
  });
}

async function getComponentList(id: string) {
  const res = await getComponentListByLibId(id);
  componentList.value = res.data;
}

/** start ComponentLib接口请求 */

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
/** end ComponentLib接口请求 */
</script>

<style scoped lang="scss">
.card-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 20px;
}
.card {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
  &.active {
    transform: scale(1);
    .componentList {
      height: 200px;
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
    .operation {
      opacity: 1;
    }
  }
  .componentList {
    height: 0;
    transition: all 1s;
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
