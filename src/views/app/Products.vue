<template>
  <router-view />
</template>

<script>
export default {
  created() {
    if (this.$route.name === "auth.login") {
      this.$router.replace({ name: "home" });
    }
  },
};
</script>

<style></style>
