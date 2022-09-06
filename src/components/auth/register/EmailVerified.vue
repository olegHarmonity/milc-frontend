<template>
  <div class="text-center">
    <h1>{{ $t("register.verified.heading") }}</h1>

    <v-img
      :src="require('@/assets/images/check-circle.png')"
      max-width="114"
      class="mx-auto my-15"
    />

    <p class="mx-auto" style="max-width: 500px">
      {{ $t("register.verified.text1") }}
      <br />
      {{ $t("register.verified.text2") }}
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
