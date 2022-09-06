<template>
  <div>
    <h2 class="page-heading">{{ $t("products.headings.general") }}</h2>

    <v-row class="page-section">
      <!-- Left -->
      <v-col class="pr-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.title") }}<req /></v-label>
        <v-text-field v-model="value.title" :rules="[rule.required]" />

        <v-label>{{ $t("labels.titleAlternative") }}</v-label>
        <v-text-field v-model="value.alternative_title" />

        <v-label>{{ $t("labels.runtime") }}<req /></v-label>
        <duration-picker
          v-model="value.runtime"
          :rules="[rule.required, rule.duration]"
        />

        <v-label>{{ $t("labels.contentType") }}<req /></v-label>
        <v-select
          v-model="value.content_type_id"
          :items="$store.getters['movieContentTypes/items']"
          :rules="[rule.required]"
          item-text="name"
          item-value="id"
        />

        <v-checkbox
          v-model="value.allow_requests"
          :label="$t('labels.allowRequests')"
        />

        <v-label>{{ $t("labels.synopsis") }}<req /></v-label>
        <v-textarea
          v-model="value.synopsis"
          :rules="[rule.required]"
          outlined
          rows="8"
        />

        <v-label>{{ $t("labels.keywords") }}</v-label>
        <v-combobox
          v-model="value.keywords"
          multiple
          chips
          deletable-chips
          outlined
          append-icon=""
        />
      </v-col>

      <!-- Right -->
      <v-col class="pl-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.genre") }}</v-label>
        <chip-select
          v-model="value.genres"
          :items="$store.getters['movieGenres/items']"
          :loading="$store.getters['movieGenres/loading'].fetchAll"
          item-text="name"
          item-value="id"
          multiple
        />

        <v-label>{{ $t("labels.formats") }}</v-label>
        <chip-select
          v-model="value.available_formats"
          :items="$store.getters['movieFormats/items']"
          :loading="$store.getters['movieFormats/loading'].fetchAll"
          item-text="name"
          item-value="id"
          multiple
        />

        <div class="form-box">
          <v-label>{{ $t("labels.languageOriginal") }}<req /></v-label>
          <language-picker
            v-model="value.original_language"
            :attrs="{
              rules: [rule.required],
            }"
          />

          <v-label>{{ $t("labels.dubbing") }}</v-label>
          <language-picker
            v-model="value.dubbing_languages"
            :attrs="{
              multiple: true,
            }"
          />

          <v-label>{{ $t("labels.subtitles") }}</v-label>
          <language-picker
            v-model="value.subtitle_languages"
            :attrs="{
              multiple: true,
            }"
          />
        </div>

        <div class="form-box">
          <v-label>{{ $t("labels.website") }}</v-label>
          <v-text-field v-model="value.links.website" :rules="[rule.url]" />

          <v-label>{{ $t("labels.imdb") }}</v-label>
          <v-text-field v-model="value.links.imdb" :rules="[rule.url]" />

          <v-label>{{ $t("labels.facebook") }}</v-label>
          <v-text-field v-model="value.links.facebook" :rules="[rule.url]" />

          <v-label>{{ $t("labels.twitter") }}</v-label>
          <v-text-field v-model="value.links.twitter" :rules="[rule.url]" />
        </div>
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
