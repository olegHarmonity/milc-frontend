<template>
  <div class="order-details">
    <!-- Row 1 - Image -->
    <v-row>
      <v-col cols="auto">
        <!-- Product image -->
        <v-img
          :src="$productImage(product, '185x280')"
          width="185"
          max-width="185"
          class="rounded-lg"
        />

        <!-- Product details link -->
        <small class="d-block mb-4 mt-1">
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
      </v-col>

      <v-col>
        <!-- Title, order state -->
        <div class="d-flex align-center mb-5">
          <h2 class="mr-10">{{ product.title }}</h2>
          <OrderState :order="order" />
        </div>

        <!-- Rights -->
        <label class="text--secondary">Purchased rights</label>
        <h3
          v-for="right in order.rights_bundle.rights_information"
          :key="right.id"
          class="mt-2"
        >
          &bull; {{ right.title }}
          <RightInfoDialog :id="right.id" icon />
        </h3>
      </v-col>
    </v-row>

    <!-- Row 2 - Order status -->
    <div class="mt-10">
      <h2>{{ $t("orders.orderStatus") }}</h2>
      <OrderStateStepper :order="order" />
    </div>

    <!-- Row 3 - Informations -->
    <v-row class="mt-10">
      <!-- Order information -->
      <v-col class="item-group pr-md-7">
        <h2>{{ $t("orders.orderInformation") }}</h2>

        <!-- Name -->
        <div class="item">
          <span class="key">{{ $t("labels.organisation") }}:</span>
          <span class="value">{{ order.organisation_name }}</span>
        </div>

        <!-- Date -->
        <div class="item">
          <span class="key">{{ $t("orders.orderDate") }}:</span>
          <span class="value">{{ $formatDate(order.created_at) }}</span>
        </div>

        <!-- Payment type -->
        <div class="item">
          <span class="key">{{ $t("orders.paymentType") }}:</span>
          <span class="value">{{ order.payment_method }}</span>
        </div>

        <!-- Contact -->
        <div class="item">
          <span class="key">{{ $t("labels.contact") }}:</span>
          <span class="value">
            <anchor email :value="order.contact_email" />
          </span>
        </div>
      </v-col>

      <!-- Billing information -->
      <v-col class="item-group pl-md-7">
        <h2>{{ $t("orders.billingInformation") }}</h2>

        <!-- First name -->
        <div class="item">
          <span class="key">{{ $t("labels.firstName") }}:</span>
          <span class="value">{{ order.billing_first_name }}</span>
        </div>

        <!-- Last name -->
        <div class="item">
          <span class="key">{{ $t("labels.firstName") }}:</span>
          <span class="value">{{ order.billing_last_name }}</span>
        </div>

        <!-- Email -->
        <div class="item">
          <span class="key">{{ $t("labels.email") }}:</span>
          <span class="value">
            <anchor email :value="order.billing_email" />
          </span>
        </div>

        <!-- Address -->
        <div class="item">
          <span class="key">{{ $t("labels.address") }}:</span>
          <span class="value">{{ order.billing_address }}</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import OrderState from "./OrderState.vue";
import OrderStateStepper from "./OrderStateStepper.vue";
import RightInfoDialog from "@/components/app/products/product-page/parts/RightInfoDialog.vue";

export default {
  components: { OrderState, OrderStateStepper, RightInfoDialog },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    product() {
      return this.order.rights_bundle.product;
    },
  },
};
</script>

<style lang="scss"></style>
