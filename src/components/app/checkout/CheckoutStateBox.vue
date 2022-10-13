<template>
  <div>
    <h1 class="text-center mb-10">{{ $t("checkout.checkout") }}</h1>

    <v-card
      class="pa-10 mx-auto rounded-lg text-center"
      style="max-width: 800px"
    >
      <v-icon size="150">
        {{ data.icon }}
      </v-icon>

      <h1 class="text-center mt-5">{{ data.text }}</h1>

      <h2 class="text-center mt-5">
        {{ $t("checkout.yourOrderNumber", { n: order.order_number }) }}
      </h2>

      <v-btn
        rounded
        color="primary"
        class="px-10 mt-8"
        :to="{ name: 'app.orders.view', params: { id: order.id } }"
      >
        {{ $t("checkout.trackYourOrder") }}
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    if (this.order.state === "contract_accepted") {
      this.$store.dispatch(
        "products/removeSavedProduct",
        this.order.rights_bundle.product_id
      );
    }
  },

  computed: {
    data() {
      switch (this.order.state) {
        case "contract_denied":
          return {
            icon: "mdi-close-circle-outline",
            text: this.$t("checkout.contractDenied"),
          };

        case "awaiting_payment":
          return {
            icon: "mdi-timer-sand",
            text: this.$t("checkout.paymentPending"),
          };

        case "cancelled":
          return {
            icon: "mdi-close-circle-outline",
            text: this.$t("checkout.orderCanceled"),
          };

        default:
          return {
            icon: "mdi-check-circle-outline",
            text: this.$t("checkout.thanksForOrder"),
          };
      }
    },
  },
};
</script>

<style></style>
