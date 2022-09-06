<template>
  <v-form v-model="formValid" @submit.prevent="handleSubmit">
    <div>
      <v-row>
        <v-col cols="12" sm="auto">
          <image-field
            v-model="formData.image"
            hide-input
            width="150"
            height="150"
          ></image-field>
        </v-col>

        <v-col>
          <v-label>{{ $t("labels.firstName") }}<req /></v-label>
          <v-text-field
            v-model="formData.first_name"
            :rules="[rule.required]"
          />

          <v-label>{{ $t("labels.lastName") }}<req /></v-label>
          <v-text-field v-model="formData.last_name" :rules="[rule.required]" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" class="pr-md-10">
          <v-label>{{ $t("labels.email") }}<req /></v-label>
          <v-text-field v-model="formData.email" readonly type="email" />
        </v-col>
        <v-col cols="12" sm="6" class="pl-md-10">
          <v-label>{{ $t("labels.phone") }}<req /></v-label>
          <PhoneInput
            v-model="formData.phone_number"
            label=""
            placeholder=""
            :preferredCountries="['DE', 'US']"
            :rules="[rule.required, rule.phone]"
            mode="international"
            disabledFetchingCountry
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pr-md-10">
          <v-label>{{ $t("labels.jobTitle") }}</v-label>
          <v-text-field v-model="formData.job_title" />
        </v-col>
        <v-col class="pl-md-10"></v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" class="pr-md-10">
          <v-label>{{ $t("labels.address") }}<req /></v-label>
          <v-text-field v-model="formData.address" :rules="[rule.required]" />
        </v-col>

        <v-col cols="7" sm="6" class="pl-md-10">
          <v-label>{{ $t("labels.city") }}<req /></v-label>
          <v-text-field v-model="formData.city" :rules="[rule.required]" />
        </v-col>

        <v-col cols="5" sm="6" class="pr-md-10">
          <v-label>{{ $t("labels.postalCode") }}<req /></v-label>
          <v-text-field
            v-model="formData.postal_code"
            type="number"
            :rules="[rule.required]"
          />
        </v-col>

        <v-col cols="12" sm="6" class="pl-md-10">
          <v-label>{{ $t("labels.country") }}<req /></v-label>
          <country-picker
            v-model="formData.country"
            :attrs="{
              rules: [rule.required],
            }"
          />
        </v-col>
      </v-row>
    </div>

    <api-response :response="formResponse" class="mt-3" />

    <div class="text-end mt-5">
      <v-btn
        color="primary"
        width="200"
        :disabled="!formValid"
        :loading="$store.getters['auth/loading'].updateUser"
        type="submit"
      >
        {{ $t("buttons.save") }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import PhoneInput from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";

export default {
  components: { PhoneInput },

  data: () => ({
    formData: {},
    formValid: false,
    formResponse: null,
    originalData: null,
  }),

  created() {
    this.initData();
  },

  methods: {
    handleSubmit() {
      this.formResponse = null;
      this.$store
        .dispatch(
          "auth/updateUser",
          this.$diff(this.originalData, this.formData)
        )
        .then((data) => {
          this.$toast.success(data.message || this.$t("common.success"));
          this.initData();
        })
        .catch((err) => {
          this.formResponse = err.data;
        });
    },

    initData() {
      const data = this.$deepCopy(this.$user);
      delete data.organisation;

      this.originalData = this.$deepCopy(data);
      this.formData = data;
    },
  },
};
</script>

<style></style>
