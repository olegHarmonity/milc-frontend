<template>
  <v-row class="product-production-section">
    <!-- Left -->
    <v-col cols="12" md="7">
      <!-- Cast -->
      <div>
        <h2 class="mb-5">Cast</h2>

        <div class="d-flex mb-8">
          <div
            v-for="(actor, i) in product.production_info.cast"
            :key="i"
            class="mr-8"
          >
            <v-img
              src="https://via.placeholder.com/170x250/555555?text=MILC"
              alt="actor image"
              width="100"
              class="rounded"
            />

            <small>{{ $fullName(actor) }}</small>
          </div>
        </div>
      </div>

      <!-- Production images -->
      <div
        class="mb-8"
        v-if="product.marketing_assets.production_images.length"
      >
        <h2 class="mb-5">Production images</h2>
        <v-sheet class="product-images-v-sheet mx-auto" max-width="100%">
          <v-slide-group multiple show-arrows>
            <v-slide-item
              v-for="(image, index) in getProductImages"
              :key="`image-${index}`"
            >
              <v-card width="170px" class="ma-3">
                <v-card-title class="pa-0">
                  <v-img
                    height="250px"
                    class="rounded"
                    lazy-src="https://via.placeholder.com/170x250/555555?text=MILC%20Platform"
                    :src="image.image_url"
                    width="170px"
                  />
                </v-card-title>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </div>

      <!-- Copyright information -->
      <div>
        <h3>Copyright information</h3>
        <p>{{ product.marketing_assets.copyright_information }}</p>
      </div>
    </v-col>

    <!-- Right -->
    <v-col cols="12" md="5">
      <div class="item-group mb-10">
        <h2>Production</h2>

        <div class="item">
          <span class="key">Production year:</span>
          <span class="value">
            {{ product.production_info.production_year }}
          </span>
        </div>

        <div class="item">
          <span class="key">Release year:</span>
          <span class="value">
            {{ product.production_info.release_year }}
          </span>
        </div>

        <div class="item">
          <span class="key">Country of origin:</span>
          <span class="value">
            {{ $codeToCountry(product.production_info.country_of_origin) }}
          </span>
        </div>
      </div>

      <div class="item-group mb-10">
        <h2>Production cast</h2>

        <div class="item">
          <span class="key">Directors:</span>
          <span class="value">
            {{
              product.production_info.directors
                .map((i) => $fullName(i))
                .join(", ")
            }}
          </span>
        </div>

        <div class="item">
          <span class="key">Producers:</span>
          <span class="value">
            {{
              product.production_info.producers
                .map((i) => $fullName(i))
                .join(", ")
            }}
          </span>
        </div>

        <div class="item">
          <span class="key">Writers:</span>
          <span class="value">
            {{
              product.production_info.writers
                .map((i) => $fullName(i))
                .join(", ")
            }}
          </span>
        </div>
      </div>

      <div class="item-group mb-10">
        <h2>Awards &amp; Festivals</h2>

        <div class="item">
          <span class="key">Awards:</span>
          <span class="value">
            {{ product.production_info.awards.join(", ") }}
          </span>
        </div>

        <div class="item">
          <span class="key">Festivals:</span>
          <span class="value">
            {{ product.production_info.festivals.join(", ") }}
          </span>
        </div>
      </div>

      <div class="item-group mb-10">
        <h2>Box office</h2>

        <div class="item">
          <span class="key">Global GBO:</span>
          <span class="value">
            {{ product.production_info.box_office.globalGbo }}
          </span>
        </div>

        <div class="item">
          <span class="key">Domestic GBO:</span>
          <span class="value">
            {{ product.production_info.box_office.domesticGbo }}
          </span>
        </div>

        <div class="item">
          <span class="key">International GBO:</span>
          <span class="value">
            {{ product.production_info.box_office.internationalGbo }}
          </span>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    coverImage() {
      return (
        this.product.marketing_assets?.key_artwork?.image_url ||
        "https://via.placeholder.com/170x250/555555?text=MILC%20Platform"
      );
    },
    getProductImages() {
      return this.product.marketing_assets.production_images;
    },
  },
};
</script>

<style lang="scss">
.product-production-section {
  .product-images-v-sheet {
    background: transparent;
  }
}
</style>
