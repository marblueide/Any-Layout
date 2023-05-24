<template>
  <el-card>
    <div flex flex-col>
      <el-table :data="list" mb-8>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="userGroup" label="用户组">
          <template #default="{ row }">
            <el-tag
              v-if="row.userGroup"
              :type="
                row.userGroup?.groupName == UserGroupEnum.admin
                  ? 'danger'
                  : 'success'
              "
              >{{ row.userGroup?.groupName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template #default="{ row }">
            {{ dayjs(row.createTime).format("YYYY:MM:DD HH:mm") }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div flex v-if="row.userGroup?.groupName != UserGroupEnum.admin">
              <el-popconfirm title="是否删除?" @confirm="handleConfirm(row)">
                <template #reference>
                  <el-button type="danger" :icon="Delete" circle />
                </template>
              </el-popconfirm>
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
</template>

<script setup lang="ts">
import { deleteUser, getUserList } from "@/api";
import type { User } from "@/types/model/User";
import { UserGroupEnum } from "@/types/user.enum";
import { ElMessage } from "element-plus";
import { ref, watchEffect } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import dayjs from "dayjs";

const list = ref<User[]>([]);
const pagination = ref({
  total: 0,
  limit: 10,
  page: 1,
});

const init = async () => {
  let res = await getUserList(pagination.value.page, pagination.value.limit);
  pagination.value.total = res.count;
  list.value = res.data;
  ElMessage({
    type: "success",
    message: res.message,
  });
};

const handleConfirm = async (item: User) => {
  let res = await deleteUser(item.id);
  ElMessage({
    type: "success",
    message: res.message,
  });
  init()
};

watchEffect(() => {
  init();
});
</script>

<style></style>
