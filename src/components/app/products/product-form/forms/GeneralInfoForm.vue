<template>
  <div>
    <h2 class="page-heading">{{ $t("products.headings.general") }}</h2>

    <v-row class="page-section">
      <!-- Left -->
      <v-col class="pr-md-10" cols="12" md="6">
        <v-text-field
          rounded
          outlined
          :label="$t('labels.title')"
          v-model="value.title"
          :rules="[rule.required]"
        />

        <v-text-field
          rounded
          outlined
          :label="$t('labels.titleAlternative')"
          v-model="value.alternative_title"
        />

        <duration-picker
          v-model="value.runtime"
          :label="$t('labels.runtime')"
          rounded
          outlined
          :rules="[rule.required, rule.duration]"
        />

        <v-select
          rounded
          outlined
          :label="$t('labels.contentType')"
          v-model="value.content_type_id"
          :items="$store.getters['movieContentTypes/items']"
          :rules="[rule.required]"
          item-text="name"
          item-value="id"
        />

        <v-checkbox
          v-model="value.allow_requests"
          color="red"
          :label="$t('labels.allowRequests')"
        />

        <v-textarea
          :label="$t('labels.synopsis')"
          v-model="value.synopsis"
          :rules="[rule.required]"
          outlined
          rows="8"
        />

        <v-combobox
          rounded
          outlined
          :label="$t('labels.keywords')"
          v-model="value.keywords"
          multiple
          chips
          deletable-chips
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
          <language-picker
            :fieldLabel="$t('labels.languageOriginal')"
            v-model="value.original_language"
            :attrs="{
              rules: [rule.required],
            }"
          />

          <language-picker
            :fieldLabel="$t('labels.dubbing')"
            v-model="value.dubbing_languages"
            :attrs="{
              multiple: true,
            }"
          />

          <language-picker
            :fieldLabel="$t('labels.subtitles')"
            v-model="value.subtitle_languages"
            :attrs="{
              multiple: true,
            }"
          />
        </div>

        <div class="form-box">
          <v-text-field
            rounded
            outlined
            :label="$t('labels.website')"
            v-model="value.links.website"
            :rules="[rule.url]"
          />

          <v-text-field
            rounded
            outlined
            :label="$t('labels.imdb')"
            v-model="value.links.imdb"
            :rules="[rule.url]"
          />

          <v-text-field
            rounded
            outlined
            :label="$t('labels.facebook')"
            v-model="value.links.facebook"
            :rules="[rule.url]"
          />

          <v-text-field
            rounded
            outlined
            :label="$t('labels.twitter')"
            v-model="value.links.twitter"
            :rules="[rule.url]"
          />
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
