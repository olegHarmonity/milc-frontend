<template>
  <v-app>
    <HomeLayout>
      <div id="loadingScreen" class="d-flex w-100 h-100">
        <div class="d-flex flex-column align-center mx-auto my-auto">
          <!-- :indeterminate="statusIndeterminate" -->
          <div v-if="isReady">
            <v-progress-circular
              id="loading"
              indeterminate
              color="primary"
              size="250"
              width="15"
            >
              <img
                :src="require('@/assets/logos/milc-snow-text.png')"
                width="130"
                alt="milc_logo"
              />
            </v-progress-circular>
          </div>

          <div class="text-h6 mt-5" style="letter-spacing: 1px !important">
            {{ $t("common.cityLoadingText") }}
          </div>
        </div>
      </div>
      <canvas ref="bjsCanvas" class="w-100 h-100" />
    </HomeLayout>
  </v-app>
</template>

<script>
import { createScene } from "@/scenes/CommunityScene";
import HomeLayout from "@/components/layouts/HomeLayout.vue";

export default {
  data() {
    return {
      isReady: true,
    };
  },
  components: { HomeLayout },

  async mounted() {
    let bjsCanvas = this.$refs.bjsCanvas;

    if (bjsCanvas) {
      createScene(this.$refs.bjsCanvas, (ready) => {
        this.isReady = ready;
      });
    }
  },
};
</script>

<style lang="scss">
#loadingScreen {
  width: 100%;
  height: 100%;
  font-size: 50px;
  text-align: center;
  position: absolute;
  background-color: #191c21;
}
.image {
  z-index: 300;
}
</style>
