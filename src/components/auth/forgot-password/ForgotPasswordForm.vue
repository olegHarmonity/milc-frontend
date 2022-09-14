<template>
  <v-form
    v-model="formValid"
    @submit.prevent="handleSubmit"
    class="mx-auto"
    style="max-width: 480px"
  >
    <div class="text-center mb-5 mx-auto">
      <h1 class="mb-3">{{ $t("forgotPassword.heading") }}</h1>
      <div class="subtitle-1">
        {{ $t("forgotPassword.subheading") }}
      </div>
      <v-img
        :src="require(`@/assets/logos/milc-56.png`)"
        width="60"
        class="mx-auto cursor-pointer"
        @click="$router.push({ name: 'home' })"
      />
    </div>

    <v-row>
      <v-col>
        <v-text-field
          rounded
          outlined
          v-model="formData.email"
          :label="$t('labels.email')"
          :rules="[rule.required, rule.email]"
          type="email"
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
      :loading="$store.getters['auth/loading'].forgotPassword"
      block
      class="mt-8"
    >
      {{ $t("buttons.send") }}
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
      this.$store
        .dispatch("auth/forgotPassword", this.formData)
        .then(() => {
          this.$emit("success");
        })
        .catch((resp) => {
          this.formResponse = resp.data;
        });
    },
  },
};
</script>

<style></style>
