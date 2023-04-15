<template>
  <div class="editor" flex flex-col>
    <Header></Header>
    <Main/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header.vue";
import Main from "@/components/main.vue";
import { onMounted, onUnmounted } from "vue";
import {downKeys,keysMapFn,singleKey} from "@/components/editor/event"

const handleKeyDown = (e:KeyboardEvent) => {
  // e.preventDefault()
  if(e.ctrlKey && typeof keysMapFn[e.keyCode] == 'function'){
    keysMapFn[e.keyCode]()
    return false
  }
}

onMounted(() => {
  window.addEventListener("keydown",handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown',handleKeyDown)
})
</script>

<style scoped lang="scss">
.editor {
  height: 100%;
}
</style>
