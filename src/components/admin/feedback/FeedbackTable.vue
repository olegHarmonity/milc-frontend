<template>
  <div>
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
        v-model="filters.type"
        :items="types"
        :placeholder="$t('feedback.type')"
        @change="fetchData"
        clearable
        solo
        class="d-inline-block ml-5"
        style="width: 180px"
      />

      <v-select
        v-model="filters.status"
        :items="statuses"
        :placeholder="$t('labels.status')"
        @change="fetchData"
        clearable
        solo
        class="d-inline-block ml-5"
        style="width: 170px"
      />

      <v-checkbox
        v-model="filters.show_archived"
        :label="$t('feedback.showArchived')"
        class="d-inline-block ml-5"
        hide-details
        @change="fetchData"
      />
    </div>

    <v-data-table
      class="feedback-table"
      :headers="headers"
      :items="$store.getters['feedback/items']"
      :items-per-page.sync="per_page"
      :page.sync="page"
      :loading="$store.getters['feedback/loading'].fetchAll"
      :server-items-length="$store.getters['feedback/total']"
      :footer-props="$config.vDataTable.footerProps"
      @update:page="fetchData"
      @update:items-per-page="fetchData"
      show-expand
      single-expand
      disable-sort
    >
      <!-- Expanded -->
      <template v-slot:expanded-item="{ headers, item }">
        <td class="expanded" :colspan="headers.length">
          <div class="d-flex justify-between">
            {{ item.user ? $fullName(item.user) : $t("feedback.anonymous") }}
            &bull;
            {{ $formatDatetime(item.created_at) }}
          </div>
          <div class="formatted-text py-1">{{ item.content }}</div>
        </td>
      </template>

      <!-- User -->
      <template v-slot:item.user="{ value }">
        {{ value ? $fullName(value) : $t("feedback.anonymous") }}
      </template>

      <!-- Type -->
      <template v-slot:item.type="{ value }">
        <FeedbackType :value="value" />
      </template>

      <!-- Status -->
      <template v-slot:item.status="{ item }">
        <v-select
          @change="updateStatus(item, $event)"
          v-model="item.status"
          :items="statuses"
          :loading="$store.getters['orders/loading'].update == item.id"
          :class="'status-' + item.status"
          hide-details
          solo
        />
      </template>

      <!-- Created_at -->
      <template v-slot:item.created_at="{ value }">
        {{ $formatDate(value) }}
      </template>

      <!-- Archive button -->
      <template v-slot:item.archive-button="{ item }">
        <v-btn small fab @click="archive(item)" color="transparent">
          <v-icon>
            {{ item.is_archived ? "mdi-undo-variant" : "mdi-archive-outline" }}
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import i18n from "@/plugins/i18n";
import FeedbackType from "./FeedbackType.vue";

export default {
  components: { FeedbackType },

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
          text: i18n.t("labels.date"),
          sortable: false,
          value: "created_at",
          width: "120px",
        },
        {
          text: i18n.t("labels.user"),
          sortable: false,
          value: "user",
          width: "200px",
        },
        {
          text: i18n.t("labels.type"),
          sortable: false,
          value: "type",
          width: "190px",
        },
        {
          text: i18n.t("labels.status"),
          sortable: false,
          value: "status",
          width: "170px",
        },
        {
          text: i18n.t("labels.content"),
          sortable: false,
          value: "content",
        },
        { text: "", value: "data-table-expand" },
        { text: "", value: "archive-button", width: "1%" },
      ];
    },
    types() {
      return [
        { text: this.$t("feedback.types.general"), value: "general" },
        { text: this.$t("feedback.types.bug"), value: "bug" },
        { text: this.$t("feedback.types.suggestion"), value: "suggestion" },
      ];
    },
    statuses() {
      return [
        { text: this.$t("feedback.statuses.pending"), value: "pending" },
        { text: this.$t("feedback.statuses.done"), value: "done" },
        { text: this.$t("feedback.statuses.todo"), value: "todo" },
      ];
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$store.dispatch("feedback/fetchAll", {
        page: this.page,
        per_page: this.per_page,
        "exact_search[type]": this.filters.type,
        "exact_search[status]": this.filters.status,
        "exact_search[is_archived]": this.filters.show_archived ? null : 0,
        "start_date[created_at]": this.filters.date[0] || "",
        "end_date[created_at]": this.filters.date[1] || "",
      });
    },

    updateStatus(item, status) {
      this.$store
        .dispatch("feedback/update", {
          id: item.id,
          status,
        })
        .then(() => {
          this.$toast.success(this.$t("common.success"));
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },

    archive(item) {
      this.$store
        .dispatch("feedback/update", {
          id: item.id,
          is_archived: item.is_archived ? 0 : 1,
          refresh: true,
        })
        .then(() => {
          this.$toast.success(this.$t("common.success"));
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },
};
</script>

<style lang="scss">
.feedback-table {
  &.v-data-table--mobile {
    td {
      height: unset !important;
    }

    tr {
      td:last-of-type {
        display: none;
      }
    }
  }

  &:not(.v-data-table--mobile) {
    td:not(.expanded) {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
