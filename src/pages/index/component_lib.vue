<template>
  <div class="card-box">
    <div
      class="card"
      h-115px
      bg-white
      cursor-pointer
      px-5
      py-5
      rounded-2
      v-for="it in libraryList"
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
      <div mt-8 flex justify-between text-14px>
        <div color-gray-5>
          <span>开发者: </span>
          <span>admin</span>
        </div>
        <div color-gray-5 text-12px>
          <!-- <span>最新: </span> -->
          <!-- <span>-</span> -->
          <span>{{ dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </div>
      </div>
      <el-dropdown :teleported="false" class="operation">
        <el-icon><Setting /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div @click="handlerDialog(it)">
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
    >
      <Plus color-white />
    </el-icon>
  </div>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="700px">
    <el-form :model="form" label-width="80px">
      <el-form-item label="id">
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
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  deleteComponentLibrary,
  getComponentLibraryById,
  getComponentLibraryList,
} from "@/api/componentLibrary";
import { componentList } from "@/components/LowCodeCompoent/component-list";
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
import { reactive, ref } from "vue";

const libraryList = ref<ComponentLibrary[]>([]);

const paginated = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

async function getLibrary() {
  const { page, limit } = paginated;
  const res = await getComponentLibraryList(page, limit);
  const list = res.data.list;
  const total = res.data.total;
  libraryList.value = list;
  paginated.total = total;
}
getLibrary();

const dialogVisible = ref(false);
const dialogTitle = ref("");
const form = ref<ComponentLibrary>({
  id: "",
  libName: "",
  description: "",
  components: [],
  createTime: "",
  updateTime: "",
  deleteTime: "",
});

async function handlerDialog(library: ComponentLibrary) {
  dialogVisible.value = true;
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
    ElNotification({
      title: "Info",
      message: "修改成功",
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
</script>

<style scoped lang="scss">
.card-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 20px;
}
.card {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s;
  .operation {
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover {
    transform: scale(1.05);
    .operation {
      opacity: 1;
    }
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
