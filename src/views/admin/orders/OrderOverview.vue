<template>
  <spinner v-if="!order" large center />
  <div v-else id="app-order-overview" class="page">
    <!-- Header -->
    <v-row class="page-header">
      <v-col cols="12" md="auto">
        <h1 class="page-title">
          {{ $t("orders.title") }} #{{ order.order_number }}
        </h1>
      </v-col>
    </v-row>

    <OrderDetails :order="order" class="mt-15" />
  </div>
</template>

<script>
import OrderDetails from "@/components/admin/orders/OrderDetails.vue";

export default {
  components: { OrderDetails },

  data: () => ({
    order: null,
  }),

  created() {
    this.$store
      .dispatch("orders/fetch", this.$route.params.id)
      .then((order) => {
        this.order = order;
      })
      .catch(() => {
        this.$404();
      });
  },
};
</script>

<style></style>
