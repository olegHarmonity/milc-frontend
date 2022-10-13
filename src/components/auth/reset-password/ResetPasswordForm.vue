<template>
  <v-form
    v-model="formValid"
    @submit.prevent="handleSubmit"
    class="mx-auto"
    style="max-width: 400px"
  >
    <div class="text-center mb-5">
      <h1>{{ $t("resetPassword.heading") }}</h1>
      <div class="subtitle-1">
        {{ $t("resetPassword.subheading") }}
      </div>
      <v-img
        :src="require(`@/assets/logos/milc-56.png`)"
        width="60"
        class="mx-auto cursor-pointer"
        @click="$router.push({ name: 'home' })"
      />
    </div>

    <v-row>
      <v-col cols="12">
        <password-field
          v-model="formData.password"
          :attrs="{
            label: $t('labels.password'),
            rules: [rule.required, rule.password],
          }"
        />
      </v-col>

      <v-col cols="12">
        <password-field
          v-model="formData.password_confirmation"
          :attrs="{
            label: $t('labels.passwordConfirm'),
            rules: [
              rule.required,
              rule.same($t('labels.password'), formData.password),
            ],
          }"
        />
      </v-col>
    </v-row>

    <small class="d-block text-right">
      <router-link :to="{ name: 'auth.login' }">
        {{ $t("buttons.returnToLogin") }}
      </router-link>
    </small>

    <api-response :response="formResponse" class="mt-5" />

    <v-btn
      rounded
      color="primary"
      type="submit"
      :disabled="!formValid"
      :loading="$store.getters['auth/loading'].resetPassword"
      block
      class="mt-8"
    >
      {{ $t("buttons.setNewPassword") }}
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    formData: {},
    formValid: false,
    formResponse: null,
  }),

  methods: {
    handleSubmit() {
      const data = {
        ...this.formData,
        token: this.$route.query.token,
        email: this.$route.params.email,
      };

      this.formResponse = null;
      this.$store
        .dispatch("auth/resetPassword", data)
        .then(() => {
          this.$emit("success");
        })
        .catch((err) => {
          this.formResponse = err.data;
        });
    },
  },
};
</script>

<style></style>
