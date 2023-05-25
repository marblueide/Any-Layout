<template>
  <div v-if="verify(roles)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { appStore } from "@/stores";
import type { UserGroupEnum } from "@/types/user.enum";

const props = withDefaults(
  defineProps<{
    roles: UserGroupEnum[];
  }>(),
  {}
);

const {verify } = appStore.user
</script>

<style></style>
