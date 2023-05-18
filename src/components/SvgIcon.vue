<template>
  <svg class="svg-icon" v-bind="attrs" aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    default: "icon",
  },
  color: String,
});

const attrs = useAttrs();

const { prefix, name, color } = props;

const symbolId = `#${prefix}-${name}`;
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
