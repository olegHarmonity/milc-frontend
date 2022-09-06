<template>
  <HomeLayout>
    <BankBuilding3D class="w-100 h-100" />
  </HomeLayout>
</template>

<script>
import HomeLayout from "../components/layouts/HomeLayout.vue";
import BankBuilding3D from "../components/3d/BankBuilding.vue";

export default {
  components: { HomeLayout, BankBuilding3D },
};
</script>
