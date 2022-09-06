<template>
  <v-slide-group show-arrows>
    <v-slide-item v-for="item in items" :key="item.id">
      <VideoPlayerDialog
        :item="item"
        width="300"
        max-width="300"
        metadata
        imageClass="mx-3"
      />
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import VideoPlayerDialog from "@/components/common/VideoPlayerDialog.vue";

export default {
  components: { VideoPlayerDialog },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    model: null,
  }),
};
</script>
