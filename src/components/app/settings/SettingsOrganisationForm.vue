<template>
  <v-form v-model="formValid" @submit.prevent="handleSubmit">
    <div>
      <v-row>
        <v-col cols="12" sm="auto">
          <image-field
            v-model="formData.logo"
            hide-input
            width="150"
            height="150"
          ></image-field>
        </v-col>

        <v-col>
          <v-label>{{ $t("labels.orgName") }}<req /></v-label>
          <v-text-field
            v-model="formData.organisation_name"
            :rules="[rule.required]"
          />

          <v-label>{{ $t("labels.registrationNumber") }}<req /></v-label>
          <v-text-field
            v-model="formData.registration_number"
            :rules="[rule.required]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" class="pr-md-10">
          <v-label>{{ $t("labels.orgType") }}<req /></v-label>
          <v-select
            v-model="formData.organisation_type_id"
            :rules="[rule.required]"
            :items="$store.getters['organisationTypes/items']"
            item-text="name"
            item-value="id"
          />
        </v-col>
        <v-col cols="12" sm="6" class="pl-md-10">
          <v-label>{{ $t("labels.email") }}<req /></v-label>
          <v-text-field
            v-model="formData.email"
            :rules="[rule.required, rule.email]"
            type="email"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" class="pr-md-10">
          <v-label>{{ $t("labels.telephone") }}</v-label>
          <PhoneInput
            v-model="formData.telephone_number"
            label=""
            placeholder=""
            :preferredCountries="['DE', 'US']"
            :rules="[rule.phone]"
            mode="international"
            disabledFetchingCountry
          />
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
        <v-col cols="12" md="6" class="pr-md-10">
          <v-label>{{ $t("labels.description") }}<req /></v-label>
          <v-textarea
            v-model="formData.description"
            :rules="[rule.required]"
            outlined
            rows="5"
            counter="500"
            maxlength="500"
          />
        </v-col>

        <v-col cols="col" class="pl-md-10">
          <v-label>{{ $t("labels.orgRole") }}<req /></v-label>
          <v-btn-toggle
            v-model="formData.organisation_role"
            mandatory
            class="w-100 mb-10 mt-1"
          >
            <v-btn value="buyer" class="w-33">
              {{ $t("org.buyer") }}
            </v-btn>

            <v-btn value="seller" class="w-33">
              {{ $t("org.seller") }}
            </v-btn>

            <v-btn value="both" class="w-33">
              {{ $t("org.both") }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
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

      <v-row class="form-box">
        <v-col cols="6" class="pr-md-10">
          <v-label>{{ $t("labels.website") }}<req /></v-label>
          <v-text-field
            v-model="formData.website_link"
            :rules="[rule.required, rule.url]"
          />
        </v-col>
        <v-col cols="6" class="pl-md-10">
          <v-label>{{ $t("labels.facebook") }}</v-label>
          <v-text-field
            v-model="formData.social_links.facebook"
            :rules="[rule.url]"
          />
        </v-col>
        <v-col cols="6" class="pr-md-10">
          <v-label>{{ $t("labels.twitter") }}</v-label>
          <v-text-field
            v-model="formData.social_links.twitter"
            :rules="[rule.url]"
          />
        </v-col>
        <v-col cols="6" class="pl-md-10">
          <v-label>{{ $t("labels.linkedin") }}</v-label>
          <v-text-field
            v-model="formData.social_links.linkedin"
            :rules="[rule.url]"
          />
        </v-col>
        <v-col cols="6" class="pr-md-10">
          <v-label>{{ $t("labels.telegram") }}</v-label>
          <v-text-field
            v-model="formData.social_links.telegram"
            :rules="[rule.url]"
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
        :loading="$store.getters['auth/loading'].updateOrganisation"
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
    formData: {
      address: "",
      city: "",
      country: "",
      description: "",
      email: "",
      logo: null,
      organisation_name: "",
      organisation_role: "",
      organisation_type_id: null,
      phone_number: "",
      postal_code: "",
      registration_number: "",
      social_links: {},
      telephone_number: "",
      website_link: "",
    },
    formValid: false,
    formResponse: null,
    originalData: null,
  }),

  created() {
    this.initData();
    this.$store.dispatch("organisationTypes/fetchAll");
  },

  methods: {
    handleSubmit() {
      this.formResponse = null;
      this.$store
        .dispatch(
          "auth/updateOrganisation",
          this.$diff(this.originalData, this.formData, ["social_links"])
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
      for (const key in this.formData) {
        if (Object.hasOwnProperty.call(this.formData, key)) {
          this.formData[key] = this.$organisation[key];
        }
      }

      if (!this.formData.social_links) {
        this.formData.social_links = {};
      }

      this.originalData = this.$deepCopy(this.formData);
    },
  },
};
</script>

<style></style>
