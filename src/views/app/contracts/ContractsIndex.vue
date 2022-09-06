<template>
  <div id="app-contracts" class="page">
    <!-- Header -->
    <v-row class="page-header mb-15">
      <v-col cols="12" md="auto">
        <h1 class="page-title">
          {{ $t("contracts.contracts") }}
          <tooltip bottom :text="$t('contracts.listTooltipText')" />
        </h1>
      </v-col>

      <v-col class="text-right">
        <v-btn
          v-if="$isSeller()"
          color="primary"
          link
          :to="{ name: 'app.contracts.template' }"
        >
          <v-icon left>mdi-file-document-edit-outline</v-icon>
          {{ $t("contracts.template") }}
        </v-btn>
      </v-col>
    </v-row>

    <ContractsTable />
  </div>
</template>

<script>
import ContractsTable from "@/components/app/contracts/ContractsTable.vue";

export default {
  components: { ContractsTable },

  data: () => ({}),
};
</script>

<style></style>
