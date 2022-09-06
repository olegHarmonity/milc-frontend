<template>
  <div class="orders-table">
    <!-- Filters -->
    <div class="table-filters text-right">
      <span>{{ $t("labels.filterBy") }}</span>

      <!-- Date filter -->
      <div class="d-inline-block ml-5" style="width: 250px">
        <date-range-picker
          v-model="filters.date"
          :textFieldAttrs="{
            solo: true,
            placeholder: $t('labels.date'),
          }"
          :on="{
            change: fetchData,
          }"
        />
      </div>

      <v-select
        v-model="filters.state"
        :items="stateItems"
        :placeholder="$t('labels.state')"
        @change="fetchData"
        clearable
        solo
        class="d-inline-block ml-5"
        style="width: 230px"
      />
    </div>

    <!-- Table -->
    <v-row>
      <!-- Table -->
      <v-col class="pr-7">
        <v-data-table
          class="row-clickable"
          :headers="headers"
          :items="$store.getters['orders/items']"
          :items-per-page.sync="per_page"
          :page.sync="page"
          :loading="$store.getters['orders/loading'].fetchAll"
          :server-items-length="$store.getters['orders/total']"
          :item-class="
            (item) =>
              selectedItem && selectedItem.id === item.id ? 'row-selected' : ''
          "
          :footer-props="$config.vDataTable.footerProps"
          @update:page="fetchData"
          @update:items-per-page="fetchData"
          @click:row="(item) => (selectedItem = item)"
          disable-sort
        >
          <!-- Price -->
          <template v-slot:item.price.value="{ item, value }">
            {{ $formatMoney(value, item.price.currency) }}
          </template>

          <!-- Created_at -->
          <template v-slot:item.created_at="{ value }">
            {{ $formatDate(value) }}
          </template>

          <!-- Actions menu -->
          <template v-slot:item.actions="{ item }">
            <!-- Download PDF -->
            <v-btn
              @click.stop="
                $store.dispatch('orders/downloadPdf', item.order_number)
              "
              :loading="
                $store.getters['orders/loading'].downloadPdf ===
                item.order_number
              "
              icon
            >
              <v-icon>mdi-file-download-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>

      <!-- Order preview -->
      <v-col cols="auto" v-if="selectedItem" class="order-preview-col pl-7">
        <OrderPreview :order="selectedItem" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import i18n from "@/plugins/i18n";
import OrderPreview from "./OrderPreview.vue";

export default {
  components: { OrderPreview },

  data: () => ({
    per_page: 10,
    page: 1,
    menu: {},
    filters: {
      date: [],
    },
    selectedItem: null,
  }),

  computed: {
    headers() {
      let headers = [
        {
          text: i18n.t("labels.id"),
          sortable: false,
          value: "order_number",
          width: "120px",
        },
        {
          text: i18n.t("labels.organisation"),
          sortable: false,
          value: "organisation_name",
        },
        {
          text: i18n.t("labels.product"),
          sortable: false,
          value: "rights_bundle.product.title",
        },
        {
          text: i18n.t("labels.price"),
          sortable: false,
          value: "price.value",
        },
        {
          text: i18n.t("labels.date"),
          sortable: false,
          value: "created_at",
          width: "1%",
        },
        {
          text: "",
          sortable: false,
          value: "actions",
          width: "1%",
        },
      ];

      if (!this.isAdmin) {
        headers = headers.filter((i) => i.value !== "organisation_name");
      } else {
        headers = headers.filter((i) => i.value !== "price.value");
      }

      return headers;
    },
    stateItems() {
      return [
        { text: i18n.t("orders.state.new"), value: "new" },
        {
          text: i18n.t("orders.state.contract_denied"),
          value: "contract_denied",
        },
        {
          text: i18n.t("orders.state.payment_failed"),
          value: "payment_failed",
        },
        {
          text: i18n.t("orders.state.awaiting_payment"),
          value: "awaiting_payment",
        },
        { text: i18n.t("orders.state.paid"), value: "paid" },
        { text: i18n.t("orders.state.complete"), value: "complete" },
        { text: i18n.t("orders.state.rejected"), value: "rejected" },
      ];
    },
    isAdmin() {
      return this.$isAdmin(this.$user);
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$store.dispatch("orders/fetchAll", {
        page: this.page,
        per_page: this.per_page,
        "exact_search[state]": this.filters.state,
        "start_date[created_at]": this.filters.date[0] || "",
        "end_date[created_at]": this.filters.date[1] || "",
      });
    },
  },
};
</script>

<style lang="scss">
.orders-table {
  .order-preview-col {
    border-left: 1px solid $border-gray;
  }
}
</style>
