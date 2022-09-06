<template>
  <div id="admin-organisations" class="page">
    <!-- Header -->
    <v-row class="page-header">
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $t("org.title") }}</h1>
      </v-col>

      <!-- Search -->
      <v-col class="text-right d-flex justify-end">
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

    <OrganisationsTable :search="searchCopy" class="mt-15" />
  </div>
</template>

<script>
import OrganisationsTable from "@/components/admin/organisations/OrganisationsTable.vue";

export default {
  components: { OrganisationsTable },

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
