<template>
  <div flex flex-col h-full>
    <header flex items-center justify-between px-7 h-50px lh-50px class="nav">
      <div flex gap-6 ml-42px>
        <div
          v-for="(it, index) in headerOptions"
          class="color-#858282"
          :class="{ active: currentHeader == index }"
        >
          {{ it.name }}
        </div>
      </div>
      <div
        h-34px
        lh-34px
        w-34px
        text-center
        rounded-full
        text-10px
        class="bg-#e4d8cc"
      >
        1
      </div>
    </header>
    <section flex-1 flex>
      <aside class="aside" w-256px h-full pt-4 pl-4 >
        <div text-13px font-bold py-9px px-15px>应用组</div>
        <div class="aside-item color-#4b4848">
          <SvgIcon name="add" mr-12px />
          <span>新建用户组</span>
        </div>
        <div v-for="it in asideList" class="aside-item color-#4b4848">
          <SvgIcon name="group" mr-12px />
          <span>{{ it.name }}</span>
        </div>
      </aside>
      <Main flex-1 />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Main from "@/components/index/main/index.vue"

const headerOptions = [
  {
    name: "应用",
  },
  {
    name: "模板",
  },
];

const currentHeader = ref(0);

const asideList = [
  {
    name: "'1070129872's apps",
  },
  {
    name: "应用组1",
  },
];
</script>

<style scoped lang="scss">
.nav {
  border: 0 solid #e4e4e7;
  box-shadow: rgb(237, 237, 237) 0px 1px 0px;
  .active {
    color: #191919;
    border-bottom: 2px solid #2cbba6;
  }
}
.aside {
  box-shadow: rgb(237, 237, 237) 1px 0px 0px;
  transition: all 0.3s;
  box-sizing: border-box;
  .aside-item {
    font-size: 14px;
    @apply h-38px lh-38px px-14px;
    &:hover {
      text-decoration: none;
      cursor: pointer;
      background-color: #f0f0f0;
      color: #191919;
    }
  }
}
</style>
