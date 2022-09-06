<template>
  <v-menu offset-y>
    <!-- Activator -->
    <template v-slot:activator="{ on, attrs }">
      <!-- Button -->
      <a
        v-bind="attrs"
        v-on="on"
        style="font-size: 12px; text-decoration: underline"
      >
        <!-- Loader -->
        <v-progress-linear
          v-if="$store.getters['orders/loading'].changeCurrency"
          indeterminate
          class="d-inline-block"
          style="width: 110px"
        ></v-progress-linear>

        <template v-else>
          {{ $t("checkout.changeCurrency") }}
        </template>
      </a>
    </template>

    <!-- List -->
    <v-list class="list-selectable">
      <template v-for="(item, index) in items">
        <v-list-item :key="index" v-if="order.total.currency !== item.value">
          <v-list-item-title
            @click="changeCurrency(item)"
            style="font-size: 18px"
          >
            <span class="mr-3">{{ item.symbol }}</span>
            <span>{{ item.title }}</span>
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
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
    items: [
      { symbol: "€", title: "EUR", value: "EUR" },
      { symbol: "$", title: "USD", value: "USD" },
      { symbol: "£", title: "GBP", value: "GBP" },
    ],
  }),

  methods: {
    changeCurrency(item) {
      this.$store
        .dispatch("orders/changeCurrency", {
          id: this.order.order_number,
          currency: item.value,
        })
        .then((order) => {
          for (const key in order) {
            if (Object.hasOwnProperty.call(order, key)) {
              this.order[key] = order[key];
            }
          }
        })
        .catch(() => {
          this.$toast(this.$t("common.error"));
        });
    },
  },
};
</script>

<style lang="scss"></style>
