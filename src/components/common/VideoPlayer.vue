<template>
  <div ref="videoContainer" class="video-player">
    <!-- Static image -->
    <VideoPlayerImage
      v-if="image && !playerActive"
      :item="item"
      @play="activatePlayer"
    />

    <!-- Video -->
    <video
      v-else
      id="video"
      ref="videoPlayer"
      class="video w-100 h-100"
      :poster="item.thumbnailUrl"
      :autoplay="autoplay || image"
    />
  </div>
</template>

<script>
import VideoPlayerImage from "./VideoPlayerImage.vue";

const shaka = require("shaka-player/dist/shaka-player.ui.js");

export default {
  components: { VideoPlayerImage },

  props: {
    item: {
      type: Object,
      required: true,
    },
    image: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    player: null,
    playerActive: false,
    ui: null,
    loaded: false,
    error: false,
  }),

  mounted() {
    if (this.checkBrowserSupport()) {
      if (!this.image) {
        this.initPlayer();
      }
    } else {
      this.$emit("error");
      console.log("VideoPlayer Error: Browser not supported");
    }
  },

  methods: {
    checkBrowserSupport() {
      // Install built-in polyfills to patch browser incompatibilities.
      shaka.polyfill.installAll();

      // Check to see if the browser supports the basic APIs Shaka needs.
      return shaka.Player.isBrowserSupported();
    },
    activatePlayer() {
      this.playerActive = true;
      this.$nextTick(this.initPlayer);
    },
    initPlayer() {
      // Init player
      this.player = new shaka.Player(this.$refs.videoPlayer);

      // Init ui
      this.ui = new shaka.ui.Overlay(
        this.player,
        this.$refs.videoContainer,
        this.$refs.videoPlayer
      );
      this.ui.getControls();

      this.setRequestChunkSignatures();
      this.load();
    },
    setRequestChunkSignatures() {
      const extractSignatureParams = (url) => {
        const inputUrl = new URL(decodeURIComponent(url));
        const params = new URLSearchParams(inputUrl.search);
        return params;
      };

      let params = undefined;
      if (this.item.dashUrl) {
        params = extractSignatureParams(this.item.dashUrl);
      } else if (this.item.hlsUrl) {
        params = extractSignatureParams(this.item.hlsUrl);
      }

      this.player
        .getNetworkingEngine()
        .registerRequestFilter(function (type, request) {
          // Only add headers to license requests:
          if (type === shaka.net.NetworkingEngine.RequestType.SEGMENT) {
            // This is the specific parameter name and value the server wants:
            // request.uris[0] += `${params}`;
            request.uris[0] += `?Policy=${
              params?.get("Policy") || ""
            }&Key-Pair-Id=${params?.get("Key-Pair-Id") || ""}&Signature=${
              params?.get("Signature") || ""
            }`;
          }
        });
    },
    load() {
      const url = this.item.dashUrl || this.item.hlsUrl || null;

      if (url) {
        this.player.load(url).then(this.onLoad).catch(this.onError);
      } else {
        console.log("VideoPlayer Error: URL not detected");
        this.error = true;
        this.$emit("error");
      }
    },
    onLoad() {
      this.loaded = true;
    },
    onError(error) {
      this.error = true;
      console.error(
        "VideoPlayer Error: Error code",
        error.code,
        "object",
        error
      );
      this.$emit("error");
    },
  },
};
</script>

<style lang="scss">
@import "../../../node_modules/shaka-player/dist/controls.css"; /* Shaka player CSS import */

.video-player {
  max-width: 100%;

  .video {
    border-radius: 7px;
  }

  .shaka-scrim-container {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
}
</style>
