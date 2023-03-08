<template>
  <div
    class="right-menu"
    bg-white
    border-gray-100
    v-show="menuState.show"
    :style="pointStyle"
  >
    <ul>
      <li
        px-4
        py-2
        rounded
        transition-100
        hover="bg-gray-100"
        v-for="item in menuList"
        :key="item.label"
        @mousedown.stop

        @click.stop="handleClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useLowStore } from "@/stores/useLowStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { menuList, type menuObj } from "./data";

const store = useLowStore();
const { menuState, currentComponent } = storeToRefs(store);

const handleClick = (item:menuObj) => {
  console.log(item.label,55555555)
  console.log(item.fn)
  item.fn(currentComponent.value?.id)
  store.setMenuState({
    show:false
  })
}

const pointStyle = computed(() => {
  return {
    left: menuState.value.left + "px",
    top: menuState.value.top + "px",
  };
});
</script>

<style scoped lang="scss">
.right-menu {
  position: absolute;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  z-index: 1;
  ul {
    padding-left: 0;
    margin-top: 5px;
    margin-bottom: 5px;
    li {
      list-style: none;
      cursor: pointer;
    }
  }
}
</style>
