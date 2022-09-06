<template>
  <HomeLayout>
    <Category3D class="w-100 h-100" />
  </HomeLayout>
</template>

<script>
import HomeLayout from "../components/layouts/HomeLayout.vue";
import Category3D from "../components/3d/Category.vue";

export default {
  components: { HomeLayout, Category3D },
};
</script>
