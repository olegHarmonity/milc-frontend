<template>
  <router-view />
</template>

<script>
export default {
  created() {
    if (!this.$isSeller() && this.$route.name === "app.products") {
      this.$router.replace({ name: "app.orders" });
    }
  },
};
</script>

<style></style>
