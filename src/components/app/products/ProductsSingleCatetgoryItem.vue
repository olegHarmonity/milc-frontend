<template>
  <div
    class="products-single-category-item"
    @mouseenter="transformProduct"
    @mouseleave="resetProduct"
    @click="
      $router.push({ name: 'app.products.view', params: { id: product.id } })
    "
  >
    <v-img
      ref="product-img"
      :src="image"
      lazy-src="https://via.placeholder.com/170x250/555555?text=MILC%20Platform"
      :alt="product.title"
      @error="imageError = true"
      aspect-ratio="1"
      width="154"
      height="230"
      class="single-category-item-image"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <div class="product-info" ref="product-info" :class="{ active: showInfo }">
      <h3 class="product-info-title">
        {{ product.title }}
      </h3>
      <div class="product-info-others">
        <small style="opacity: 0.8">
          <span>{{ getYear }}</span>
          <v-icon small>mdi-clock-outline</v-icon>
          <span>{{ $formatDuration(product.runtime, "seconds", "H:m") }}</span>
          <span>{{ $codeToLanguage(product.original_language) }}</span>
        </small>
        <v-btn icon @click.stop="saveProduct">
          <v-icon>{{ isSaved ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsSingleCatetgoryItem",
  data() {
    return {
      showInfo: false,
      mouseEnter: false,
      timeout: null,
      imageError: false,
      isSaved: null,
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    image() {
      if (
        this.imageError ||
        !this.product.marketing_assets?.key_artwork?.image_url
      ) {
        return "https://via.placeholder.com/170x250/555555?text=MILC%20Platform";
      }
      return this.product.marketing_assets?.key_artwork?.image_url;
    },
    getYear() {
      return this.product.production_info.release_year;
    },
  },
  methods: {
    transformProduct() {
      clearTimeout(this.timeout);
      this.showInfo = true;
      const infoHeight = this.$refs["product-info"].clientHeight;
      const transformForImage = infoHeight - 25;
      this.$refs[
        "product-img"
      ].$el.style.transform = `translateY(-${transformForImage}px)`;
      this.$refs["product-info"].style.transform = "translateY(25px)";
    },
    resetProduct() {
      this.$refs["product-img"].$el.style.transform = "translateY(0)";
      this.$refs["product-info"].style.transform = "translateY(0)";
      this.timeout = setTimeout(() => {
        this.showInfo = false;
      }, 500);
    },
    saveProduct() {
      const route = `products/${
        this.isSaved ? "removeSavedProduct" : "saveProduct"
      }`;
      this.$store.dispatch(route, this.product.id).then(() => {
        this.isSaved = !this.isSaved;
      });
    },
  },
  mounted() {
    this.isSaved = this.product.is_saved;
  },
};
</script>

<style lang="scss" scoped>
.products-single-category-item {
  cursor: pointer;
  height: 230px;
  transition: height 0.5s linear;
  position: relative;
  .single-category-item-image {
    background-color: #2b2e34;
    border-radius: 9px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    position: relative;
    z-index: 2;
  }
  .product-info {
    justify-content: center;
    background: #630e17;
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    opacity: 0;
    padding: 11px;
    position: absolute;
    width: 100%;
    &.active {
      opacity: 1;
    }
    h3 {
      font-size: 14px;
      font-weight: 500;
    }
    .product-info-others {
      font-size: 10px;
      font-weight: 400;
      position: relative;
      > button {
        height: 15px;
        position: absolute;
        top: 0;
        right: 0;
        width: 15px;
        i {
          font-size: 15px;
        }
      }
      small {
        align-items: center;
        display: flex;
        height: 15px;
        font-size: 10px;
        i {
          font-size: 10px !important;
          height: 100%;
          line-height: unset;
          padding-bottom: 1px;
          margin-right: 3px;
        }
        span {
          display: inline-block;
          height: 100%;
          &:first-child {
            &:after {
              display: inline-block;
              height: 10px;
              width: 1px;
              content: "";
              background-color: #fff;
              margin: 0 3px 0 4px;
              position: relative;
              top: 1px;
            }
            //padding: 0 4px;
            //border-right: 1px solid #fff;
          }
          &:last-child {
            &:before {
              display: inline-block;
              height: 10px;
              width: 1px;
              content: "";
              background-color: #fff;
              margin: 0 4px 0 3px;
              position: relative;
              top: 1px;
            }
          }
        }
      }
    }
  }
  .single-category-item-image,
  .product-info {
    transform: translateY(0);
    transition: transform 0.2s linear;
    margin-top: 5px;
  }
  .v-image__image--preload {
    filter: unset;
  }
}
</style>
