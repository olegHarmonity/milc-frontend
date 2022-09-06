<template>
  <v-img :src="item.thumbnailUrl" class="d-flex rounded" v-bind="$attrs">
    <!-- Metadata -->
    <div v-if="metadata" class="mt-2 ml-2">
      <!-- Title -->
      <div>{{ title }}</div>

      <!-- Duration -->
      <span class="text--secondary">
        <v-icon color="secondary lighten-5" small class="mr-1">
          mdi-clock-outline
        </v-icon>
        <small>{{ duration }}</small>
      </span>
    </div>

    <!-- Play button -->
    <v-btn icon @click="$emit('play')" class="absolute-center">
      <v-icon :size="buttonSize">mdi-play-circle</v-icon>
    </v-btn>
  </v-img>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    metadata: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    title() {
      const title = this.item.fileName.split("/")[1].split("_")[0];

      return title[0].toUpperCase() + title.slice(1);
    },
    fileName() {
      return this.item.fileName
        .split("/")[1]
        .split(".")[0]
        .split("_")
        .slice(1)
        .join(" ")
        .replaceAll("_", " ");
    },
    duration() {
      return this.$formatDuration(
        this.item.technicalMetadata.container.duration,
        "seconds",
        "H[h] m[m] s[s]"
      )
        .replace("0h ", "")
        .replace("0m ", "");
    },
    buttonSize() {
      if (this.$attrs.width) {
        return Number(this.$attrs.width) / 5;
      }

      return 70;
    },
  },
};
</script>

<style></style>
