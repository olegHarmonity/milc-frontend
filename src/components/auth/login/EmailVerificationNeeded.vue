<template>
  <div class="text-center">
    <h1>{{ $t("login.verificationNeeded.heading") }}</h1>

    <v-img
      :src="require('@/assets/images/clock-circle.png')"
      max-width="114"
      class="mx-auto my-15"
    />

    <p>
      {{ $t("login.verificationNeeded.text1") }}
    </p>

    <v-divider class="my-5" />

    <p>
      {{ $t("login.verificationNeeded.text2") }}
    </p>

    <div class="text-center" v-if="showButton">
      <v-btn
        color="primary"
        @click="sendVerificationLink"
        :loading="$store.getters['auth/loading'].sendVerificationLink"
      >
        {{ $t("login.verificationNeeded.button") }}
      </v-btn>
    </div>

    <small class="d-block text-center mt-3">
      <a @click="$emit('back')">
        {{ $t("buttons.returnToLogin") }}
      </a>
    </small>
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    showButton: true,
  }),

  methods: {
    sendVerificationLink() {
      this.$store
        .dispatch("auth/sendVerificationLink", this.email)
        .then((data) => {
          this.$toast.success(data.message);
          this.showButton = false;
        })
        .catch((err) => {
          this.$toast.error(err.data?.error || this.$t("common.error"));
        });
    },
  },
};
</script>

<style></style>
