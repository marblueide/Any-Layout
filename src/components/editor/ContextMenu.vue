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
        v-show="menuShowList[menuState.type].includes(item.type)"
        @click.stop="handleClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import { useLowStore } from "@/stores/useLowStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { menuList, type menuObj,menuShowList } from "./data";

const store = useLowStore();
const { currentComponent } = storeToRefs(appStore.state);
const { menuState } = storeToRefs(appStore.contextMenu);
const {setMenuState} = appStore.contextMenu

const handleClick = (item:menuObj) => {
  item.fn(currentComponent.value?.id)
  setMenuState({
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
