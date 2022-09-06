<template>
  <!-- Buy button -->
  <confirm-dialog
    v-if="$isBuyer()"
    :button-text="$t('buttons.buy')"
    button-icon="mdi-cart-outline"
    title="Confirm purchase"
    text="You will be redirected to the checkout page."
    :button-attrs="{
      class: 'px-5 ml-5',
      color: 'primary',
      loading: loading,
      disabled: isDisabled,
    }"
    @confirm="checkCanBuy"
  />
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    bundle: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    loading: false,
  }),

  computed: {
    isDisabled() {
      return (
        this.$isAdmin() ||
        this.product.organisation_id === this.$organisation.id ||
        (!this.loading && !!this.$store.getters["orders/loading"].create)
      );
    },
  },

  methods: {
    checkCanBuy() {
      this.loading = true;
      this.$store
        .dispatch("products/canBuyProduct")
        .then((data) => {
          if (data.result) {
            this.createOrder();
          } else {
            this.$toast.error(data.message, {
              duration: 5000,
            });
            this.loading = false;
          }
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
          this.loading = false;
        });
    },

    createOrder() {
      this.loading = true;
      this.$store
        .dispatch("orders/create", this.bundle.id)
        .then((order) => {
          this.$router.push({
            name: "app.checkout",
            params: { number: order.order_number },
          });
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },
};
</script>

<style></style>
