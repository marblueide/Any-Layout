<template>
  <el-radio-group
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
      :is="propValue.button ? ElRadioButton :ElRadio "
      :border="propValue.border"
    ></component>
  </el-radio-group>
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import type { EventType } from "@/types/LowCode/event";
import { storeToRefs } from "pinia";
import { ref, type StyleValue } from "vue";
import { ElRadio, ElRadioButton } from "element-plus";

const { isPreView } = storeToRefs(appStore.state);

const props = defineProps<{
  propValue: {
    options: {
      label: string;
      value: any;
    }[];
    button: boolean;
    border: boolean;
    size: string;
    fill: string;
    textColor: string;
  };
  style?: StyleValue;
  event?: EventType;
}>();

const value = ref([]);
</script>

<style></style>
