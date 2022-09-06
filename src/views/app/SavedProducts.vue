<template>
  <div id="app-saved-products" class="page">
    <!-- Header -->
    <v-row class="page-header">
      <!-- Title -->
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $t("products.savedProducts.title") }}</h1>
      </v-col>

      <!-- Search -->
      <v-col class="text-right d-flex justify-end">
        <v-text-field
          v-model="search"
          v-debounce="searchProducts"
          :placeholder="$t('labels.search')"
          class="ml-5"
          style="max-width: 300px"
          append-icon="mdi-magnify"
          height="44"
          solo
          dense
          hide-details
        />
      </v-col>
    </v-row>

    <!-- Loader -->
    <spinner
      v-if="$store.getters['products/loading'].fetchSavedProducts"
      large
      center
    />

    <!-- No data text -->
    <v-alert
      v-else-if="!$store.getters['products/savedProducts'].length"
      type="info"
      text
      class="mt-5"
    >
      {{ $t("products.noSavedProducts") }}
    </v-alert>

    <!-- Product list -->
    <template v-else>
      <ProductListItem
        v-for="product in $store.getters['products/savedProducts']"
        :key="product.id"
        :product="product"
        saved-product
      />
    </template>
  </div>
</template>

<script>
import ProductListItem from "@/components/app/products/ProductListItem.vue";

export default {
  components: { ProductListItem },

  data: () => ({
    search: "",
  }),

  created() {
    this.$store.dispatch("products/fetchSavedProducts");
  },

  methods: {
    searchProducts() {
      if (this.search != "" && this.search.length < 3) {
        return;
      }

      this.$store.dispatch("products/fetchSavedProducts", this.search);
    },
  },
};
</script>

<style></style>
