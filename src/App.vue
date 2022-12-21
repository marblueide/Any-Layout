<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useLowStore } from "./stores/useLowStore";

const store = useLowStore();
const { lowCanvasState } = storeToRefs(store);
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
:root,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
