<template>
  <v-navigation-drawer
    id="app-navigation"
    v-model="navigation"
    app
    :temporary="cleanLayout"
  >
    <!-- Logo -->
    <v-img
      :src="require('@/assets/logos/3d-logo-text-240.png')"
      max-width="150"
      width="150"
      class="mx-auto mb-5 cursor-pointer"
      @click="$router.push({ name: 'home' })"
    />

    <!-- Navigation items -->
    <div class="d-flex flex-column">
      <!-- Routes -->
      <template v-for="item in menu">
        <v-btn
          class="nav-item px-5 py-7 mx-7"
          v-if="item.visible"
          :key="item.text"
          :to="{ name: item.route }"
        >
          <v-icon left size="24" class="mr-3">
            {{ item.icon }}
          </v-icon>

          {{ $t(item.text) }}
        </v-btn>
      </template>

      <!-- Logout button -->
      <v-btn
        class="nav-item px-5 py-7 mx-7"
        @click="handleLogout"
        :loading="$store.getters['auth/loading'].logout"
      >
        <v-icon left size="24" class="mr-3"> mdi-logout </v-icon>
        {{ $t("buttons.logout") }}
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { ROLES } from "@/utils/config/constants";

export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    cleanLayout: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    navigation: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },

    menu() {
      return this.$user?.role == ROLES.ADMIN ? this.adminMenu : this.appMenu;
    },

    appMenu() {
      return [
        {
          text: "menu.products",
          route: "app.products",
          icon: "mdi-movie-open-outline",
          visible: this.$isSeller(this.$organisation),
        },
        {
          text: "menu.orders",
          route: "app.orders",
          icon: "mdi-chart-box-outline",
          visible: true,
        },
        {
          text: "menu.savedProducts",
          route: "app.savedProducts",
          icon: "mdi-heart-outline",
          visible: this.$isBuyer(this.$organisation),
        },
        {
          text: "menu.settings",
          route: "app.settings",
          icon: "mdi-cog-outline",
          visible: true,
        },
        {
          text: "menu.users",
          route: "app.users",
          icon: "mdi-account-outline",
          visible: this.$user?.role == ROLES.ORGANISATION_ADMIN,
        },
        {
          text: "menu.messages",
          route: "app.messages",
          icon: "mdi-message-processing-outline",
          visible: true,
        },
        {
          text: "menu.contracts",
          route: "app.contracts",
          icon: "mdi-file-document-multiple-outline",
          visible: true,
        },
      ];
    },

    adminMenu() {
      return [
        {
          text: "menu.dashboard",
          route: "admin.dashboard",
          icon: "mdi-view-dashboard-outline",
          visible: true,
        },
        {
          text: "menu.organisations",
          route: "admin.organisations",
          icon: "mdi-city-variant-outline",
          visible: true,
        },
        {
          text: "menu.users",
          route: "admin.users",
          icon: "mdi-account-outline",
          visible: true,
        },
        {
          text: "menu.orders",
          route: "admin.orders",
          icon: "mdi-chart-box-outline",
          visible: true,
        },
        // {
        //   text: "menu.accounting",
        //   route: "admin.accounting",
        //   icon: "mdi-bank-outline",
        //   visible: true,
        // },
        // {
        //   text: "menu.turnovers",
        //   route: "admin.turnovers",
        //   icon: "mdi-chart-line",
        //   visible: true,
        // },
        {
          text: "menu.products",
          route: "admin.products",
          icon: "mdi-package-variant-closed",
          visible: true,
        },
        {
          text: "menu.categories",
          route: "admin.categories",
          icon: "mdi-folder-outline",
          visible: true,
        },
        // {
        //   text: "menu.frontend",
        //   route: "admin.frontend",
        //   icon: "mdi-view-dashboard-outline",
        //   visible: true,
        // },
        {
          text: "menu.people",
          route: "admin.people",
          icon: "mdi-account-box-outline",
          visible: true,
        },
        // {
        //   text: "menu.settings",
        //   route: "admin.settings",
        //   icon: "mdi-cog-outline",
        //   visible: true,
        // },
        {
          text: "menu.feedback",
          route: "admin.feedback",
          icon: "mdi-comment-edit-outline",
          visible: true,
        },
        {
          text: "menu.settings",
          route: "admin.settings",
          icon: "mdi-cog-outline",
          visible: true,
        },
        {
          text: "menu.contracts",
          route: "admin.contracts",
          icon: "mdi-file-document-multiple-outline",
          visible: true,
        },
      ];
    },
  },

  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout").finally(() => {
        this.$router.replace({ name: "home" });
      });
    },
  },
};
</script>

<style lang="scss">
#app-navigation {
  background-color: $app-background;
  padding-top: 40px;

  .nav-item {
    justify-content: start;
    font-size: 18px;
    background-color: transparent;

    &:before {
      opacity: 0;
    }

    &.v-btn--active {
      background-color: var(--v-primary-base);
    }
  }
}
</style>
