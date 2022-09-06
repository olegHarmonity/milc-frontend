<template>
  <v-form v-model="formValid" @submit.prevent="handleSubmit">
    <!-- Header -->
    <div class="text-center mb-5">
      <h1>{{ $t("login.heading") }}</h1>
      <div class="subtitle-1">
        {{ $t("login.subheading") }}
      </div>
    </div>

    <v-row>
      <!-- Email -->
      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          :label="$t('labels.email')"
          :rules="[rule.required, rule.email]"
          type="email"
        />
      </v-col>

      <!-- Password -->
      <v-col cols="12">
        <password-field
          v-model="formData.password"
          :attrs="{
            label: $t('labels.password'),
            rules: [rule.required],
          }"
        />
      </v-col>
    </v-row>

    <!-- Forgot password button -->
    <small class="d-block text-right mb-8">
      <router-link :to="{ name: 'auth.forgot-password' }">
        {{ $t("login.forgotPassword") }}
      </router-link>
    </small>

    <!-- ApiResponse -->
    <api-response :response="formResponse" class="mb-5" />

    <!-- Submit button -->
    <v-btn
      color="primary"
      type="submit"
      :disabled="!formValid"
      :loading="$store.getters['auth/loading'].login"
      block
    >
      {{ $t("buttons.login") }}
    </v-btn>

    <!-- Register button -->
    <small class="d-block text-center mt-3">
      {{ $t("login.noAccount") }}
      <router-link :to="{ name: 'auth.register' }">
        {{ $t("buttons.signUp") }}
      </router-link>
    </small>
  </v-form>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    formValid: false,
    formResponse: null,
  }),

  methods: {
    handleSubmit() {
      this.formResponse = null;
      this.$store
        .dispatch("auth/login", this.formData)
        .then(() => {
          this.$emit("verify");
          // this.$emit("success");
        })
        .catch((err) => {
          if (err.error === "invalid_credentials") {
            this.formResponse = {
              message: this.$t("login.loginFailed"),
            };
          } else {
            this.$emit("fail", {
              error: err.error,
              email: this.formData.email,
            });
          }
        });
    },
  },
};
</script>

<style></style>
