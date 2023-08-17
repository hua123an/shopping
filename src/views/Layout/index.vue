<script setup>
import {onMounted} from "vue";
import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";
import LayoutFixed from "@/views/Layout/components/LayoutFixed.vue";
import {useCategoryStore} from "@/stores/categoryStore";

const categoryStore = useCategoryStore()

onMounted(() =>categoryStore.getCategory())
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
<!--  add key , break reuse -->
<!--  <RouterView :key="$route.fullPath"/>-->
  <RouterView />
  <LayoutFooter />

</template>

<style scoped>

</style>