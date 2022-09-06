<template>
  <div>
    <!-- Filters -->
    <div class="table-filters text-right">
      <span>{{ $t("labels.filterBy") }}</span>

      <!-- Date filter -->
      <!-- <div class="d-inline-block ml-5" style="width: 210px">
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
      </div> -->

      <v-select
        v-model="filters.status"
        :items="statusItems"
        :placeholder="$t('labels.status')"
        @change="fetchData"
        clearable
        solo
        class="d-inline-block ml-5"
        style="width: 200px"
      />
    </div>

    <v-data-table
      class="organisations-table row-clickable"
      :headers="headers"
      :items="$store.getters['organisations/items']"
      :items-per-page.sync="per_page"
      :page.sync="page"
      :loading="$store.getters['organisations/loading'].fetchAll"
      :server-items-length="$store.getters['organisations/total']"
      :footer-props="$config.vDataTable.footerProps"
      @update:page="fetchData"
      @update:items-per-page="fetchData"
      @click:row="(item) => rowClick(item)"
      disable-sort
    >
      <!-- Logo -->
      <!-- <template v-slot:item.logo="{ item }">
        <v-img
          :src="getOrganisationImage(item)"
          max-width="50px"
          max-height="50px"
          @error="
            item.logo.image_url =
              'https://via.placeholder.com/50x50/555555?text=MILC'
          "
          class="rounded-lg"
        />
      </template> -->

      <!-- Role -->
      <template v-slot:item.organisation_role="{ item }">
        {{
          item.organisation_role == "both"
            ? $t("org.buyerAndSeller")
            : $t(`org.${item.organisation_role}`)
        }}
      </template>

      <!-- Status -->
      <template v-slot:item.status="{ item }">
        <v-select
          @change="updateStatus(item, $event)"
          @click.stop
          v-model="item.status"
          :items="statusItems"
          :loading="$store.getters['organisations/loading'].update == item.id"
          :class="'status-' + item.status"
          hide-details
          solo
        />
      </template>

      <!-- Created_at -->
      <template v-slot:item.created_at="{ item }">
        {{ $formatDate(item.created_at) }}
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
        // {
        //   text: "",
        //   sortable: false,
        //   value: "logo",
        //   width: "50px",
        // },
        {
          text: i18n.t("labels.name"),
          sortable: false,
          value: "organisation_name",
        },
        {
          text: i18n.t("labels.role"),
          sortable: false,
          value: "organisation_role",
        },
        {
          text: i18n.t("labels.type"),
          sortable: false,
          value: "organisation_type.name",
        },
        {
          text: i18n.t("labels.registered"),
          sortable: false,
          value: "created_at",
          align: "center",
          width: "150px",
        },
        {
          text: i18n.t("labels.status"),
          sortable: false,
          value: "status",
          width: "200px",
        },
      ];
    },
    statusItems() {
      return [
        { text: i18n.t("labels.pending"), value: "pending" },
        { text: i18n.t("labels.accepted"), value: "accepted" },
        { text: i18n.t("labels.declined"), value: "declined" },
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
    this.$store.dispatch("organisationTypes/fetchAll");
  },

  methods: {
    fetchData() {
      this.$store.dispatch("organisations/fetchAll", {
        page: this.page,
        per_page: this.per_page,
        "exact_search[status]": this.filters.status,
        "search[organisation_name]": this.search,
        // "start_date[created_at]": this.filters.date[0] || "",
        // "end_date[created_at]": this.filters.date[1] || "",
      });
    },

    updateStatus(organisation, status) {
      this.$store
        .dispatch("organisations/updateStatus", {
          id: organisation.id,
          status,
        })
        .then((data) => {
          organisation.status = status;
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },

    getOrganisationImage(organisation) {
      return (
        organisation.logo?.image_url || this.$placeholderImage("50x50", "MILC")
      );
    },

    rowClick(item) {
      this.$router.push({
        name: "admin.organisations.view",
        params: { id: item.id },
      });
    },
  },
};
</script>

<style lang="scss"></style>
