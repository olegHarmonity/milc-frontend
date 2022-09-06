<template>
  <spinner v-if="!order" large center />

  <div v-else id="app-checkout" class="page">
    <CheckoutForm
      v-if="step === 'form'"
      :order="order"
      @next="step = 'contract'"
      @canceled="step = 'state-box'"
    />

    <CheckoutContract
      v-if="step === 'contract'"
      :order="order"
      @accept="step = 'form-with-payment'"
      @deny="step = 'state-box'"
    />

    <CheckoutForm
      v-if="step === 'form-with-payment'"
      :order="order"
      @paid="step = 'state-box'"
      @success="step = 'state-box'"
      with-payment
    />

    <CheckoutStateBox v-if="step === 'state-box'" :order="order" />
  </div>
</template>

<script>
import CheckoutForm from "@/components/app/checkout/CheckoutForm.vue";
import CheckoutContract from "@/components/app/checkout/CheckoutContract.vue";
import CheckoutStateBox from "@/components/app/checkout/CheckoutStateBox.vue";

export default {
  components: {
    CheckoutForm,
    CheckoutContract,
    CheckoutStateBox,
  },

  props: {
    _order: {
      type: Object,
      required: false,
    },
  },

  data: () => ({
    order: null,
    step: "",
  }),

  created() {
    if (this._order) {
      this.processStep(this._order);
      this.order = this._order;
    } else {
      this.$store
        .dispatch("orders/fetchByNumber", this.$route.params.number)
        .then((order) => {
          this.processStep(order);
          this.order = order;
        })
        .catch(() => {
          this.$404();
        });
    }
  },

  methods: {
    processStep(order) {
      switch (order.state) {
        case "new":
          this.step = "form";
          break;

        case "contract_accepted":
        case "payment_failed":
          this.step = "form-with-payment";
          break;

        default:
          this.step = "state-box";
          break;
      }
    },
  },
};
</script>

<style lang="scss">
#app-checkout {
  .v-card {
    & > .v-label,
    .col > .v-label {
      font-weight: bold;
    }
  }
}
</style>
