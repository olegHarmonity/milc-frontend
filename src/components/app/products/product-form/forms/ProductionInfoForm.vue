<template>
  <div>
    <h2 class="page-heading">{{ $t("products.headings.production") }}</h2>

    <!-- Production year, status -->
    <v-row class="page-section">
      <!-- Left -->
      <v-col class="pr-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.productionYear") }}<req /></v-label>
        <v-text-field
          v-model="value.production_info.production_year"
          v-mask="'####'"
          :rules="[rule.required, rule.year]"
        />

        <v-label>{{ $t("labels.releaseYear") }}<req /></v-label>
        <v-text-field
          v-model="value.production_info.release_year"
          v-mask="'####'"
          :rules="[rule.required, rule.year]"
        />
      </v-col>

      <!-- Right -->
      <v-col class="pl-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.countryOrigin") }}<req /></v-label>
        <country-picker
          v-model="value.production_info.country_of_origin"
          :attrs="{
            rules: [rule.required],
          }"
        />

        <v-label>{{ $t("labels.productionStatus") }}<req /></v-label>
        <v-radio-group
          v-model="value.production_info.production_status"
          :rules="[rule.required]"
        >
          <v-radio :label="$t('labels.released')" value="released"></v-radio>
          <v-radio
            :label="$t('labels.unreleased')"
            value="unreleased"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- Cast, director -->
    <v-row class="page-section">
      <!-- Left -->
      <v-col class="pr-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.director") }}</v-label>
        <multiple-person-field
          v-model="value.production_info.directors"
          :attrs="{
            rules: [rule.required],
          }"
        />

        <v-label>{{ $t("labels.producer") }}</v-label>
        <multiple-person-field
          v-model="value.production_info.producers"
          :attrs="{
            rules: [rule.required],
          }"
        />

        <v-label>{{ $t("labels.awards") }}</v-label>
        <multiple-text-field
          v-model="value.production_info.awards"
          :attrs="{
            rules: [rule.required],
          }"
        />
      </v-col>

      <!-- Right -->
      <v-col class="pl-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.writer") }}</v-label>
        <multiple-person-field
          v-model="value.production_info.writers"
          :attrs="{
            rules: [rule.required],
          }"
        />

        <v-label>{{ $t("labels.cast") }}</v-label>
        <multiple-person-field
          v-model="value.production_info.cast"
          :attrs="{
            rules: [rule.required],
          }"
        />

        <v-label>{{ $t("labels.festivals") }}</v-label>
        <multiple-text-field
          v-model="value.production_info.festivals"
          :attrs="{
            rules: [rule.required],
          }"
        />
      </v-col>
    </v-row>

    <!-- Box office -->
    <v-row class="page-section">
      <v-col class="pr-md-10" cols="12" md="6">
        <v-label>{{ $t("labels.boxOffice") }}</v-label>

        <v-text-field
          v-model="value.production_info.box_office.globalGbo"
          :placeholder="$t('labels.gboGlobal')"
        />

        <v-text-field
          v-model="value.production_info.box_office.domesticGbo"
          :placeholder="$t('labels.gboDomestic')"
        />

        <v-text-field
          v-model="value.production_info.box_office.internationalGbo"
          :placeholder="$t('labels.gboInternational')"
        />
      </v-col>
      <v-col class="pl-md-10" cols="12" md="6"> </v-col>
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
