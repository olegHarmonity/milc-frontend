<template>
  <v-data-table
    class="contracts-table row-clickable"
    :headers="headers"
    :items="$store.getters['contracts/items']"
    :items-per-page.sync="per_page"
    :page.sync="page"
    :loading="$store.getters['contracts/loading'].fetchAll"
    :server-items-length="$store.getters['contracts/total']"
    :footer-props="$config.vDataTable.footerProps"
    @update:page="fetchData"
    @update:items-per-page="fetchData"
    @click:row="(item) => rowClick(item)"
    disable-sort
  >
    <!-- Actions menu -->
    <template v-slot:item.actions="{ item }">
      <!-- Download PDF -->
      <v-btn
        @click.stop="
          $store.dispatch('contracts/downloadPdf', item.order.order_number)
        "
        :loading="
          $store.getters['contracts/loading'].downloadPdf ===
          item.order.order_number
        "
        icon
      >
        <v-icon>mdi-file-download-outline</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import i18n from "@/plugins/i18n";

export default {
  components: {},

  props: {
    search: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    per_page: 10,
    page: 1,
    menu: {},
  }),

  computed: {
    headers() {
      return [
        {
          text: i18n.t("labels.order"),
          sortable: false,
          value: "order.order_number",
          width: "130px",
        },
        {
          text: i18n.t("labels.product"),
          sortable: false,
          value: "rights_bundle.product.title",
        },
        {
          text: i18n.t("org.buyer"),
          sortable: false,
          value: "buyer.organisation_name",
        },
        {
          text: i18n.t("org.seller"),
          sortable: false,
          value: "seller.organisation_name",
        },
        {
          text: "",
          sortable: false,
          value: "actions",
          width: "1%",
        },
      ];
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$store.dispatch("contracts/fetchAll", {
        page: this.page,
        per_page: this.per_page,
        "exact_search[is_default]": 0,
        "exact_search[order.contract_accepted]": 1,
      });
    },

    rowClick(item) {
      this.$router.push({
        name: "app.contracts.view",
        params: { id: item.id },
      });
    },
  },
};
</script>

<style lang="scss"></style>
