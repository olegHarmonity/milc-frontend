<template>
  <div>
    <h2 class="page-heading">{{ $t("products.headings.marketing") }}</h2>

    <v-row class="page-section">
      <!-- Left -->
      <v-col class="pr-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.keyArt") }}</v-label>
        <v-file-input
          v-model="value.files.key_art"
          accept="image/*"
          append-icon="mdi-cloud-upload-outline"
          prepend-icon=""
        />

        <v-label>{{ $t("labels.productionImages") }}</v-label>
        <v-file-input
          v-model="value.files.production_images"
          multiple
          accept="image/*"
          append-icon="mdi-cloud-upload-outline"
          prepend-icon=""
        />

        <v-textarea
          v-model="value.marketing_assets.copyright_information"
          outlined
          :label="$t('labels.copyrightInfo')"
          :rules="[rule.required]"
        />
      </v-col>

      <!-- Right -->
      <v-col class="pl-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.reviewsPromotions") }}</v-label>
        <multiple-text-field
          v-model="value.marketing_assets.links"
          :attrs="{
            rules: [rule.url],
          }"
        />
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
