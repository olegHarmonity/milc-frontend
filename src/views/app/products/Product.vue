<template>
  <spinner v-if="!product" large center />
  <v-container v-else id="app-product">
    <ProductPageMain :product="product" />

    <v-divider class="my-15" />

    <ProductPageProduction :product="product" />

    <v-divider class="my-15" />

    <ProductPageVideos :product="product" />

    <v-divider class="my-15" />

    <ProductPageRights :product="product" />

    <v-divider class="my-15" />

    <ProductPageBundles :product="product" />
  </v-container>
</template>

<script>
import ProductPageMain from "@/components/app/products/product-page/ProductPageMain.vue";
import ProductPageProduction from "@/components/app/products/product-page/ProductPageProduction.vue";
import ProductPageVideos from "@/components/app/products/product-page/ProductPageVideos.vue";
import ProductPageRights from "@/components/app/products/product-page/ProductPageRights.vue";
import ProductPageBundles from "@/components/app/products/product-page/ProductPageBundles.vue";

export default {
  components: {
    ProductPageMain,
    ProductPageProduction,
    ProductPageVideos,
    ProductPageRights,
    ProductPageBundles,
  },

  data: () => ({
    product: null,
  }),

  async created() {
    try {
      const product = await this.$store.dispatch(
        "products/fetch",
        this.$route.params.id
      );
      const items = await this.$store.dispatch(
        "mediahub/getItemsForAsset",
        product.external_reference
      );

      product.items = items;
      this.product = product;
    } catch (err) {
      this.$404();
    }
  },
};
</script>

<style lang="scss">
#app-product {
}
</style>
