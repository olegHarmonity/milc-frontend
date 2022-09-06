<template>
  <!-- Loader -->
  <spinner v-if="loading" large center />

  <!-- Page -->
  <v-form v-else-if="canAddProduct" id="app-product-add" class="page">
    <!-- Title -->
    <h1 class="page-title">{{ $t("products.add.title") }}</h1>

    <ProductForm />
  </v-form>
</template>

<script>
import ProductForm from "@/components/app/products/product-form/ProductForm.vue";

export default {
  components: { ProductForm },

  data: () => ({
    loading: true,
    canAddProduct: false,
  }),

  created() {
    this.$store
      .dispatch("products/canAddProduct")
      .then((data) => {
        this.canAddProduct = data.result;

        if (!data.result) {
          this.$toast.error(data.message, {
            duration: 5000,
          });
          this.$router.back();
        }
      })
      .catch(() => {
        this.$toast.error(this.$t("common.error"));
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style></style>
