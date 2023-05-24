<template>
  <el-switch
    v-model="value"
    :disabled="propValue.disabled"
    :size="propValue.size"
    class="switch"
  >
  </el-switch>
</template>

<script setup lang="ts">
import type { EventType } from "@/types/LowCode/event";
import { ref, watchEffect, type StyleValue } from "vue";

const props = defineProps<{
  propValue: {
    size: string;
    disabled: boolean;
    switchValue: boolean;
  };
  style?: StyleValue;
  event: EventType;
}>();

const value = ref(false);

watchEffect(() => {
  value.value = props.propValue.switchValue;
});
</script>

<style scoped lang="scss">
  .switch{
    width: 100%;
    height: 100%;
    :deep(.el-switch__core){
      width: 100%;
      height: 100%;
      .el-switch__action{
        height: 60%;
        aspect-ratio:1/1;
        width: auto !important;
      }
    }
  }
</style>
