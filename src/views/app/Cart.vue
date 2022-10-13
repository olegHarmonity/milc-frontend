<template>
  <div id="app-product-list" class="page">
    <v-row class="page-header">
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $t("products.list.title") }}</h1>
      </v-col>

      <v-col class="text-right d-flex justify-end">
        <v-btn color="primary" link :to="{ name: 'app.products.add' }">
          <v-icon left>mdi-plus</v-icon>
          {{ $t("buttons.addProduct") }}
        </v-btn>

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

    <spinner
      v-if="$store.getters['products/loading'].fetchMyProducts"
      large
      center
    />

    <v-alert
      v-else-if="!$store.getters['products/myProducts'].length && !search"
      type="info"
      text
      class="mt-5"
    >
      {{ $t("products.noProducts") }}
    </v-alert>

    <template v-else>
      <ProductListItem
        v-for="product in $store.getters['products/myProducts']"
        :key="product.id"
        :product="product"
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
    this.$store.dispatch("products/fetchMyProducts");
  },

  methods: {
    searchProducts() {
      if (this.search != "" && this.search.length < 3) {
        return;
      }

      this.$store.dispatch("products/fetchMyProducts", this.search);
    },
  },
};
</script>

<style></style>
