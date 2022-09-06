<template>
  <div class="mx-auto">
    <ForgotPasswordForm v-if="isForm" @success="isForm = false" />

    <ForgotPasswordSuccess v-else />
  </div>
</template>

<script>
import ForgotPasswordForm from "@/components/auth/forgot-password/ForgotPasswordForm";
import ForgotPasswordSuccess from "@/components/auth/forgot-password/ForgotPasswordSuccess";

export default {
  components: { ForgotPasswordForm, ForgotPasswordSuccess },

  data: () => ({
    isForm: true,
  }),
};
</script>

<style></style>
