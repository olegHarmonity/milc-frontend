<template>
  <HomeLayout>
    <Main3D class="w-100 h-100" />
  </HomeLayout>
</template>

<script>
import HomeLayout from "../components/layouts/HomeLayout.vue";
import Main3D from "../components/3d/Main.vue";

export default {
  components: { HomeLayout, Main3D },
};
</script>
