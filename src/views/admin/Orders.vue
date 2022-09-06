<template>
  <div id="admin-orders" class="page">
    <!-- Header -->
    <v-row class="page-header">
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $t("orders.title") }}</h1>
      </v-col>
    </v-row>

    <OrdersTable class="mt-15" />
  </div>
</template>

<script>
import OrdersTable from "@/components/admin/orders/OrdersTable.vue";

export default {
  components: { OrdersTable },
};
</script>

<style></style>
