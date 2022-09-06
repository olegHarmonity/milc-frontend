<template>
  <div class="notifications-list">
    <!-- Loader -->
    <spinner
      v-if="$store.getters['notifications/loading'].fetchAll"
      large
      center
    />

    <!-- Filters -->
    <div class="table-filters text-right">
      <v-select
        v-model="filter"
        :items="filterItems"
        @change="fetchData"
        solo
        class="d-inline-block ml-5"
        style="width: 200px"
      />
    </div>

    <!-- No notifications alert -->
    <v-alert v-if="isEmpty" type="info" text>
      {{ $t("notifications.noNotifications") }}
    </v-alert>

    <!-- Notifications list -->
    <v-row
      v-else
      v-for="item in $store.getters['notifications/all']"
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
      <v-col>
        <h4>{{ item.title }}</h4>
        <p class="text--secondary">{{ item.message }}</p>
      </v-col>

      <!-- Time -->
      <v-col cols="auto">
        <small
          class="d-block text--secondary"
          :title="$formatDatetime(item.created_at)"
        >
          {{ $dayjs(item.created_at).fromNow() }}
        </small>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <div v-if="!isEmpty" class="d-flex mx-auto mt-5" style="max-width: 400px">
      <v-pagination
        v-model="page"
        class="mx-auto"
        :length="$store.getters['notifications/totalPages']"
        @input="fetchData"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    filter: "all",
    page: 1,
  }),

  computed: {
    filterItems() {
      return [
        { text: this.$t("notifications.all"), value: "all" },
        { text: this.$t("notifications.unread"), value: "unread" },
      ];
    },
    isEmpty() {
      return (
        !this.$store.getters["notifications/all"]?.length &&
        !this.$store.getters["notifications/loading"].fetchAll
      );
    },
  },

  created() {
    this.fetchData();
  },

  destroyed() {
    this.$store.commit("notifications/SET_ALL", null);
  },

  methods: {
    fetchData() {
      const filters = {};

      if (this.filter === "unread") {
        filters["exact_search[is_read]"] = 0;
      }

      this.$store
        .dispatch("notifications/fetchAll", {
          page: this.page,
          per_page: 10,
          ...filters,
        })
        .then(() => {
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        });
    },
    getImage(item) {
      return (
        item.sender?.logo?.image_url || require("@/assets/logos/milc-56.png")
      );
    },
  },
};
</script>

<style></style>
