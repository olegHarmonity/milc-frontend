<template>
  <div class="mx-auto" style="max-width: 400px">
    <LoginForm
      v-if="step === 'login'"
      :formData="formData"
      @success="handleSuccessLogin"
      @verify="step = '2fa'"
      @fail="handleFailedLogin"
    />

    <Login2FA
      v-if="step === '2fa'"
      :formData="formData"
      @success="handleSuccessLogin"
      @back="step = 'login'"
    />

    <WaitingApproval v-if="step === 'pending'" @back="step = 'login'" />

    <Denied v-if="step === 'denied'" @back="step = 'login'" />

    <EmailVerificationNeeded
      v-if="step === 'not-verified'"
      @back="step = 'login'"
      :email="email"
    />

    <UserInactive v-if="step === 'inactive'" @back="step = 'login'" />
  </div>
</template>

<script>
import LoginForm from "@/components/auth/login/LoginForm.vue";
import Login2FA from "@/components/auth/login/Login2FA.vue";
import WaitingApproval from "@/components/auth/login/WaitingApproval.vue";
import Denied from "@/components/auth/login/Denied.vue";
import EmailVerificationNeeded from "@/components/auth/login/EmailVerificationNeeded.vue";
import UserInactive from "@/components/auth/login/UserInactive.vue";

import { ROLES } from "@/utils/config/constants";

export default {
  components: {
    LoginForm,
    Login2FA,
    WaitingApproval,
    Denied,
    EmailVerificationNeeded,
    UserInactive,
  },

  data: () => ({
    step: "login",
    formData: {},
  }),

  created() {
    this.$store.commit("notifications/CLEAR");
  },

  methods: {
    handleSuccessLogin() {
      const adminLocation = this.$route.query.redirect || { name: "admin" };
      const userLocation = this.$route.query.redirect || { name: "app" };

      this.$router.replace(
        this.$user.role === ROLES.ADMIN ? adminLocation : userLocation
      );
    },

    handleFailedLogin(data) {
      switch (data.error) {
        case "organisation_pending":
          this.step = "pending";
          break;

        case "organisation_declined":
          this.step = "denied";
          break;

        case "not_verified":
          this.email = data.email;
          this.step = "not-verified";
          break;

        case "user_inactive":
          this.step = "inactive";
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style></style>
