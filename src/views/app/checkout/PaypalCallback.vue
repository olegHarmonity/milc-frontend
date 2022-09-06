<template>
  <div class="page">
    <spinner v-if="loading" large center />
  </div>
</template>

<script>
export default {
  props: {
    cancel: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    loading: true,
  }),

  created() {
    this.cancel ? this.processCancel() : this.processSuccess();
  },

  methods: {
    processSuccess() {
      const query = this.$route.fullPath.split("?")[1];

      this.$store
        .dispatch("orders/paymentSuccess", {
          id: this.$route.params.number,
          query,
        })
        .then((order) => {
          this.$router.replace({
            name: "app.checkout",
            params: {
              number: order.order_number,
              _order: order,
            },
          });
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },

    processCancel() {
      this.$store
        .dispatch("orders/paymentError", this.$route.params.number)
        .then((order) => {
          this.$router.replace({
            name: "app.checkout",
            params: {
              number: order.order_number,
              _order: order,
            },
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
