<template>
  <div class="card-box">
    <div
      class="card"
      bg-white
      cursor-pointer
      px-5
      py-5
      rounded-2
      v-for="it in componentList"
    >
      <div flex items-center h-16>
        <i
          class="iconfont"
          flex-shrink-0
          mr-6
          w-14
          h-14
          lh-14
          text-3xl
          text-center
          bg-blue-50
          rounded-full
          :class="it.icon"
        ></i>
        <div>
          <span>{{ it.name }}</span>
          <div text-xs color-bluegray-4 mt-1>
            <div class="ellipsis-2" v-if="it.describe">
              {{ it.describe }}
            </div>
            <div class="ellipsis-2" v-else>作者好像很懒，什么都没写</div>
          </div>
        </div>
      </div>
      <div mt-8 flex justify-between text-14px>
        <div color-gray-5>
          <span>开发者: </span>
          <span>admin</span>
        </div>
        <div color-gray-5 text-12px>
          <!-- <span>最新: </span> -->
          <!-- <span>-</span> -->
          <span>{{ dayjs(Date.now()).format("YYYY-MM-DD hh-mm-ss") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { componentList } from "@/components/LowCodeCompoent/component-list";
import dayjs from "dayjs";
</script>

<style scoped lang="scss">
.card-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 20px;
}
.card {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
