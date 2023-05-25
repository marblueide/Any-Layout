<template>
    <el-card>
      <div flex flex-col>
        <el-table :data="list" mb-8>
            
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
  