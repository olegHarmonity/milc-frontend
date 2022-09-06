<template>
  <div>
    <h2 class="page-heading">{{ $t("products.headings.localization") }}</h2>

    <v-row class="page-section">
      <!-- Left -->
      <v-col class="pr-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.subtitleFiles") }}</v-label>
        <v-file-input
          v-model="value.files.subtitles"
          accept=".srt"
          append-icon="mdi-cloud-upload-outline"
          prepend-icon=""
          multiple
        />

        <!-- <v-label>{{ $t("labels.movie") }}</v-label>
        <v-file-input
          v-model="value.files.movie"
          accept="video/*, .mxf"
          append-icon="mdi-cloud-upload-outline"
          prepend-icon=""
        /> -->

        <!-- <v-label>{{ $t("labels.screener") }}</v-label>
        <v-file-input
          v-model="value.files.screener"
          accept="video/*, .mxf"
          append-icon="mdi-cloud-upload-outline"
          prepend-icon=""
        /> -->

        <!-- <v-label>{{ $t("labels.trailer") }}</v-label>
        <v-file-input
          v-model="value.files.trailer"
          accept="video/*, .mxf"
          append-icon="mdi-cloud-upload-outline"
          prepend-icon=""
        /> -->
      </v-col>

      <!-- Right -->
      <v-col class="pl-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.dubFiles") }}</v-label>
        <v-file-input
          v-model="value.files.dub_files"
          accept="audio/*"
          append-icon="mdi-cloud-upload-outline"
          prepend-icon=""
          multiple
        />

        <!-- <v-label>{{ $t("labels.subtitleFiles") }}</v-label>
        <v-file-input
          v-model="value.files.subtitles"
          accept=".srt"
          append-icon="mdi-cloud-upload-outline"
          prepend-icon=""
          multiple
        /> -->

        <!-- <v-label>{{ $t("labels.promotionalVideos") }}</v-label>
        <v-file-input
          v-model="value.files.promotional_videos"
          accept="video/*, .mxf"
          append-icon="mdi-cloud-upload-outline"
          prepend-icon=""
          multiple
        /> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
