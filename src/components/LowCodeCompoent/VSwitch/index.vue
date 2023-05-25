<template>
  <div class="switch-wrapper" w="100%" h="100%">
    <el-switch
      v-model="value"
      :disabled="propValue.disabled"
      class="switch"
    >
    </el-switch>
  </div>
</template>

<script setup lang="ts">
import type { EventType } from "@/types/LowCode/event";
import { ref, watchEffect, type StyleValue } from "vue";

const props = defineProps<{
  propValue: {
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
.switch-wrapper {
  &:deep(.el-switch.is-checked .el-switch__core .el-switch__action) {
    transform: translateX(-100%);
    left: 100%;
  }
}
.switch {
  width: 100%;
  height: 100%;

  :deep(.el-switch__core) {
    width: 100%;
    height: 100%;
    .el-switch__action {
      height: 60%;
      aspect-ratio: 1/1;
      width: auto !important;
    }
  }
}
</style>
