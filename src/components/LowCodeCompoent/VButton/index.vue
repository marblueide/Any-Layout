<template>
  <button
    class="btn"
    :style="style"
    inline-block
    box-border
    flex
    bg-white
    border="1 sold gray-2"
    cursor-pointer
    hover="bg-lightblue-1 color-blue-5 border-blue-2"
    transition
    v-bind="{ ...propValue }"
    @click="handleClick"
  >
    {{ propValue.value }}
  </button>
</template>

<script setup lang="ts">
import type { EventType } from "@/types/LowCode/event";
import type { StyleValue } from "vue";
import { eventList } from "../Attrs/event/event.list";
import { storeToRefs } from "pinia";
import { appStore } from "@/stores";

const { isPreView } = storeToRefs(appStore.state);

const props = defineProps<{
  propValue: {
    value: string;
  };
  style?: StyleValue;
  events: EventType;
}>();

const handleClick = () => {
  if (!isPreView.value) return;
  if (props.events.hasOwnProperty("onClick")) {
    const data = props.events["onClick"];
    if (!data) return;
    eventList[data.type](data);
  }
};
</script>

<style scoped lang="scss">
.btn {
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 0.8rem;
}
</style>
