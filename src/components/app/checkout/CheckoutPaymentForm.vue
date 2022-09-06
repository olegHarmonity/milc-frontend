<template>
  <div>
    <v-card class="checkout-payment-form pt-5 px-8 mt-10">
      <v-label>{{ $t("orders.payment") }}</v-label>

      <v-radio-group v-model="paymentType" class="mt-0">
        <!-- Stripe aka credit card -->
        <v-row>
          <v-col>
            <v-radio
              value="stripe"
              label="Credit card"
              color="primary lighten-1"
              class="mb-5"
            />
          </v-col>

          <v-col v-if="paymentType === 'stripe'" class="text-right">
            <v-img
              :src="require('@/assets/images/mastercard.png')"
              width="30"
              max-width="30"
              class="d-inline-block ml-3"
            />
            <v-img
              :src="require('@/assets/images/visa.png')"
              width="50"
              max-width="50"
              class="d-inline-block ml-3"
            />
            <v-img
              :src="require('@/assets/images/amex.png')"
              width="30"
              max-width="30"
              class="d-inline-block ml-3"
            />
          </v-col>
        </v-row>

        <!-- Bank details -->
        <v-form v-model="formValid">
          <v-row v-if="paymentType === 'stripe'" class="mb-2 pt-3">
            <v-col cols="12" lg="6" class="py-0">
              <v-text-field
                v-model="paymentData.number"
                v-mask="'#### #### #### ####'"
                placeholder="Card number"
                :rules="[rule.required, rule.creditCard]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" lg="6" class="py-0">
              <v-text-field
                v-model="paymentData.name"
                placeholder="Name on Card"
                :rules="[rule.required]"
                maxlength="50"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" lg="6" class="py-0">
              <v-text-field
                v-model="paymentData.exp_date"
                v-mask="'##/##'"
                placeholder="Expiration date"
                :rules="[rule.required, rule.expirationDate]"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" lg="6" class="py-0">
              <v-text-field
                v-model="paymentData.cvc"
                v-mask="'####'"
                placeholder="Security code (CVV/CVC)"
                :rules="[rule.required, rule.cvv]"
                outlined
                dense
              />
            </v-col>
          </v-row>
        </v-form>

        <!-- Bank transfer -->
        <template>
          <v-radio
            value="bank-transfer"
            label="Bank transfer"
            color="primary lighten-1"
            class="mb-5"
          />

          <div
            v-if="paymentType === 'bank-transfer'"
            class="mb-5"
            style="margin-top: -10px"
          >
            {{ $t("checkout.bankTransferMessage") }}
            <div class="item-group mt-2">
              <div class="item">
                <span class="key">{{ $t("labels.amount") }}</span>
                <span class="value">
                  {{ $formatMoney(order.total.value, order.total.currency) }}
                </span>
              </div>
              <div class="item">
                <span class="key">{{ $t("labels.reference") }}</span>
                <span class="value">
                  {{ order.order_number }}
                </span>
              </div>
              <div class="item">
                <span class="key">{{ $t("labels.bankName") }}</span>
                <span class="value">
                  {{ $store.getters["admin/settings"].bank_name }}
                </span>
              </div>
              <div class="item">
                <span class="key">{{ $t("labels.iban") }}</span>
                <span class="value">
                  {{ $store.getters["admin/settings"].iban }}
                </span>
              </div>
              <div class="item">
                <span class="key">{{ $t("labels.swift") }}</span>
                <span class="value">
                  {{ $store.getters["admin/settings"].swift_bic }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <!-- Paypal -->
        <v-radio value="paypal" label="Paypal" color="primary lighten-1" />
      </v-radio-group>
    </v-card>

    <api-response :response="formResponse" class="mt-5" />

    <v-btn
      block
      color="primary"
      @click="next"
      class="mt-5"
      :disabled="!paymentType || !formValid"
      :loading="loading"
    >
      {{ $t("buttons.buyNow") }}
    </v-btn>
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

  data: () => ({
    paymentType: null,
    paymentData: {},
    formValid: false,
    formResponse: null,
    loading: false,
  }),

  created() {
    this.$store.dispatch("admin/fetchSettings");
  },

  methods: {
    next() {
      this.loading = true;
      this.formResponse = null;

      switch (this.paymentType) {
        case "bank-transfer":
          this.payBankTransfer();
          break;

        case "stripe":
          this.payStripe();
          break;

        case "paypal":
          this.payPaypal();
          break;

        default:
          break;
      }
    },

    payStripe() {
      this.$store
        .dispatch("orders/payStripe", {
          id: this.order.order_number,
          data: this.getPaymentData(),
        })
        .then(() => {
          this.order.state = "paid";
          this.$emit("paid");
          this.$toast.success(this.$t("common.success"));
        })
        .catch((data) => {
          this.formResponse = data;
          this.$toast.error(data?.message || this.$t("common.error"));
        })
        .finally(() => {
          this.loading = false;
        });
    },

    payPaypal() {
      this.$store
        .dispatch("orders/payPaypal", this.order.order_number)
        .catch((data) => {
          this.formResponse = data;
          this.$toast.error(data?.message || this.$t("common.error"));
        })
        .finally(() => {
          this.loading = false;
        });
    },

    payBankTransfer() {
      this.$store
        .dispatch("orders/payBankTransfer", this.order.order_number)
        .then((data) => {
          this.$emit("success");
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch((data) => {
          this.formResponse = data;
          this.$toast.error(data?.message || this.$t("common.error"));
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getPaymentData() {
      return {
        name: this.paymentData.name,
        number: Number(this.paymentData.number.replaceAll(" ", "")),
        exp_month: this.paymentData.exp_date.split("/")[0],
        exp_year: this.paymentData.exp_date.split("/")[1],
        cvc: Number(this.paymentData.cvc),
      };
    },
  },
};
</script>

<style lang="scss">
.checkout-payment-form {
  .v-radio {
    .v-label {
      padding-bottom: 0;
    }
  }
}
</style>
