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
          <v-text-field
            rounded
            outlined
            :label="$t('labels.orgName')"
            v-model="formData.organisation_name"
            :rules="[rule.required]"
          />

          <v-text-field
            rounded
            outlined
            :label="$t('labels.registrationNumber')"
            v-model="formData.registration_number"
            :rules="[rule.required]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" class="pr-md-10">
          <v-select
            rounded
            outlined
            :label="$t('labels.orgType')"
            v-model="formData.organisation_type_id"
            :rules="[rule.required]"
            :items="$store.getters['organisationTypes/items']"
            item-text="name"
            item-value="id"
          />
        </v-col>
        <v-col cols="12" sm="6" class="pl-md-10">
          <v-text-field
            rounded
            outlined
            :label="$t('labels.email')"
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
          <v-textarea
            v-model="formData.description"
            :rules="[rule.required]"
            outlined
            :label="$t('labels.description')"
            rows="5"
            counter="500"
            maxlength="500"
          />
        </v-col>

        <v-col cols="col" class="pl-md-10">
          <p class="mb-3">{{ $t("labels.orgRole") }}<req /></p>
          <!-- <v-btn-toggle
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
          </v-btn-toggle> -->
          <v-item-group
            v-model="formData.organisation_role"
            class="d-flex justify-space-between mb-7"
          >
            <v-item value="buyer" v-slot="{ active, toggle }">
              <v-btn rounded outlined @click="toggle">
                {{ $t("org.buyer") }}
              </v-btn>
            </v-item>

            <v-item value="seller" v-slot="{ active, toggle }">
              <v-btn rounded outlined @click="toggle">
                {{ $t("org.seller") }}
              </v-btn>
            </v-item>
            <v-item value="both" v-slot="{ active, toggle }">
              <v-btn rounded outlined @click="toggle">
                {{ $t("org.both") }}
              </v-btn>
            </v-item>
          </v-item-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" class="pr-md-10">
          <v-text-field
            rounded
            outlined
            :label="$t('labels.address')"
            v-model="formData.address"
            :rules="[rule.required]"
          />
        </v-col>

        <v-col cols="7" sm="6" class="pl-md-10">
          <v-text-field
            rounded
            outlined
            :label="$t('labels.city')"
            v-model="formData.city"
            :rules="[rule.required]"
          />
        </v-col>

        <v-col cols="5" sm="6" class="pr-md-10">
          <v-text-field
            rounded
            outlined
            :label="$t('labels.postalCode')"
            v-model="formData.postal_code"
            :rules="[rule.required]"
          />
        </v-col>

        <v-col cols="12" sm="6" class="pl-md-10">
          <country-picker
            v-model="formData.country"
            v-bind:rounded="true"
            v-bind:outlined="true"
            :attrs="{
              label: $t('labels.country'),
              rules: [rule.required],
            }"
          />
        </v-col>
      </v-row>

      <v-row class="form-box">
        <v-col cols="6" class="pr-md-10">
          <v-text-field
            rounded
            outlined
            :label="$t('labels.website')"
            v-model="formData.website_link"
            :rules="[rule.required, rule.url]"
          />
        </v-col>
        <v-col cols="6" class="pl-md-10">
          <v-text-field
            rounded
            outlined
            :label="$t('labels.facebook')"
            v-model="formData.social_links.facebook"
            :rules="[rule.url]"
          />
        </v-col>
        <v-col cols="6" class="pr-md-10">
          <v-text-field
            rounded
            outlined
            :label="$t('labels.twitter')"
            v-model="formData.social_links.twitter"
            :rules="[rule.url]"
          />
        </v-col>
        <v-col cols="6" class="pl-md-10">
          <v-text-field
            rounded
            outlined
            :label="$t('labels.linkedin')"
            v-model="formData.social_links.linkedin"
            :rules="[rule.url]"
          />
        </v-col>
        <v-col cols="6" class="pr-md-10">
          <v-text-field
            rounded
            outlined
            :label="$t('labels.telegram')"
            v-model="formData.social_links.telegram"
            :rules="[rule.url]"
          />
        </v-col>
      </v-row>
    </div>

    <api-response :response="formResponse" class="mt-3" />

    <div class="text-end mt-5">
      <v-btn
        rounded
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
