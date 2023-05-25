<template>
  <el-card>
    <div flex flex-col>
      <el-table :data="list" mb-8>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="用户组">
          <template #default="{ row }">
            <el-tag v-for="item in row.userGroup" mr-3>{{
              item.groupName
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div flex v-if="row.userGroup?.groupName != UserGroupEnum.admin">
              <el-button
                type="primary"
                :icon="Edit"
                circle
                @click="edit(row)"
              />
              <el-popconfirm title="是否删除?" @confirm="handleDelte(row)">
                <template #reference>
                  <el-button type="danger" :icon="Delete" circle />
                </template>
              </el-popconfirm>
            </div>
          </template>
          <template #header>
            <div flex justify-between w="100%">
              <span>操作</span>
              <el-button type="primary" :icon="Plus" circle @click="add" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div flex justify-end>
        <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="pagination.page"
          :total="pagination.total"
          :page-size="pagination.limit"
        />
      </div>
    </div>
  </el-card>

  <el-dialog v-model="dialog" title="新增路由">
    <el-form :model="form" ref="formRef">
      <el-form-item label="名称" prop="name" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="路径" prop="path" required>
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item label="用户组" prop="userGroup">
        <el-checkbox-group v-model="form.userGroup">
          <el-checkbox-button
            v-for="item in userGroup"
            :key="item.id"
            :label="item.id"
          >
            {{ item.groupName }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="end">
        <el-button type="warning" @click="reset">重置</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm(formRef)">{{
          isAdd ? "添加" : "修改"
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import type { User } from "@/types/model/User";
import { ref, watchEffect } from "vue";
import type { Router } from "@/types/model/Router";
import { Plus, Delete, Edit } from "@element-plus/icons-vue";
import { UserGroupEnum } from "@/types/user.enum";
import {
  createRouter,
  deleteRouter,
  getRouterList,
  updateRouter,
} from "@/api/router";
import { ElMessage, type FormInstance } from "element-plus";
import type { RouterValidator } from "@/utils/validator/router";
import type { UserGroup } from "@/types/model/UserGroup";
import { getUserGroupList } from "@/api/userGroup";
import { rest } from "lodash-es";

const list = ref<Router[]>([]);
const pagination = ref({
  total: 0,
  limit: 10,
  page: 1,
});

const initList = async () => {
  const res = await getRouterList(
    pagination.value.page,
    pagination.value.limit
  );
  list.value = res.data;
  pagination.value.total = res.count;
};

const handleDelte = async (item: Router) => {
  let res = await deleteRouter(item.id);
  ElMessage({
    type: "success",
    message: res.message,
  });
  initList();
};

const dialog = ref(false);
const form = ref<RouterValidator>({
  name: "",
  path: "",
  userGroup: [],
});
const userGroup = ref<UserGroup[]>([]);
const formRef = ref();
const setDialog = (b: boolean) => {
  dialog.value = b;
};
const reset = () => {
  form.value = {
    name: "",
    path: "",
    userGroup: [],
  };
  formRef.value && formRef.value.resetFields();
};
const editorId = ref("");
const isAdd = ref(true);

const cancel = () => {
  reset();
  setDialog(false);
};

const edit = ({ name, path, userGroup, id }: Router) => {
  setDialog(true);
  isAdd.value = false;
  editorId.value = id;
  form.value = {
    userGroup: userGroup.map((item) => item.id),
    name,
    path,
  };
};

const confirm = async (formEl: FormInstance | undefined, item?: Router) => {
  if (!formEl) return;

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let res;
      if (isAdd.value) {
        res = await createRouter(form.value);
      } else {
        res = await updateRouter(editorId.value, form.value);
      }
      ElMessage({
        type: "success",
        message: res.message,
      });
      initList();
      cancel();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const add = () => {
  reset();
  setDialog(true);
  isAdd.value = true;
};

const initUserGroup = async () => {
  const res = await getUserGroupList();
  userGroup.value = res.data;
};

watchEffect(() => {
  initList();
});

initUserGroup();
</script>

<style scoped lang="scss">
.end {
  :deep(.el-form-item__content) {
    justify-content: end;
  }
}
</style>
