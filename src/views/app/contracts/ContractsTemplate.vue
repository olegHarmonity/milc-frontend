<template>
  <!-- Loader -->
  <spinner
    v-if="$store.getters['contracts/loading'].fetchOrganisationDefault"
    large
    center
  />

  <!-- Page -->
  <div v-else id="app-contract-template" class="page">
    <!-- Header -->
    <v-row class="page-header">
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $t("contracts.template") }}</h1>
      </v-col>
    </v-row>

    <!-- Contract text -->
    <div v-if="contractText !== null">
      <ContractsEditor v-model="contractText" />

      <div class="text-right mt-5">
        <v-btn
          color="primary"
          class="px-10"
          :loading="
            $store.getters['contracts/loading'].updateOrganisationDefault
          "
          @click="save(false)"
        >
          {{ $t("buttons.save") }}
        </v-btn>
      </div>
    </div>

    <v-divider class="my-10" />

    <!-- Contract appendix -->
    <div v-if="contractAppendix !== null">
      <h2 class="mb-3">{{ $t("contracts.appendix") }}</h2>

      <ContractsEditor v-model="contractAppendix" />

      <div class="text-right mt-5">
        <v-btn
          color="primary"
          class="px-10"
          :loading="
            $store.getters['contracts/loading'].updateOrganisationDefault
          "
          @click="save(true)"
        >
          {{ $t("buttons.save") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import showdown from "showdown";
import ContractsEditor from "@/components/app/contracts/ContractsEditor.vue";

const converter = new showdown.Converter();

export default {
  components: { ContractsEditor },

  data: () => ({
    contractText: null,
    contractAppendix: null,
  }),

  created() {
    this.$store
      .dispatch("contracts/fetchOrganisationDefault")
      .then((contract) => {
        this.contractText = converter.makeHtml(contract.contract_text);
        this.contractAppendix = converter.makeHtml(contract.contract_appendix);
      })
      .catch(() => {
        this.$404();
      });
  },

  methods: {
    save(appendix = false) {
      const data = appendix
        ? { contract_appendix: converter.makeMarkdown(this.contractAppendix) }
        : { contract_text: converter.makeMarkdown(this.contractText) };
      console.log(appendix, data);

      this.$store
        .dispatch("contracts/updateOrganisationDefault", data)
        .then((data) => {
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },
};
</script>

<style></style>
