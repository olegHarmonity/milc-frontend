<template>
  <div id="app-product-edit" class="page">
    <!-- Title -->
    <v-row class="page-header">
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $t("products.edit.title") }}</h1>
      </v-col>

      <v-col class="text-right d-flex justify-end mb-4 mb-md-0">
        <v-btn v-if="tab != 'form'" color="primary" @click="tab = 'form'">
          <v-icon left>mdi-arrow-left</v-icon>
          {{ $t("buttons.back") }}
        </v-btn>
        <v-btn
          v-if="tab != 'files'"
          color="primary"
          @click="tab = 'files'"
          class="ml-5"
        >
          {{ $t("labels.files") }}
        </v-btn>
        <v-btn
          v-if="tab != 'rights'"
          color="primary"
          @click="tab = 'rights'"
          class="ml-5"
        >
          {{ $t("buttons.rights") }}
        </v-btn>
        <v-btn
          v-if="tab != 'bundles'"
          color="primary"
          @click="tab = 'bundles'"
          class="ml-5"
        >
          {{ $t("buttons.bundles") }}
        </v-btn>
      </v-col>
    </v-row>

    <spinner v-if="$store.getters['products/loading'].fetch" large center />

    <template v-else-if="product">
      <ProductForm v-show="tab === 'form'" :product="product" />

      <ProductFormFiles
        v-show="tab === 'files'"
        :product="product"
        @next="tab = 'rights'"
      />

      <ProductFormRights
        v-show="tab === 'rights'"
        :product="product"
        @next="tab = 'bundles'"
      />

      <ProductFormBundles
        v-show="tab === 'bundles'"
        :product="product"
        @next="tab = 'form'"
      />
    </template>
  </div>
</template>

<script>
import ProductForm from "@/components/app/products/product-form/ProductForm.vue";
import ProductFormRights from "@/components/app/products/product-form/ProductFormRights.vue";
import ProductFormBundles from "@/components/app/products/product-form/ProductFormBundles.vue";
import ProductFormFiles from "@/components/app/products/product-form/ProductFormFiles.vue";

export default {
  components: {
    ProductForm,
    ProductFormRights,
    ProductFormBundles,
    ProductFormFiles,
  },

  data: () => ({
    product: null,
    tab: "form",
  }),

  created() {
    if (this.$route.params.isNewProduct) {
      this.tab = "files";
    }

    this.$store
      .dispatch("products/fetch", this.$route.params.id)
      .then((product) => {
        if (product.organisation_id !== this.$organisation.id) {
          throw true;
        }

        this.product = product;
      })
      .catch(() => {
        this.$404();
      });
  },
};
</script>

<style></style>
