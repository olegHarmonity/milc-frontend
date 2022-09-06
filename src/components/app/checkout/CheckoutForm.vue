<template>
  <div class="checkout-form">
    <!-- Header -->
    <h1 class="text-center">{{ $t("checkout.checkout") }}</h1>
    <h3 class="text-center mb-10">
      {{ $t("labels.order") }} #{{ order.order_number }}
    </h3>

    <!-- Payment failed alert -->
    <v-alert
      v-if="order.state === 'payment_failed'"
      type="error"
      text
      class="mb-6"
    >
      {{ $t("checkout.previousPaymentFailed") }}
    </v-alert>

    <!-- Form -->
    <v-row>
      <!-- Left -->
      <v-col cols="12" md="6">
        <!-- Contact / Delivery -->
        <v-card class="pt-5 px-8">
          <v-row>
            <!-- Contact -->
            <v-col>
              <v-label>{{ $t("orders.contactInformation") }}</v-label>
              <v-text-field
                v-model="order.contact_email"
                outlined
                readonly
                dense
              />
            </v-col>

            <!-- Delivery -->
            <v-col>
              <v-label>{{ $t("orders.deliveryInformation") }}</v-label>
              <v-text-field
                v-model="order.delivery_email"
                outlined
                readonly
                dense
              />
            </v-col>
          </v-row>
        </v-card>

        <!-- Organisation information -->
        <v-card class="pt-5 px-8 mt-10">
          <v-label>{{ $t("orders.organisationInformation") }}</v-label>
          <v-row>
            <v-col>
              <v-text-field
                v-model="order.organisation_name"
                outlined
                readonly
                dense
              />

              <v-text-field
                v-model="order.organisation_email"
                outlined
                readonly
                dense
              />

              <v-text-field
                v-model="order.organisation_address"
                outlined
                readonly
                dense
              />
            </v-col>

            <v-col>
              <v-text-field
                v-model="order.organisation_type"
                outlined
                readonly
                dense
              />

              <v-text-field
                v-model="order.organisation_phone"
                outlined
                readonly
                dense
              />

              <v-text-field
                v-model="order.organisation_registration_number"
                outlined
                readonly
                dense
              />
            </v-col>
          </v-row>
        </v-card>

        <!-- Billing information -->
        <v-card class="pt-5 px-8 mt-10">
          <v-label>{{ $t("orders.billingInformation") }}</v-label>
          <v-row>
            <v-col>
              <v-text-field
                v-model="order.billing_first_name"
                outlined
                readonly
                dense
              />

              <v-text-field
                v-model="order.billing_email"
                outlined
                readonly
                dense
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="order.billing_last_name"
                outlined
                readonly
                dense
              />

              <v-text-field
                v-model="order.billing_address"
                outlined
                readonly
                dense
              />
            </v-col>
          </v-row>
        </v-card>

        <CheckoutPaymentForm
          v-if="withPayment"
          :order="order"
          @paid="$emit('paid')"
          @success="$emit('success')"
        />
      </v-col>

      <!-- Right -->
      <v-col cols="12" md="6">
        <!-- Cart -->
        <v-card class="py-5 px-8">
          <h2>{{ order.rights_bundle.product.title }}</h2>

          <v-divider class="my-5" />

          <h3 class="mb-4">{{ $t("buttons.rights") }}</h3>

          <div class="ml-3">
            <div
              v-for="right in order.rights_bundle.rights_information"
              :key="right.id"
              class="mb-5 flex-grow-1"
            >
              <h4>
                {{ right.title }}
                <RightInfoDialog :id="right.id" icon />
              </h4>
              <p>{{ right.short_description }}</p>
            </div>
          </div>

          <v-divider class="my-5" />

          <v-row class="subtotal">
            <v-col>
              <div>{{ $t("orders.subtotal") }}</div>
              <div class="mt-5">
                {{ $t("orders.vat") }} {{ order.vat_percentage.value }}%
              </div>
            </v-col>
            <v-col class="text-right">
              <div>
                {{ $formatMoney(order.price.value, order.price.currency) }}
              </div>
              <div class="mt-5">
                {{ $formatMoney(order.vat.value, order.vat.currency) }}
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-5" />

          <v-row class="total">
            <v-col>
              <div>{{ $t("orders.total") }}</div>
            </v-col>
            <v-col class="text-right">
              <div style="margin-bottom: -10px">
                {{ $formatMoney(order.total.value, order.total.currency) }}
              </div>
              <CheckoutCurrencyChange v-if="!withPayment" :order="order" />
            </v-col>
          </v-row>

          <div class="text-right mt-8" v-if="!withPayment">
            <!-- Cancel -->
            <confirm-dialog
              :button-text="$t('buttons.cancel')"
              :button-attrs="{
                text: true,
                loading:
                  $store.getters['orders/loading'].changeState === 'cancelled',
              }"
              :text="$t('checkout.cancelText')"
              @confirm="cancelOrder"
            />

            <!-- Continue -->
            <v-btn color="primary" class="ml-5" @click="$emit('next')">
              {{ $t("buttons.continue") }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CheckoutPaymentForm from "./CheckoutPaymentForm.vue";
import CheckoutCurrencyChange from "./CheckoutCurrencyChange.vue";
import RightInfoDialog from "@/components/app/products/product-page/parts/RightInfoDialog.vue";

export default {
  components: { CheckoutPaymentForm, CheckoutCurrencyChange, RightInfoDialog },

  props: {
    order: {
      type: Object,
      required: true,
    },
    withPayment: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    cancelOrder() {
      this.$store
        .dispatch("orders/changeState", {
          number: this.order.order_number,
          state: "cancelled",
        })
        .then(() => {
          this.order.state = "cancelled";
          this.$emit("canceled");
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },
};
</script>

<style lang="scss">
.checkout-form {
  .v-label {
    display: inline-block;
    padding-bottom: 10px;
  }

  .v-input {
    fieldset {
      border-color: rgba(255, 255, 255, 0.12) !important;
    }
  }

  .subtotal,
  .total {
    div {
      font-size: 20px;
    }
  }
}
</style>
