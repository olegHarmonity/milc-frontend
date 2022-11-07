<template>
  <v-form v-model="formValid" @submit.prevent="handleSubmit" autocomplete="off">
    <div class="text-center mb-5" style="position: relative">
      <v-btn
        icon
        class="mt-5"
        style="position: absolute; left: 0"
        @click="$emit('back')"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <h1 class="ml-10 ml-sm-0">{{ $t("register.org.heading") }}</h1>
      <div class="subtitle-1 ml-10 ml-sm-0">
        {{ $t("register.org.subheading") }}
      </div>
      <v-img
        :src="require(`@/assets/logos/milc-56.png`)"
        width="60"
        class="mx-auto cursor-pointer"
        @click="$router.push({ name: 'home' })"
      />
    </div>

    <div>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            outlined
            rounded
            v-model="value.organisation.organisation_name"
            :label="$t('labels.orgName')"
            :rules="[rule.required]"
            ref="organisationName"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            outlined
            rounded
            :rules="[rule.required]"
            v-model="value.organisation.registration_number"
            :label="$t('labels.registrationNumber')"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <country-picker
            v-bind:rounded="true"
            v-bind:outlined="true"
            v-model="value.organisation.country"
            :attrs="{
              label: $t('labels.country'),
              rules: [rule.required],
              autocomplete: 'new-password',
            }"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            outlined
            rounded
            v-model="value.organisation.organisation_type_id"
            :label="$t('labels.orgType')"
            :rules="[rule.required]"
            :items="$store.getters['organisationTypes/items']"
            item-text="name"
            item-value="id"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            rounded
            outlined
            v-model="value.organisation.email"
            :label="$t('labels.email')"
            :rules="[rule.required, rule.email]"
            type="email"
          />
        </v-col>
        <v-col cols="12" md="6">
          <PhoneInput
            rounded
            outlined
            v-model="value.organisation.telephone_number"
            :label="$t('labels.telephone')"
            placeholder=""
            :preferredCountries="['DE', 'US']"
            :rules="[rule.phone, rule.required]"
            mode="international"
          />
          <!-- <VuePhoneNumberInput
            v-model="value.organisation.telephone_number"
            :border-radius="50"
            :preferredCountries="['DE', 'US']"
            size="lg"
          /> -->
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-textarea
            v-model="value.organisation.description"
            :label="$t('labels.description')"
            :rules="[rule.required]"
            outlined
            rows="6"
            counter="500"
            maxlength="500"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-item-group
            v-model="value.organisation.organisation_role"
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

          <v-text-field
            rounded
            outlined
            class="mb-0"
            v-model="value.organisation.website_link"
            :label="$t('labels.website')"
            :rules="[rule.url]"
          />
          <v-file-input
            v-model="value.organisation.logo"
            :label="$t('labels.orgLogo')"
            accept=".jpg, .jpeg, .png"
            show-size
            prepend-icon=""
            hide-details="auto"
            truncate-length="15"
            class="pt-0 mt-0"
          ></v-file-input>
        </v-col>
      </v-row>
    </div>

    <api-response :response="formResponse" error-only class="mt-3" />

    <div class="text-center mt-5">
      <v-btn
        rounded
        color="primary"
        width="280"
        type="submit"
        :disabled="!formValid"
        :loading="$store.getters['auth/loading'].register"
      >
        {{ $t("buttons.createAccount") }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import PhoneInput from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";
export default {
  components: { PhoneInput },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    formValid: false,
    formResponse: null,
  }),

  mounted() {
    this.$refs.organisationName.focus();
  },

  methods: {
    handleSubmit() {
      this.formResponse = null;
      this.$store
        .dispatch("auth/register", this.value)
        .then(() => {
          this.$emit("next");
        })
        .catch((err) => {
          this.formResponse = err.data;
        });
    },
  },
};
</script>

<style></style>
