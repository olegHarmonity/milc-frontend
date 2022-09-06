<template>
  <div id="admin-users" class="page">
    <!-- Header -->
    <v-row class="page-header">
      <!-- Title -->
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $t("users.title") }}</h1>
      </v-col>

      <!-- Add button & Search -->
      <v-col class="text-right d-flex justify-end">
        <UserDialog
          :button-text="$t('buttons.addUser')"
          :button-attrs="{ color: 'primary' }"
        />

        <v-text-field
          v-model="search"
          v-debounce="triggerSearch"
          :placeholder="$t('labels.search')"
          class="ml-5"
          style="max-width: 300px"
          append-icon="mdi-magnify"
          height="44"
          solo
          dense
          hide-details
        />
      </v-col>
    </v-row>

    <!-- Loader -->
    <spinner
      v-if="$store.getters['products/loading'].fetchMyProducts && false"
      large
      center
    />

    <!-- Product list -->
    <template v-else>
      <UsersTable :search="searchCopy" class="mt-15" />
    </template>
  </div>
</template>

<script>
import UsersTable from "@/components/admin/users/UsersTable.vue";
import UserDialog from "@/components/app/users/UserDialog.vue";

export default {
  components: { UsersTable, UserDialog },

  data: () => ({
    search: "",
    searchCopy: "",
  }),

  methods: {
    triggerSearch() {
      if (this.search != "" && this.search.length < 3) {
        return;
      }

      this.searchCopy = this.search;
    },
  },
};
</script>

<style></style>
