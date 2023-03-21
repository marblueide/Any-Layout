<template>
  <div class="editor" flex flex-col>
    <Header></Header>
    <Main/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header.vue";
import Main from "@/components/main.vue";
</script>

<style scoped lang="scss">
.editor {
  height: 100%;
}
</style>
