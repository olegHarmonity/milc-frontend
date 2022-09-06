<template>
  <div class="text-center">
    <h1>{{ $t("login.denied.heading") }}</h1>

    <v-img
      :src="require('@/assets/images/x-circle.png')"
      max-width="114"
      class="mx-auto my-15"
    />

    <p>
      {{ $t("login.denied.text") }}
    </p>

    <small class="d-block text-center">
      <a @click="$emit('back')">
        {{ $t("buttons.returnToLogin") }}
      </a>
    </small>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
