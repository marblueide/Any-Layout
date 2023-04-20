<template>
    <div class="app">
        <RouterView/>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
router.push("/workArea");
</script>

<style></style>
