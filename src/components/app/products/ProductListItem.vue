<template>
  <v-row class="product-list-item">
    <v-col cols="12" md="auto" class="pr-md-7">
      <v-img
        :src="image"
        @error="imageError = true"
        width="170"
        height="250"
        class="rounded-lg"
      />
    </v-col>

    <v-col>
      <!-- Title  -->
      <router-link
        class="no-underline"
        :to="{
          name: 'app.products.view',
          params: { id: product.id },
        }"
      >
        <h2>{{ product.title }}</h2>
      </router-link>

      <!-- Type, duration -->
      <small style="opacity: 0.8">
        <span class="mr-3">
          {{ product.content_type ? product.content_type.name : "" }}
        </span>
        <v-icon small class="mr-1 pb-1">mdi-clock-outline</v-icon>
        <span>{{ $formatDuration(product.runtime) }}</span>
      </small>

      <!-- Genres -->
      <div>
        <v-chip
          v-for="genre in product.genres"
          :key="genre.id"
          class="chip-transparent mr-3 mt-2"
          @click="
            $router.push({
              name: 'app.products.category',
              params: { id: genre.id },
            })
          "
        >
          {{ genre.name }}
        </v-chip>
      </div>

      <!-- Synopsis -->
      <h3 class="mt-3">{{ $t("labels.synopsis") }}</h3>
      <p class="synopsis mb-2">
        {{ product.synopsis }}
      </p>

      <!-- Video formats -->
      <v-row>
        <v-col cols="auto">
          <v-chip
            v-for="format in product.available_formats"
            :key="format.id"
            class="mr-3 mt-1"
            small
          >
            {{ format.name }}
          </v-chip>
        </v-col>

        <v-col class="text-right">
          <template v-if="!savedProduct">
            <!-- Edit button -->
            <v-btn
              color="success"
              text
              :to="{
                name: 'app.products.edit',
                params: { id: product.id },
              }"
            >
              {{ $t("buttons.edit") }}
            </v-btn>

            <!-- Delete button -->
            <confirm-dialog
              :button-text="$t('buttons.delete')"
              :button-attrs="{
                color: 'error',
                text: true,
                loading:
                  $store.getters['products/loading'].delete == product.id,
              }"
              @confirm="deleteProduct"
            />
          </template>
          <template v-else>
            <BuyBundleButton
              :product="product"
              :bundle="this.product.rights_bundles[0]"
            />
            <v-btn
              class="ml-5"
              color="error"
              text
              style="font-size: 15px; letter-spacing: 0px"
              :loading="
                $store.getters['products/loading'].removeSavedProduct ==
                product.id
              "
              @click="removeSavedProduct"
            >
              {{ $t("buttons.removeFromSaved") }}
            </v-btn>
          </template>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import BuyBundleButton from "./product-page/parts/BuyBundleButton.vue";
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    savedProduct: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    imageError: false,
  }),

  computed: {
    image() {
      if (
        this.imageError ||
        !this.product.marketing_assets?.key_artwork?.image_url
      ) {
        return "https://via.placeholder.com/170x250/555555?text=MILC Platform";
      }
      return this.product.marketing_assets?.key_artwork?.image_url;
    },
  },

  methods: {
    deleteProduct() {
      this.$store
        .dispatch("products/delete", this.product.id)
        .then((data) => {
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
    removeSavedProduct() {
      this.$store
        .dispatch("products/removeSavedProduct", this.product.id)
        .then((data) => {
          this.$toast.success(data.message);
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },

  components: { BuyBundleButton },
};
</script>

<style lang="scss">
.product-list-item {
  .synopsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
