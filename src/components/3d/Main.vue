<template>
  <div class="main-3d">
    <!-- Mouse instructions -->
    <MouseInstructions v-if="isReady" />
    <NavigateConfirmationModal />

    <!-- Modals -->
    <ContentPalace />
    <ExchangeBuildingModal />
    <UnderConstructionModal />
    <ShoppingCenterModal />
    <SupportBuildingModal />
    <CommunityBuildingModal />
    <MilcTowerModal />

    <div v-if="!isReady" class="d-flex w-100 h-100" style="position: absolute">
      <MilcLoader class="mx-auto my-auto" />
    </div>

    <div
      class="w-100 h-100"
      ref="canvaswrap"
      :style="{ visibility: isReady ? 'visible' : 'hidden' }"
    ></div>
    <div :style="{ display: 'none' }">
      <video ref="videoadCinema" id="videoadCinema" width="450" controls loop>
        <source :src="videoCinema" type="video/mp4" />
      </video>
      <video ref="videoadBank" id="videoadBank" width="450" controls loop>
        <source :src="videoBank" type="video/mp4" />
      </video>
      <video
        ref="videoadCommunity"
        id="videoadCommunity"
        width="450"
        controls
        loop
      >
        <source :src="videoCommunity" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
import modelPlugin from "@/plugins/3dmodel";

import MilcLoader from "@/components/common/MilcLoader.vue";
import ContentPalace from "@/components/3d/modals/ContentPalace.vue";
import ExchangeBuildingModal from "@/components/3d/modals/ExchangeBuildingModal.vue";
import MilcTowerModal from "@/components/3d/modals/MilcTowerModal.vue";
import ShoppingCenterModal from "@/components/3d/modals/ShoppingCenterModal.vue";
import SupportBuildingModal from "@/components/3d/modals/SupportBuildingModal.vue";
import CommunityBuildingModal from "@/components/3d/modals/CommunityBuildingModal.vue";
import MouseInstructions from "@/components/3d/modals/MouseInstructions.vue";
import NavigateConfirmationModal from "@/components/3d/modals/NavigateConfirmationModal.vue";
import UnderConstructionModal from "@/components/3d/modals/UnderConstruction.vue";

export default {
  components: {
    MilcLoader,
    ContentPalace,
    ExchangeBuildingModal,
    MouseInstructions,
    NavigateConfirmationModal,
    UnderConstructionModal,
    MilcTowerModal,
    SupportBuildingModal,
    CommunityBuildingModal,
    ShoppingCenterModal,
  },

  data: () => ({
    isReady: false,
    videoCinema: "unreal.mp4",
    videoBank: "roadmap.mp4",
    videoCommunity: "milccinema.mp4",
  }),

  mounted() {
    modelPlugin.init(
      this.$refs.canvaswrap,
      this.$refs.videoadCinema,
      this.$refs.videoadBank,
      this.$refs.videoadCommunity,
      (isReady) => {
        this.isReady = isReady;
      }
    );
  },
};
</script>

<style lang="scss">
.main-3d {
  background-color: transparent;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
