<template>
  <div>
    <!-- <v-label>{{ $t("labels.image") }}</v-label> -->
    <image-field
      v-model="value.image"
      width="100"
      height="100"
      circle
      aside
      hide-input
    />

    <v-row>
      <v-col>
        <v-label>{{ $t("labels.firstName") }}<req /></v-label>
        <v-text-field v-model="value.first_name" :rules="[rule.required]" />
      </v-col>
      <v-col>
        <v-label>{{ $t("labels.lastName") }}<req /></v-label>
        <v-text-field v-model="value.last_name" :rules="[rule.required]" />
      </v-col>
    </v-row>

    <v-label>{{ $t("labels.email") }}<req /></v-label>
    <v-text-field
      v-model="value.email"
      :rules="[rule.required, rule.email]"
      type="email"
      autocomplete="off"
    />

    <v-label>{{ $t("labels.phone") }}</v-label>
    <PhoneInput
      v-model="value.phone"
      label=""
      placeholder=""
      :preferredCountries="['DE', 'US']"
      :rules="[rule.phone]"
      mode="international"
      disabledFetchingCountry
    />

    <template v-if="asAdmin && !isUpdate">
      <v-label>{{ $t("labels.organisation") }}<req /></v-label>
      <v-autocomplete
        v-model="value.organisation_id"
        :items="$store.getters['organisations/items']"
        item-text="organisation_name"
        item-value="id"
        :rules="[rule.required]"
      ></v-autocomplete>
    </template>

    <v-row v-if="!isUpdate">
      <v-col>
        <v-label>{{ $t("labels.password") }}<req /></v-label>
        <password-field
          v-model="value.password"
          :attrs="{
            rules: [rule.required, rule.password],
            autocomplete: 'new-password',
          }"
        />
      </v-col>
      <v-col>
        <v-label>{{ $t("labels.passwordConfirm") }}<req /></v-label>
        <password-field
          v-model="value.password_confirmation"
          :attrs="{
            rules: [
              rule.required,
              rule.same($t('labels.password'), this.value.password),
            ],
          }"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PhoneInput from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";

export default {
  components: { PhoneInput },

  props: {
    value: {
      type: Object,
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
    asAdmin: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    this.$store.dispatch("organisations/fetchAll", {
      per_page: 9999,
      "sort[organisation_name]": "ASC",
    });
  },
};
</script>

<style></style>
