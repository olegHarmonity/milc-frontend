<template>
  <div class="product-vide-assets">
    <h2 class="mb-5">Video assets</h2>

    <VideoSlider :items="product.items" />
  </div>
</template>

<script>
import VideoSlider from "./parts/VideoSlider.vue";

export default {
  components: { VideoSlider },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.product-vide-assets {
}
</style>
