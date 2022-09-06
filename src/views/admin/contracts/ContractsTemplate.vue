<template>
  <!-- Loader -->
  <spinner
    v-if="$store.getters['contracts/loading'].fetchAdminDefault"
    large
    center
  />

  <!-- Page -->
  <div v-else id="admin-contract-template" class="page">
    <!-- Header -->
    <v-row class="page-header">
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $t("contracts.template") }}</h1>
      </v-col>
    </v-row>

    <ContractsEditor v-if="contractText" v-model="contractText" />

    <div class="text-right mt-5">
      <v-btn
        color="primary"
        class="px-10"
        :loading="$store.getters['contracts/loading'].updateAdminDefault"
        @click="save"
      >
        {{ $t("buttons.save") }}
      </v-btn>
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
  }),

  created() {
    this.$store
      .dispatch("contracts/fetchAdminDefault")
      .then((contract) => {
        this.contractText = converter.makeHtml(contract.contract_text_part_2);
      })
      .catch(() => {
        this.$404();
      });
  },

  methods: {
    save() {
      this.$store
        .dispatch("contracts/updateAdminDefault", {
          contract_text_part_2: converter.makeMarkdown(this.contractText),
        })
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
