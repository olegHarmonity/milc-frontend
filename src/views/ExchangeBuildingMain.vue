<template>
  <HomeLayout>
    <ExchangeBuilding3D class="w-100 h-100" />
  </HomeLayout>
</template>

<script>
import HomeLayout from "../components/layouts/HomeLayout.vue";
import ExchangeBuilding3D from "../components/3d/ExchangeBuilding.vue";

export default {
  components: { HomeLayout, ExchangeBuilding3D },
};
</script>
