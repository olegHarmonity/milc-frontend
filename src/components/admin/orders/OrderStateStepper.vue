<template>
  <v-alert v-if="showAlert" text type="warning" class="mt-3">
    {{ $t("orders.state." + order.state) }}.
  </v-alert>

  <v-stepper
    v-else
    v-model="step"
    flat
    alt-labels
    class="order-state-stepper"
    style="
      background-color: transparent;
      margin-left: -24px;
      margin-right: -24px;
    "
  >
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" :step="1">
        {{ $t("orders.stateStepper.contract") }}
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="step > 2" :step="2">
        <div class="mb-3">
          {{ $t("orders.stateStepper.payment") }}
        </div>

        <!-- Mark as paid -->
        <confirm-dialog v-if="canMarkAsPaid" @confirm="changeState('paid')">
          <template v-slot:button="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="primary"
              :loading="$store.getters['orders/loading'].changeState === 'paid'"
            >
              Mark as paid
            </v-btn>
          </template>
        </confirm-dialog>
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="step > 3" :step="3">
        {{ $t("orders.stateStepper.paid") }}
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="step > 4" :step="4">
        {{ $t("orders.stateStepper.assets") }}
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="step > 5" :step="5">
        {{ $t("orders.stateStepper.completed") }}
      </v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  data: () => ({}),

  computed: {
    showAlert() {
      return (
        this.order.state === "cancelled" || this.order.state === "rejected"
      );
    },
    canMarkAsPaid() {
      return (
        this.order.state === "awaiting_payment" &&
        !this.$isAdmin() &&
        this.$organisation.id === this.order.seller_id
      );
    },
    step() {
      switch (this.order.state) {
        case "new":
          return 1;

        case "contract_accepted":
          return 2;

        case "awaiting_payment":
        case "payment_failed":
          return 2;

        case "paid":
          return 4;

        case "assets_sent":
        case "assets_received":
          return 5;

        case "completed":
          return 6;

        default:
          return 1;
      }
    },
  },

  methods: {
    changeState(state) {
      this.$store
        .dispatch("orders/changeState", {
          number: this.order.order_number,
          state: state,
        })
        .then((order) => {
          for (const [key, value] of Object.entries(order)) {
            this.order[key] = value;
          }
        });
    },
  },
};
</script>

<style lang="scss">
.order-state-stepper {
  @media only screen and (max-width: 700px) {
    .v-stepper__header {
      display: block;
    }

    .v-divider {
      margin-top: 0px !important;
      margin-right: 20px !important;
      margin-left: 20px !important;
    }
  }

  @media only screen and (max-width: 959px) {
    .v-stepper__label {
      display: block !important;
    }
  }
}
</style>
