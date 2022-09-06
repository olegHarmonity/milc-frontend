<template>
  <div class="mx-auto">
    <ResetPasswordForm v-if="isForm" @success="isForm = false" />

    <ResetPasswordSuccess v-else />
  </div>
</template>

<script>
import ResetPasswordForm from "@/components/auth/reset-password/ResetPasswordForm";
import ResetPasswordSuccess from "@/components/auth/reset-password/ResetPasswordSuccess";

export default {
  components: { ResetPasswordForm, ResetPasswordSuccess },

  data: () => ({
    isForm: true,
  }),
};
</script>

<style></style>
