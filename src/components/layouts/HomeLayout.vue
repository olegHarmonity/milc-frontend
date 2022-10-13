<template>
  <v-app class="home-layout">
    <header class="w-100" style="position: absolute; top: 0">
      <div class="pa-5" style="position: absolute; top: 0; z-index: 2">
        <v-img
          :src="require('@/assets/logos/3d-logo-240.png')"
          max-width="50"
          width="50"
          style="cursor: pointer"
          @click="$route.name === 'home' || $router.push({ name: 'home' })"
        />
      </div>

      <div
        class="pa-5"
        style="position: absolute; top: 0; right: 0; z-index: 2"
      >
        <div v-if="!$user">
          <v-btn color="white" link text :to="{ name: 'auth.login' }">
            {{ $t("buttons.login") }}
          </v-btn>
        </div>

        <div v-else>
          <router-link :to="$platformRoute" class="basic-link">
            {{ $t("common.hello") }}, {{ $fullName($user) }}
          </router-link>
          <v-btn icon link :to="$platformRoute" class="ml-3">
            <v-icon size="40">mdi-account-circle</v-icon>
          </v-btn>
        </div>
      </div>
    </header>

    <v-main>
      <router-view />

      <slot />
    </v-main>

    <v-footer
      style="position: fixed; bottom: 0; right: 155px; background: transparent"
    >
      <small>
        Welt der Wunder &copy; Copyright {{ $dayjs().format("YYYY") }}, All
        Rights Reserved
      </small>
    </v-footer>

    <!-- Feedback dialog -->
    <FeedbackDialog cornered />
  </v-app>
</template>

<script>
import FeedbackDialog from "@/components/common/FeedbackDialog.vue";

export default {
  components: { FeedbackDialog },
};
</script>

<style lang="scss">
.home-layout {
  main {
    background: url("../../assets/images/Background_01.jpg") !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
}
</style>
