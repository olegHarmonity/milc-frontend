<template>
  <div class="text-center">
    <h1>{{ $t("register.success.text1") }}</h1>
    <v-img
      :src="require(`@/assets/logos/milc-56.png`)"
      width="60"
      class="mx-auto cursor-pointer"
      @click="$router.push({ name: 'home' })"
    />

    <v-img
      :src="require('@/assets/images/Approved_01.svg')"
      max-width="114"
      class="mx-auto my-15"
    />

    <div class="mx-auto" style="max-width: 550px">
      <p>
        {{ $t("register.success.text1") }}
        <br />
        {{ $t("register.success.text2") }}
      </p>

      <v-divider class="my-5" />

      <p>
        {{ $t("login.verificationNeeded.text2") }}
      </p>

      <div class="text-center" v-if="showButton">
        <v-btn
          rounded
          color="primary"
          @click="sendVerificationLink"
          :loading="$store.getters['auth/loading'].sendVerificationLink"
        >
          {{ $t("login.verificationNeeded.button") }}
        </v-btn>
      </div>
    </div>
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
        })
        .catch((err) => {
          this.$toast.error(err.data?.error || this.$t("common.error"));
        });
    },
  },
};
</script>

<style></style>
