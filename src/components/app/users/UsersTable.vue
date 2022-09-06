<template>
  <v-data-table
    class="users-table"
    :headers="headers"
    :items="$store.getters['users/items']"
    :items-per-page.sync="per_page"
    :page.sync="page"
    :loading="$store.getters['users/loading'].fetchAll"
    :server-items-length="$store.getters['users/total']"
    :footer-props="$config.vDataTable.footerProps"
    @update:page="fetchData"
    @update:items-per-page="fetchData"
    disable-sort
  >
    <!-- Image -->
    <template v-slot:item.image="{ item }">
      <v-avatar size="45">
        <v-img :src="getUserImage(item)" alt="User image" />
      </v-avatar>
    </template>

    <!-- Name -->
    <template v-slot:item.name="{ item }">
      {{ $fullName(item) }}
    </template>

    <!-- Created_at -->
    <template v-slot:item.created_at="{ item }">
      {{ $formatDate(item.created_at) }}
    </template>

    <!-- Status -->
    <template v-slot:item.status="{ item }">
      <v-select
        @change="updateStatus(item, $event)"
        v-model="item.status"
        :items="statusItems"
        :loading="$store.getters['users/loading'].update == item.id"
        :readonly="isOrganisationOwner(item)"
        :class="'status-' + item.status"
        hide-details
        solo
      />
    </template>

    <!-- Actions menu -->
    <template v-slot:item.actions="{ item }">
      <v-menu
        v-if="!isOrganisationOwner(item)"
        v-model="menu[item.id]"
        bottom
        left
        close-on-click
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="text-right">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </div>
        </template>

        <v-card width="150">
          <!-- Edit -->
          <UserDialog
            :user="item"
            :button-text="$t('buttons.edit')"
            button-icon="mdi-pencil-outline"
            :button-attrs="{
              class: 'btn-justify-left',
              block: true,
              color: 'transparent',
            }"
            @click="menu[item.id] = false"
          />

          <!-- Delete -->
          <confirm-dialog
            :button-text="$t('buttons.delete')"
            button-icon="mdi-trash-can-outline"
            :button-attrs="{
              class: 'btn-justify-left',
              block: true,
              color: 'transparent',
              loading: $store.getters['users/loading'].delete == item.id,
            }"
            @confirm="deleteUser(item)"
          />
        </v-card>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script>
import i18n from "@/plugins/i18n";
import UserDialog from "./UserDialog.vue";

export default {
  components: { UserDialog },

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
          text: i18n.t("labels.id"),
          sortable: false,
          value: "id",
          width: "1%",
        },
        {
          text: "",
          sortable: false,
          value: "image",
          width: "1%",
        },
        {
          text: i18n.t("labels.name"),
          sortable: false,
          value: "name",
        },
        {
          text: i18n.t("labels.email"),
          sortable: false,
          value: "email",
        },
        {
          text: i18n.t("labels.createdAt"),
          sortable: false,
          value: "created_at",
          width: "175px",
        },
        {
          text: i18n.t("labels.status"),
          sortable: false,
          value: "status",
          width: "170px",
        },
        {
          text: "",
          sortable: false,
          value: "actions",
          width: "1%",
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
  },

  methods: {
    fetchData() {
      this.$store.dispatch("users/fetchAll", {
        page: this.page,
        per_page: this.per_page,
        "search[full_name]": this.search,
      });
    },

    isOrganisationOwner(user) {
      return this.$organisation?.organisation_owner_id === user.id;
    },

    updateStatus(user, status) {
      this.$store
        .dispatch("users/update", {
          id: user.id,
          status,
        })
        .then((data) => {
          user.status = status;
          this.$toast.success(data.message);
        })
        .catch(() => {
          user.status = status == "active" ? "inactive" : "active";
          this.$toast.error(this.$t("common.error"));
        });
    },

    deleteUser(user) {
      this.$store
        .dispatch("users/delete", user.id)
        .then((data) => {
          this.$toast.success(data.message);
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },

    getUserImage(user) {
      return user.image?.image_url || this.$placeholderImage("45x45", "MILC");
    },
  },
};
</script>

<style lang="scss">
.users-table {
  .status-active .v-select__selection {
    color: var(--v-success-darken2);
  }
}
</style>
