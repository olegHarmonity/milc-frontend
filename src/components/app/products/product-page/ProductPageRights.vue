<template>
  <div class="product-rights-section">
    <h2 class="mb-3">{{ $t("products.headings.rights") }}</h2>

    <v-alert
      type="warning"
      text
      v-if="!product.rights_information || !product.rights_information.length"
    >
      {{ $t("common.noDataAvailable") }}
    </v-alert>

    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="right in product.rights_information"
        :key="right.id"
      >
        <div class="box">
          <RightInfo :right="right" />

          <v-divider class="mb-4" />

          <div class="text-right">
            <RightInfoDialog :id="right.id" />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RightInfo from "@/components/app/products/product-page/parts/RightInfo.vue";
import RightInfoDialog from "@/components/app/products/product-page/parts/RightInfoDialog.vue";

export default {
  components: { RightInfo, RightInfoDialog },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.product-rights-section {
}
</style>
