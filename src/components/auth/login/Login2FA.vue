<template>
  <v-form @submit.prevent="handleSubmit">
    <!-- Header -->
    <div class="text-center mb-5">
      <h1>{{ $t("login.twoFA.heading") }}</h1>
      <div class="subtitle-1">
        {{ $t("login.twoFA.subheading") }}
      </div>
    </div>

    <!-- Code -->
    <v-otp-input
      v-model="formData.code"
      :disabled="$store.getters['auth/loading'].loginVerify"
      type="number"
      class="my-5"
      @finish="(otp) => (formData.code = otp)"
    />

    <!-- ApiResponse -->
    <api-response :response="formResponse" class="mb-5" />

    <!-- Submit button -->
    <div class="text-center">
      <v-btn
        rounded
        color="primary"
        type="submit"
        :disabled="!isValid"
        :loading="$store.getters['auth/loading'].loginVerify"
        class="px-10"
      >
        {{ $t("buttons.verify") }}
      </v-btn>
    </div>

    <!-- Back to login -->
    <small class="d-block text-center mt-3">
      <a @click="$emit('back')">
        {{ $t("buttons.returnToLogin") }}
      </a>
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
    formResponse: null,
  }),

  computed: {
    isValid() {
      return this.formData.code?.length === 6;
    },
  },

  methods: {
    handleSubmit() {
      this.formResponse = null;
      this.$store
        .dispatch("auth/loginVerify", this.formData)
        .then(() => {
          this.$emit("success");
        })
        .catch((data) => {
          this.formResponse = data;
        });
    },
  },
};
</script>

<style></style>
