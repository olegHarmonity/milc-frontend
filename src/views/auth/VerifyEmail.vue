<template>
  <div class="mx-auto">
    <spinner v-if="$store.getters['auth/loading'].verifyEmail" large center />

    <template v-else>
      <template v-if="emailVerified">
        <EmailVerified v-if="emailVerified" />
      </template>

      <template v-else>
        <h1 class="text-center">{{ $t("common.error") }}</h1>

        <v-img
          :src="require('@/assets/images/x-circle.png')"
          max-width="114"
          class="mx-auto my-10"
        />

        <div class="mx-auto" style="max-width: 400px">
          <api-response :response="formResponse" class="mx-auto text-center" />

          <p>
            {{ $t("login.verificationNeeded.text2") }}
          </p>

          <div class="text-center">
            <v-btn color="primary">
              {{ $t("login.verificationNeeded.button") }}
            </v-btn>
          </div>
        </div>
      </template>

      <small class="d-block text-center mt-3">
        <router-link :to="{ name: 'auth.login' }">
          {{ $t("buttons.returnToLogin") }}
        </router-link>
      </small>
    </template>
  </div>
</template>

<script>
import EmailVerified from "@/components/auth/register/EmailVerified.vue";

export default {
  components: { EmailVerified },

  data: () => ({
    formResponse: {},
    emailVerified: false,
  }),

  mounted() {
    this.$store
      .dispatch("auth/verifyEmail", this.$route.params.token)
      .then((data) => {
        this.emailVerified = true;
        this.$toast.success(data.message);
      })
      .catch((err) => {
        this.formResponse = err.data;
      });
  },
};
</script>

<style></style>
