<template>
  <div flex flex-col h-full overflow-hidden>
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
      <el-popover placement="bottom" trigger="click" popper-class="popover">
        <template #reference>
          <div
            h-34px
            lh-34px
            w-34px
            text-center
            rounded-full
            text-10px
            mr-5
            class="bg-#e4d8cc"
          >
            1
          </div>
        </template>
        <el-button type="danger" @click="handleOut">登出</el-button>
      </el-popover>
    </header>
    <section flex-1 flex overflow-hidden>
      <aside class="aside" w-256px h-full pt-4 pl-4>
        <div text-13px font-bold py-9px px-15px>应用组</div>
        <!-- <div class="aside-item color-#4b4848">
          <SvgIcon name="add" mr-12px />
          <span>新建用户组</span>
        </div> -->
        <div
          v-for="it in asideList"
          class="aside-item color-#4b4848"
          @click="handleRouterTo(it)"
        >
          <SvgIcon name="group" mr-12px />
          <span>{{ it.name }}</span>
        </div>
      </aside>
      <el-scrollbar class="main-box">
        <main bg-gray-50 p-5>
          <RouterView />
        </main>
      </el-scrollbar>
    </section>
  </div>
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter, type Router, type RouteLocationRaw } from "vue-router";

type Options = {
  name: string;
  router?: RouteLocationRaw;
};

const router = useRouter();

const { out } = appStore.user
const { user } = storeToRefs(appStore.user);

const headerOptions: Options[] = [
  {
    name: "应用",
  },
  {
    name: "组件库",
    router: {
      path: "/component_lib",
    },
  },
];

const currentHeader = ref(0);

const asideList: Options[] = [
  {
    name: `${user.value?.username}'s apps`,
    router: {
      path: "/",
    },
  },
  {
    name: "组件库",
    router: {
      path: "/component_lib",
    },
  },
];

const handleRouterTo = (item: Options) => {
  item.router && router.push(item.router);
};

const handleOut = () => {
  out();
  router.push("/login")
}
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

.main-box {
  flex: 1 1 0;
  overflow: hidden;
  :deep(.el-scrollbar__view) {
    height: 100%;
  }
  main {
    height: 100%;
  }
}
</style>
<style lang="scss">
.popover {
  width: auto !important;
  min-width: auto !important;
}
</style>
