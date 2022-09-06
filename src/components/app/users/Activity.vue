<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page.sync="per_page"
    :page.sync="page"
    :loading="$store.getters['users/loading'].fetchActivity"
    :server-items-length="total"
    :footer-props="$config.vDataTable.footerProps"
    @update:page="fetchData"
    @update:items-per-page="fetchData"
    class="user-activity"
    dense
    disable-sort
  >
    <!-- Created_at -->
    <template v-slot:item.created_at="{ item }">
      {{ $formatDatetime(item.created_at) }}
    </template>

    <!-- Activity -->
    <template v-slot:item.activity="{ item }">
      {{ $t(`activities.${item.activity}`) }}
    </template>
  </v-data-table>
</template>

<script>
import i18n from "@/plugins/i18n";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    data: [],
    per_page: 10,
    page: 1,
    total: 0,
  }),

  computed: {
    headers() {
      return [
        {
          text: i18n.t("labels.date"),
          sortable: false,
          value: "created_at",
          width: "150px",
        },
        {
          text: i18n.t("labels.activity"),
          sortable: false,
          value: "activity",
        },
      ];
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$store
        .dispatch("users/fetchActivity", {
          id: this.user.id,
          page: this.page,
          per_page: this.per_page,
        })
        .then((data) => {
          this.data = data.data;
          this.total = data.total;
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },
};
</script>

<style lang="scss">
.user-activity {
}
</style>
