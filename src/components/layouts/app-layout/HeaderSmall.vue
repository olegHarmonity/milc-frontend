<template>
  <v-app-bar id="app-header-small" app absolute height="60" elevation="0">
    <v-container class="app-container">
      <v-row align="center">
        <v-col>
          <!-- Menu icon -->
          <v-app-bar-nav-icon v-if="!navigation" @click="$emit('toggle-nav')" />
        </v-col>

        <v-col cols="auto">
          <!-- Logo -->
          <v-img
            v-if="!navigation"
            class="mx-auto"
            :src="require('@/assets/logos/3d-logo-240.png')"
            width="50"
            max-width="50"
          />
        </v-col>

        <v-col class="text-right">
          <NotificationsModal />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import NotificationsModal from "@/components/app/notifications/NotificationsModal.vue";

export default {
  components: { NotificationsModal },

  props: {
    navigation: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss">
#app-header-small {
  background: none;

  .v-toolbar__content {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
