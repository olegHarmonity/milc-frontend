<template>
  <div class="text-center">
    <h1>{{ $t("forgotPassword.success.heading") }}</h1>
    <v-img
      :src="require(`@/assets/logos/milc-56.png`)"
      width="60"
      class="mx-auto cursor-pointer"
      @click="$router.push({ name: 'home' })"
    />

    <v-img
      :src="require('@/assets/images/check-circle.png')"
      max-width="114"
      class="mx-auto my-15"
    />

    <p>
      {{ $t("forgotPassword.success.text1") }}
      <br />
      {{ $t("forgotPassword.success.text2") }}
    </p>

    <small class="d-block text-center">
      <router-link :to="{ name: 'auth.login' }">
        {{ $t("buttons.returnToLogin") }}
      </router-link>
    </small>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
