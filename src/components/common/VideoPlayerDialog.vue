<template>
  <v-dialog v-model="dialog" width="800">
    <!-- Activator -->
    <template v-slot:activator="{}">
      <VideoPlayerImage
        :item="item"
        @play="dialog = true"
        v-bind="$attrs"
        :class="imageClass"
      />
    </template>

    <VideoPlayer v-if="dialog" :item="item" autoplay />
  </v-dialog>
</template>

<script>
import VideoPlayer from "./VideoPlayer.vue";
import VideoPlayerImage from "./VideoPlayerImage.vue";

export default {
  inheritAttrs: false,

  components: { VideoPlayer, VideoPlayerImage },

  props: {
    item: {
      type: Object,
      required: true,
    },
    imageClass: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    dialog: false,
  }),
};
</script>
