<template>
  <HomeLayout>
    <canvas ref="bjsCanvas" class="w-100 h-100" />
  </HomeLayout>
</template>

<script>
import { createScene } from "@/scenes/SupportScene";
import HomeLayout from "@/components/layouts/HomeLayout.vue";

export default {
  components: { HomeLayout },

  async mounted() {
    let bjsCanvas = this.$refs.bjsCanvas;

    if (bjsCanvas) {
      await createScene(this.$refs.bjsCanvas);
    }
  },
};
</script>

<style></style>
