<template>
  <span class="order-state d-inline-block text--secondary">
    <!-- Icon -->
    <v-icon :color="color" size="8" class="mr-1 pb-1">mdi-circle</v-icon>

    <!-- Text -->
    {{ $t("orders.state." + order.state) }}
  </span>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    color() {
      switch (this.order.state) {
        case "new":
        case "contract_accepted":
          return "info";

        case "awaiting_payment":
          return "warning";

        case "paid":
        case "assets_sent":
        case "assets_received":
        case "complete":
          return "success";

        case "contract_denied":
        case "payment_failed":
        case "rejected":
          return "danger";

        default:
          return "secondary";
      }
    },
  },
};
</script>

<style lang="scss"></style>
