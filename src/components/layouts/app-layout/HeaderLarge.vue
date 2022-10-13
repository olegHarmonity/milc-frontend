<template>
  <v-app-bar id="app-header-large" app absolute height="130" elevation="0">
    <v-container>
      <v-row>
        <!-- Left -->
        <v-col cols="1" class="d-flex align-center">
          <!-- Back button -->
          <v-btn icon @click="$goBack()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>

        <!-- Center -->
        <v-col>
          <!-- Logo -->
          <v-img
            :src="require('@/assets/logos/3d-logo-text-240.png')"
            alt="MILC Platform"
            width="110"
            max-width="110"
            class="mx-auto cursor-pointer"
            @click="$router.push({ name: 'home' })"
          />
        </v-col>

        <!-- Right -->
        <v-col cols="2" class="d-flex align-center justify-end">
          <div>
            <router-link
              class="basic-link"
              :to="{
                name: 'app.savedProducts',
              }"
            >
              <v-icon large>mdi-heart </v-icon>
            </router-link>
          </div>

          <v-btn icon link :to="$platformRoute" class="ml-3">
            <v-img
              v-if="logo"
              :src="logo"
              id="user-logo"
              width="30"
              height="30"
              max-width="30"
            ></v-img>
            <v-icon v-else size="40">mdi-account-circle</v-icon>
          </v-btn>

          <v-app-bar-nav-icon @click="$emit('toggle-nav')" />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    logo() {
      if (this.$store.getters["auth/user"].image) {
        return this.$store.getters["auth/user"].image.image_url;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
#app-header-large {
  background: none;

  #user-logo {
    border-radius: 50%;
    display: block;
  }
}
</style>
