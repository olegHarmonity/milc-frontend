<template>
  <!-- Loader -->
  <spinner v-if="!contract" large center />

  <!-- Page -->
  <div v-else id="app-contract-template">
    <!-- Header -->
    <v-row class="page-header mb-5">
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $t("contracts.contract") }}</h1>
      </v-col>
    </v-row>

    <ContractsViewer :contract="contract" />
  </div>
</template>

<script>
import ContractsViewer from "@/components/app/contracts/ContractsViewer.vue";

export default {
  components: { ContractsViewer },

  data: () => ({
    contract: null,
  }),

  created() {
    this.$store
      .dispatch("contracts/fetch", this.$route.params.id)
      .then((contract) => {
        this.contract = contract;
      })
      .catch(() => {
        this.$404();
      });
  },
};
</script>

<style></style>
