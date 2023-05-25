<template>
  <el-checkbox-group
    :min="propValue.min"
    :max="propValue.max"
    :disabled="isPreView ? false : true"
    v-model="value"
    :size="propValue.size"
    :fill="propValue.fill"
    :text-color="propValue.textColor"
  >
    <component
      v-for="item in propValue.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :is="propValue.button ? ElCheckboxButton : ElCheckbox"
      :border="propValue.border"
    ></component>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import type { EventType } from "@/types/LowCode/event";
import { storeToRefs } from "pinia";
import { ref, type StyleValue } from "vue";
import { ElCheckbox, ElCheckboxButton } from "element-plus";

const { isPreView } = storeToRefs(appStore.state);

const props = defineProps<{
  propValue: {
    options: {
      label: string;
      value: any;
    }[];
    min: number;
    max: number;
    button: boolean;
    border: boolean;
        size: string;
        fill: string
        textColor:string
  };
  style?: StyleValue;
  event?: EventType;
}>();

const value = ref([]);
</script>

<style></style>
