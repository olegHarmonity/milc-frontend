<template>
  <v-data-table
    class="admin-users-table row-clickable"
    :headers="headers"
    :items="$store.getters['users/items']"
    :items-per-page.sync="per_page"
    :page.sync="page"
    :loading="$store.getters['users/loading'].fetchAll"
    :server-items-length="$store.getters['users/total']"
    :footer-props="$config.vDataTable.footerProps"
    @update:page="fetchData"
    @update:items-per-page="fetchData"
    @click:row="(item) => rowClick(item)"
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

    <!-- Organisation -->
    <template v-slot:item.organisation="{ item }">
      {{ item.organisation ? item.organisation.organisation_name : "" }}
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
        @click.stop
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
            v-if="!$isAdmin(item)"
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
import UserDialog from "@/components/app/users/UserDialog.vue";

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
          text: i18n.t("labels.organisation"),
          sortable: false,
          value: "organisation",
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

    rowClick(item) {
      this.$router.push({
        name: "admin.users.view",
        params: { id: item.id },
      });
    },

    getUserImage(user) {
      return user.image?.image_url || this.$placeholderImage("45x45", "MILC");
    },
  },
};
</script>

<style lang="scss"></style>
