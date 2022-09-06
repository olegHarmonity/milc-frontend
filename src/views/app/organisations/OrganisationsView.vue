<template>
  <div class="organisation-view">
    <div class="organisation-wrapper">
      <OrganisationOverview
        v-if="organisation"
        :organisation="organisation"
        :admin-org="false"
      ></OrganisationOverview>
    </div>
    <div class="organisation-products">
      <h2>Products</h2>
      <div class="products-wrapper" id="products-wrapper">
        <div
          class="products-wrapper-items"
          v-if="products.length && loaded"
          :style="{ 'grid-template-columns': `repeat(${itemWidth}, 154px)` }"
        >
          <ProductsSingleCatetgoryItem
            v-for="(item, key) in products"
            :key="`product-${key}`"
            :product="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrganisationOverview from "@/components/admin/organisations/OrganisationOverview";
import ProductsSingleCatetgoryItem from "@/components/app/products/ProductsSingleCatetgoryItem";
export default {
  components: { ProductsSingleCatetgoryItem, OrganisationOverview },
  data() {
    return {
      itemWidth: 0,
      organisation: null,
      products: [],
      loaded: false,
    };
  },
  created() {
    this.$store
      .dispatch("organisations/fetch", this.$route.params.id)
      .then((org) => {
        this.organisation = org;
      })
      .catch(() => {
        this.$404();
      });
    this.$store
      .dispatch("products/fetchAll", {
        "exact_search[organisation_id]": this.$route.params.id,
      })
      .then((res) => {
        this.products = res.data.data;
        this.getItemWidth();
      });
  },
  mounted() {
    this.loaded = true;
  },
  methods: {
    getMapper(mapper) {
      return this[mapper];
    },
    getItemWidth() {
      const parentWidth =
        document.getElementById("products-wrapper").offsetWidth;
      const itemsLength = parseInt((parentWidth / 154).toString(), 10);
      this.itemWidth =
        itemsLength > this.products.length ? this.products.length : itemsLength;
    },
  },
};
</script>

<style lang="scss" scoped>
.organisation-view {
  .products-wrapper > div {
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 44px;
  }
}
</style>
