<template>
  <div class="main-3d">
    <div v-if="!isReady" class="d-flex w-100 h-100" style="position: absolute">
      <MilcLoader class="mx-auto my-auto" />
    </div>

    <div
      class="w-100 h-100"
      ref="canvaswrap"
      :style="{ visibility: isReady ? 'visible' : 'hidden' }"
    ></div>
  </div>
</template>

<script>
import modelPlugin from "@/plugins/3dcategory";
import MilcLoader from "@/components/common/MilcLoader.vue";

export default {
  components: { MilcLoader },

  data: () => ({
    isReady: false,
  }),

  mounted() {
    modelPlugin.init(this.$refs.canvaswrap, (isReady) => {
      this.isReady = isReady;
    });
  },
};
</script>

<style lang="scss">
.main-3d {
  background-color: transparent;
}
</style>
