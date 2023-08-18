<script setup>
import HomeBanner from "@/views/Home/components/HomeBanner.vue";
import HomeCategory from "@/views/Home/components/HomeCategory.vue";
import HomeNew from "@/views/Home/components/HomeNew.vue";
import HomeHot from "@/views/Home/components/HomeHot.vue";
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />

</template>

<style scoped>

</style>