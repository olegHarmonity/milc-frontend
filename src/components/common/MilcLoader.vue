<template>
  <div class="d-flex flex-column align-center">
    <v-progress-circular indeterminate color="primary" size="250" width="15">
      <v-img
        :src="require('@/assets/logos/3d-logo-text-240.png')"
        max-width="130"
        width="130"
      />
    </v-progress-circular>

    <div class="text-h6 mt-5" style="letter-spacing: 1px !important">
      {{ $t("common.cityLoadingText") }}
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
