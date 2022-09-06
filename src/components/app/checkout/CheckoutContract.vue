<template>
  <!-- Spinner -->
  <spinner v-if="!contract" large center />

  <!-- Content -->
  <div v-else class="checkout-contract">
    <!-- Heading -->
    <h1 class="text-center mb-10">{{ $t("checkout.contract") }}</h1>

    <ContractsViewer :contract="contract" @scrolled="scrolled = true">
      <template v-slot:footer>
        <v-divider />

        <!-- Buttons -->
        <v-card-actions>
          <v-spacer />

          <confirm-dialog
            :buttonAttrs="{
              disabled: !contract,
              color: 'secondary',
              class: 'px-10',
              loading: $store.getters['orders/loading'].contractResponse,
            }"
            :buttonText="$t('buttons.deny')"
            :title="$t('checkout.contractDenyTitle')"
            :text="$t('checkout.contractDenyText')"
            @confirm="respond(false)"
          />

          <confirm-dialog
            :buttonAttrs="{
              disabled: !contract || !scrolled,
              color: 'primary',
              class: 'ml-5 px-10',
              loading: $store.getters['orders/loading'].contractResponse,
            }"
            :buttonText="$t('buttons.accept')"
            :title="$t('checkout.contractAcceptTitle')"
            :text="$t('checkout.contractAcceptText')"
            @confirm="respond(true)"
          />
        </v-card-actions>
      </template>
    </ContractsViewer>
  </div>
</template>

<script>
import ContractsViewer from "@/components/app/contracts/ContractsViewer.vue";

export default {
  components: { ContractsViewer },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    contract: null,
    scrolled: false,
  }),

  created() {
    this.$store
      .dispatch("contracts/fetchByOrderNumber", this.order.order_number)
      .then((contract) => {
        this.contract = contract;
      })
      .catch(() => {
        this.$toast.error(this.$t("common.error"));
      });
  },

  methods: {
    respond(response) {
      this.$store
        .dispatch("orders/contractResponse", {
          id: this.order.order_number,
          response,
        })
        .then((data) => {
          this.order.state = data.data.state;

          if (response) {
            this.$toast.success(data?.message || this.$t("common.success"));
            this.$emit("accept");
          } else {
            this.$toast.warning("Contract denied.");
            this.$emit("deny");
          }
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },
};
</script>

<style lang="scss"></style>
