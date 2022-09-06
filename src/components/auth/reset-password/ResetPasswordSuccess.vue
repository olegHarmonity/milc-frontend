<template>
  <div class="text-center">
    <h1>{{ $t("resetPassword.success.heading") }}</h1>

    <v-img
      :src="require('@/assets/images/check-circle.png')"
      max-width="114"
      class="mx-auto my-15"
    />

    <p>
      {{ $t("resetPassword.success.text") }}
    </p>

    <v-btn
      color="primary"
      link
      :to="{ name: 'auth.login' }"
      replace
      class="px-15"
    >
      {{ $t("buttons.login") }}
    </v-btn>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
