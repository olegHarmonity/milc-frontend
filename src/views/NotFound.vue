<template>
  <AppLayout clean>
    <v-card
      class="pa-10 mt-10 mx-auto rounded-lg text-center"
      style="max-width: 800px"
    >
      <v-icon size="150">mdi-emoticon-sad-outline</v-icon>

      <h1 class="text-center mt-5">{{ $t("notFound.title") }}</h1>

      <p class="text-center formatted-text my-6">{{ $t("notFound.text") }}</p>

      <v-btn color="primary" width="150" @click="$goBack()" class="mx-2 mt-2">
        {{ $t("buttons.back") }}
      </v-btn>

      <v-btn color="primary" width="150" to="/" class="mx-2 mt-2">
        {{ $t("buttons.homepage") }}
      </v-btn>
    </v-card>
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layouts/AppLayout.vue";

export default {
  components: { AppLayout },
};
</script>

<style></style>
