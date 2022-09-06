<template>
  <v-form v-model="formValid" @submit.prevent="handleNext" autocomplete="off">
    <div class="text-center mb-5">
      <h1>{{ $t("register.user.heading") }}</h1>
      <div class="subtitle-1">
        {{ $t("register.user.subheading") }}
      </div>
    </div>

    <div>
      <v-row>
        <v-col>
          <v-text-field
            v-model="value.first_name"
            :label="$t('labels.firstName')"
            :rules="[rule.required]"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="value.last_name"
            :label="$t('labels.lastName')"
            :rules="[rule.required]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="value.job_title"
            :label="$t('labels.jobTitle')"
            :rules="[rule.required]"
          />
        </v-col>
        <v-col>
          <country-picker
            v-model="value.country"
            :attrs="{
              label: $t('labels.country'),
              rules: [rule.required],
            }"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="value.email"
            :label="$t('labels.email')"
            :rules="[rule.required, rule.email]"
            type="email"
          />
        </v-col>
        <v-col>
          <PhoneInput
            v-model="value.phone_number"
            :label="$t('labels.phone')"
            placeholder=""
            :preferredCountries="['DE', 'US']"
            :rules="[rule.required, rule.phone]"
            mode="international"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <password-field
            v-model="value.password"
            :attrs="{
              label: $t('labels.password'),
              rules: [rule.required, rule.password],
            }"
          />
        </v-col>
        <v-col>
          <password-field
            v-model="value.password_confirmation"
            :attrs="{
              label: $t('labels.passwordConfirm'),
              rules: [
                rule.required,
                rule.same($t('labels.password'), value.password),
              ],
            }"
          />
        </v-col>
      </v-row>
    </div>

    <api-response :response="formResponse" class="mt-3" />

    <div class="text-center mt-5">
      <v-btn
        color="primary"
        width="280"
        :disabled="!formValid"
        :loading="$store.getters['auth/loading'].emailExists"
        type="submit"
      >
        {{ $t("buttons.next") }}
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

  methods: {
    handleNext() {
      this.formResponse = null;
      this.$store.dispatch("auth/emailExists", this.value.email).then((res) => {
        if (!res.data.email_exists) {
          this.$emit("next");
        } else {
          res.data.success = false;
          this.formResponse = res.data;
        }
      });
    },
  },
};
</script>

<style></style>
