<template>
  <v-app id="app-layout" :class="{ 'clean-layout': cleanLayout }">
    <Navigation v-model="navigation" :cleanLayout="cleanLayout" />

    <HeaderLarge v-if="cleanLayout" @toggle-nav="navigation = !navigation" />

    <HeaderSmall
      v-else
      @toggle-nav="navigation = !navigation"
      :navigation="navigation"
    />

    <!-- Main -->
    <v-main>
      <v-container class="app-container">
        <router-view />
        <slot />

        <!-- Footer -->
        <Footer class="mt-auto" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderSmall from "./app-layout/HeaderSmall.vue";
import HeaderLarge from "./app-layout/HeaderLarge.vue";
import Navigation from "./app-layout/Navigation.vue";
import Footer from "./app-layout/Footer.vue";

export default {
  components: { HeaderSmall, HeaderLarge, Navigation, Footer },

  props: {
    clean: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    navigation: null,
  }),

  computed: {
    cleanLayout() {
      return this.clean || this.$route.meta.cleanLayout === true;
    },
  },

  watch: {
    $route() {
      this.initNavigation();
    },
  },

  created() {
    this.initNavigation();
  },

  methods: {
    initNavigation() {
      if (!this.cleanLayout && document.body.clientWidth >= 1264) {
        this.navigation = true;
      }
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: $app-background;
}

#app-layout {
  background: url("../../assets/images/Background_01.jpg") !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;

  .app-container {
    padding-left: 100px;
    padding-right: 50px;

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      & {
        padding-left: 12px;
        padding-right: 12px;
      }
    }
  }

  &.clean-layout {
    .app-container {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  .v-form {
    label:not(.v-label--active) {
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 1.5px;
    }

    .v-input,
    .v-chip-group {
      padding-top: 0px;
      margin-bottom: 12px;
    }

    .v-select.v-text-field--outlined,
    .v-textarea {
      padding-top: 5px;
    }
  }
}
</style>
