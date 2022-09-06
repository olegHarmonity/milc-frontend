<template>
  <div>
    <v-label>{{ $t("labels.title") }}<req /></v-label>
    <v-text-field
      v-model="value.title"
      :rules="[rule.required]"
      maxlength="32"
    />

    <v-label>{{ $t("labels.shortDescription") }}<req /></v-label>
    <v-textarea
      v-model="value.short_description"
      :rules="[rule.required]"
      rows="3"
      maxlength="256"
      outlined
    />

    <v-label>{{ $t("labels.longDescription") }}<req /></v-label>
    <v-textarea
      v-model="value.long_description"
      :rules="[rule.required]"
      rows="6"
      outlined
    />

    <v-label>{{ $t("labels.availableFrom") }}<req /></v-label>
    <date-picker
      v-model="value.available_from_date"
      :rules="[rule.required, rule.date]"
    />

    <v-label>{{ $t("labels.availableUntil") }}<req /></v-label>
    <date-picker
      v-model="value.expiry_date"
      :rules="[rule.required, rule.date]"
    />

    <v-label>{{ $t("labels.availableRights") }}</v-label>
    <chip-select
      v-model="value.available_rights"
      :items="$store.getters['movieRights/items']"
      :loading="$store.getters['movieRights/loading'].fetchAll"
      item-text="name"
      item-value="id"
      multiple
      class="mb-5"
    />

    <v-label>{{ $t("labels.holdbacks") }}</v-label>
    <v-textarea v-model="value.holdbacks" outlined />

    <v-label>{{ $t("labels.territories") }}</v-label>
    <div class="form-box mt-1 pb-3">
      <v-label>{{ $t("labels.worldwide") }}</v-label>
      <multiple-text-field v-model="value.territories.worldwide" />

      <v-label>{{ $t("labels.region") }}</v-label>
      <multiple-text-field v-model="value.territories.region" />

      <v-label>{{ $t("labels.territory") }}</v-label>
      <multiple-text-field v-model="value.territories.territory" />
    </div>

    <div v-if="deletable" class="text-right">
      <v-btn text color="error" @click="$emit('delete')">
        {{ $t("buttons.delete") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    deletable: {
      type: Boolean,
      default: true,
    },
  },

  created() {
    if (!this.value.territories) {
      this.value.territories = {
        worldwide: [],
        region: [],
        territory: [],
      };
    }
  },
};
</script>

<style></style>
