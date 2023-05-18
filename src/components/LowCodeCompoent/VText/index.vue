<template>
  <div class="text" flex @dblclick="setIsEditor(true)">
    <span v-if="!isEditor" :style="style">{{ propValue.value }}</span>
    <textarea w="100%" h="100%" :style="style" border-none outline-none ref="textAreaRef" v-else :value="propValue.value"
      @input="handleInput" @keydown.enter="setIsEditor(false)"></textarea>
  </div>
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import { nextTick, ref, type StyleValue, type TextareaHTMLAttributes } from "vue";

const { setCurrentProps } = appStore.state

const props = defineProps<{
  propValue: {
    value: string;
  };
  style?: StyleValue;
}>();

const textAreaRef = ref<HTMLElement>();
const isEditor = ref(false);



const setIsEditor = async (b: boolean) => {
  isEditor.value = b;
  if (b == true) {
    await nextTick()
    textAreaRef.value?.focus()
  }
}

const handleInput = (e: Event) => {
  const value = (e.target as TextareaHTMLAttributes).value as string
  setCurrentProps({
    value
  })
}

</script>

<style scoped lang="scss">
.text {
  width: 100%;
  height: 100%;

  span {
    display: block;
    width: 100%;
    height: 100%;
    white-space: normal;
    overflow-wrap: break-word;
  }

  textarea {
    background: transparent;
    &::-webkit-resizer {
      display: none;
    }

    &::-moz-resizer {
      display: none;
    }

    &::-o-resizer {
      display: none;
    }

    &::-ms-resizer {
      display: none;
    }
  }
}</style>
