<template>
  <v-menu v-model="menu" offset-y left :close-on-content-click="false">
    <!-- Activator -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" fab small>
        <v-icon>mdi-bell-outline</v-icon>
        <v-badge
          v-if="!!$store.getters['notifications/unreadCount']"
          color="primary lighten-2"
          dot
          style="position: absolute; top: 5px; right: 10px"
        />
      </v-btn>
    </template>

    <!-- Card -->
    <v-card
      width="400"
      :loading="
        $store.getters['notifications/loading'].fetchLatest ||
        $store.getters['notifications/loading'].markAllAsRead
      "
      class="mt-2 notifications-modal"
    >
      <!-- Header -->
      <div class="d-flex align-center pr-5">
        <!-- Title -->
        <v-card-title>
          {{ $t("notifications.title") }}
        </v-card-title>

        <v-spacer />

        <!-- Mark all as read button -->
        <a
          v-if="!isEmpty && !!$store.getters['notifications/unreadCount']"
          href="#"
          class="text--secondary"
          @click.prevent="$store.dispatch('notifications/markAllAsRead')"
        >
          {{ $t("notifications.markAllAsRead") }}
        </a>
      </div>

      <v-divider />

      <!-- Main -->
      <v-card-text>
        <!-- No notifications alert -->
        <p v-if="isEmpty" class="text--secondary">
          {{ $t("notifications.noNotifications") }}
        </p>

        <!-- List -->
        <template v-else>
          <v-row
            v-for="item in $store.getters['notifications/latest']"
            :key="item.id"
            align="center"
            class="notification-item"
          >
            <v-col cols="auto" class="pa-0" v-if="!item.is_read">
              <v-btn
                icon
                x-small
                color="primary lighten-2"
                :title="$t('notifications.markAsRead')"
                @click="$store.dispatch('notifications/markAsRead', item.id)"
              >
                <v-icon x-small>mdi-circle</v-icon>
              </v-btn>
            </v-col>

            <!-- Avatar -->
            <v-col cols="auto">
              <v-avatar>
                <v-img :src="getImage(item)" />
              </v-avatar>
            </v-col>

            <!-- Title -->
            <v-col class="pl-0">
              <h4 style="font-weight: normal">{{ item.title }}</h4>
              <small
                class="d-block text--secondary"
                :title="$formatDatetime(item.created_at)"
              >
                {{ $dayjs(item.created_at).fromNow() }}
              </small>
            </v-col>
          </v-row>
        </template>
      </v-card-text>

      <!-- Footer -->
      <v-card-actions v-if="!isEmpty" class="pt-0">
        <v-spacer />
        <router-link
          :to="{ name: 'app.notifications' }"
          @click.native="menu = false"
        >
          {{ $t("buttons.seeAll") }}
        </router-link>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    pollInterval: null,
    menu: false,
  }),

  computed: {
    isEmpty() {
      return (
        !this.$store.getters["notifications/latest"]?.length &&
        !this.$store.getters["notifications/loading"].fetchLatest
      );
    },
  },

  created() {
    this.fetchUnreadCount();
    this.pollInterval = setInterval(
      this.fetchUnreadCount,
      this.$config.notifications.pollInterval
    );
  },

  beforeDestroy() {
    clearInterval(this.pollInterval);
  },

  watch: {
    menu(val) {
      if (val) {
        this.fetchData();
      }
    },
  },

  methods: {
    fetchUnreadCount() {
      this.$store.dispatch("notifications/fetchUnreadCount");
    },
    fetchData() {
      if (this.$store.state.notifications.latest === null) {
        this.$store.dispatch("notifications/fetchLatest", {
          per_page: 5,
        });
      }
    },
    getImage(item) {
      return (
        item.sender?.logo?.image_url || require("@/assets/logos/milc-56.png")
      );
    },
  },
};
</script>

<style lang="scss">
.notifications-modal {
  .notification-item:not(:last-of-type) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
}
</style>
