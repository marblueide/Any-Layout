<template>
  <div id="manage" h="100vh" overflow-hidden flex>
    <nav w="200px" h="100%">
      <el-menu
        h="100%"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        py-3
        router
      >
        <el-sub-menu>
          <template #title>
            <el-icon><location /></el-icon>
            <span>组件库</span>
          </template>
          <el-menu-item index="/manage/component/list">组件列表</el-menu-item>
          <el-menu-item index="/manage/component/add">添加组件</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/workArea">
          <el-icon><setting /></el-icon>
          <span>工作台</span>
        </el-menu-item>
      </el-menu>
    </nav>
    <main flex-1 p-6>
      <el-card>
        <RouterView/>
      </el-card>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
</script>

<style scoped lang="scss"></style>
