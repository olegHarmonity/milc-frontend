<template>
  <div class="orders-table-preview" style="width: 200px">
    <!-- Order number -->
    <h3>#{{ order.order_number }}</h3>

    <!-- State -->
    <OrderState :order="order" class="text--secondary" />

    <!-- Title -->
    <h3 class="mt-3">{{ order.rights_bundle.product.title }}</h3>

    <!-- Poster -->
    <v-img width="140" height="180" :src="image" class="rounded" />

    <!-- Product details link -->
    <small class="d-block mb-3 mt-1">
      <router-link
        class="text--secondary basic-link"
        :to="{
          name: 'app.products.view',
          params: { id: order.rights_bundle.product_id },
        }"
        target="_blank"
      >
        {{ $t("labels.productDetails") }}
      </router-link>
    </small>

    <!-- Price -->
    <div class="mb-2">
      <label class="d-block">{{ $t("labels.price") }}:</label>
      {{ $formatMoney(order.price.value, order.price.currency) }}
    </div>

    <!-- Order date -->
    <div class="mb-3">
      <label class="d-block">{{ $t("labels.orderDate") }}:</label>
      {{ $formatDate(order.created_at) }}
    </div>

    <!-- Details button -->
    <v-btn
      color="primary"
      block
      link
      :to="{
        name: $isAdmin() ? 'admin.orders.view' : 'app.orders.view',
        params: { id: order.id },
      }"
    >
      {{ $t("buttons.details") }}
    </v-btn>

    <!-- Details button -->
    <v-btn
      v-if="$organisation && order.organisation_id === $organisation.id"
      color="primary"
      block
      link
      class="mt-3"
      :to="{
        name: 'app.checkout',
        params: { number: order.order_number },
      }"
    >
      {{ $t("checkout.checkout") }}
    </v-btn>
  </div>
</template>

<script>
import OrderState from "./OrderState.vue";

export default {
  components: { OrderState },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    image() {
      return (
        this.order.rights_bundle.product.marketing_assets.key_artwork
          ?.image_url || this.$placeholderImage("150x180")
      );
    },
  },
};
</script>

<style lang="scss"></style>
