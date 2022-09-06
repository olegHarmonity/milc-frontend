<template>
  <v-row class="media-hub-video-item">
    <!-- Thumbnail -->
    <v-col cols="auto">
      <!-- Player -->
      <VideoPlayerDialog :item="item" width="200" />
    </v-col>

    <!-- Metadata -->
    <v-col cols="12" sm="" class="item-group first-border-none">
      <div class="item pt-1">
        <span class="key">{{ $t("labels.id") }}</span>
        <span class="value">{{ item.id }}</span>
      </div>
      <div class="item">
        <span class="key">{{ $t("labels.filename") }}</span>
        <span class="value">{{ item.fileName }}</span>
      </div>
      <div class="item">
        <span class="key">{{ $t("labels.resolution") }}</span>
        <span class="value">{{ item.srcWidth }}x{{ item.srcHeight }}</span>
      </div>
    </v-col>

    <!-- Actions -->
    <v-col cols="auto" class="d-flex align-center">
      <div class="d-flex flex-column">
        <!-- Delete -->
        <confirm-dialog @confirm="deleteItem">
          <template v-slot:button="{ on, attrs }">
            <v-btn
              color="error"
              fab
              small
              class="my-2"
              v-bind="attrs"
              v-on="on"
              :loading="
                $store.getters['mediahub/loading'].deleteItem === item.id
              "
            >
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </confirm-dialog>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import VideoPlayerDialog from "@/components/common/VideoPlayerDialog.vue";

export default {
  components: { VideoPlayerDialog },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  methods: {
    deleteItem() {
      this.$store.dispatch("mediahub/deleteItem", this.item.id).then(() => {
        this.$toast.success(this.$t("toast.deleted"));
      });
    },
  },
};
</script>

<style lang="scss">
.media-hub-video-item {
  .item {
    font-size: 14px;
  }
}
</style>
