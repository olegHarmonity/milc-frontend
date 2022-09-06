<template>
  <div>
    <!-- Filters -->
    <div class="table-filters text-right">
      <span>{{ $t("labels.filterBy") }}</span>

      <div class="d-inline-block ml-5" style="width: 240px">
        <date-range-picker
          v-model="filters.date"
          :textFieldAttrs="{
            solo: true,
            placeholder: $t('labels.date'),
            hideDetails: true,
          }"
          :on="{
            change: fetchData,
          }"
          @change="fetchData"
        />
      </div>

      <v-select
        v-model="filters.genre"
        :items="$store.getters['movieGenres/items']"
        :placeholder="$t('labels.genre')"
        @change="fetchData"
        clearable
        item-text="name"
        item-value="id"
        solo
        class="d-inline-block ml-5"
        style="width: 200px"
      />
    </div>

    <v-data-table
      class="products-table row-clickable"
      :headers="headers"
      :items="$store.getters['products/items']"
      :items-per-page.sync="per_page"
      :page.sync="page"
      :loading="$store.getters['products/loading'].fetchAll"
      :server-items-length="$store.getters['products/total']"
      :footer-props="$config.vDataTable.footerProps"
      @update:page="fetchData"
      @update:items-per-page="fetchData"
      @click:row="(item) => rowClick(item)"
      disable-sort
    >
      <!-- Status -->
      <template v-slot:item.status="{ item }">
        <v-select
          @change="updateStatus(item, $event)"
          v-model="item.status"
          :items="statusItems"
          :loading="$store.getters['products/loading'].update == item.id"
          :class="'status-' + item.status"
          hide-details
          solo
          @click.stop
        />
      </template>

      <!-- Created_at -->
      <template v-slot:item.created_at="{ item }">
        {{ $formatDate(item.created_at) }}
      </template>

      <!-- Actions menu -->
      <template v-slot:item.actions="{ item }">
        <v-menu v-model="menu[item.id]" bottom left close-on-click offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div class="text-right">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </template>

          <v-card width="150">
            <!-- Edit -->

            <!-- Delete -->
            <confirm-dialog
              :button-text="$t('buttons.delete')"
              button-icon="mdi-trash-can-outline"
              :button-attrs="{
                class: 'btn-justify-left',
                block: true,
                color: 'transparent',
                loading: $store.getters['products/loading'].delete == item.id,
              }"
              @confirm="deleteProduct(item)"
            />
          </v-card>
        </v-menu>
      </template>
    </v-data-table>
  </div>
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
    filters: {
      date: [],
    },
  }),

  computed: {
    headers() {
      return [
        {
          text: i18n.t("labels.id"),
          sortable: false,
          value: "id",
          width: "1%",
        },
        {
          text: i18n.t("labels.title"),
          sortable: false,
          value: "title",
        },
        {
          text: i18n.t("labels.organisation"),
          sortable: false,
          value: "organisation.organisation_name",
        },
        {
          text: i18n.t("labels.dateAdded"),
          sortable: false,
          value: "created_at",
        },
        {
          text: i18n.t("labels.status"),
          sortable: false,
          value: "status",
          width: "175px",
        },
        {
          text: "",
          sortable: false,
          value: "actions",
          width: "50px",
        },
      ];
    },
    statusItems() {
      return [
        { text: i18n.t("labels.active"), value: "active" },
        { text: i18n.t("labels.inactive"), value: "inactive" },
      ];
    },
  },

  watch: {
    search() {
      this.fetchData();
    },
  },

  created() {
    this.fetchData();
    this.$store.dispatch("movieGenres/fetchAll");
  },

  methods: {
    fetchData() {
      this.$store.dispatch("products/fetchAll", {
        page: this.page,
        per_page: this.per_page,
        "exact_search[genres.movie_genre_id]": this.filters.genre,
        "search[title]": this.search,
        "start_date[created_at]": this.filters.date[0] || "",
        "end_date[created_at]": this.filters.date[1] || "",
      });
    },

    updateStatus(product, status) {
      this.$store
        .dispatch("products/changeStatus", {
          id: product.id,
          status,
        })
        .then((data) => {
          product.status = status;
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch(() => {
          product.status = status == "active" ? "inactive" : "active";
          this.$toast.error(this.$t("common.error"));
        });
    },

    deleteProduct(product) {
      this.$store
        .dispatch("products/delete", product.id)
        .then((data) => {
          this.$toast.success(data.message);
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },

    rowClick(item) {
      this.$router.push({
        name: "app.products.view",
        params: { id: item.id },
      });
    },
  },
};
</script>

<style lang="scss"></style>
