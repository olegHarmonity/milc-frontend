<template>
  <v-row class="product-main-section">
    <!-- Left -->
    <v-col cols="12" md="7" class="d-flex flex-column">
      <!-- Image, title -->
      <v-row class="flex-grow-0">
        <v-col cols="auto">
          <v-img
            :src="coverImage"
            @error="
              product.marketing_assets.key_artwork.image_url =
                $placeholderImage('170x250')
            "
            width="200"
            class="rounded-lg"
          />
        </v-col>

        <v-col>
          <!-- Title -->
          <h1>{{ product.title }}</h1>
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

          <!-- Formats -->
          <div class="mt-1">
            <v-chip
              v-for="format in product.available_formats"
              :key="format.id"
              class="mr-3 mt-2"
              small
            >
              {{ format.name }}
            </v-chip>
          </div>
          <div v-if="!myProduct" class="mt-2">
            <v-btn @click="saveProduct">{{
              isSaved ? "Remove from saved" : "Add to saved"
            }}</v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- Synopsis -->
      <div class="mt-5">
        <h4 class="mb-1">{{ $t("labels.synopsis") }}</h4>
        <p class="synopsis mb-2">
          {{ product.synopsis }}
        </p>
      </div>

      <!-- Organisation -->
      <div class="mt-5">
        <h4 class="mb-2">{{ $t("labels.organisation") }}</h4>
        <v-btn
          color="primary"
          link
          :to="{
            name: 'app.organisation',
            params: { id: product.organisation_id },
          }"
        >
          {{ product.organisation.organisation_name }}
        </v-btn>
      </div>

      <v-spacer />

      <!-- Links -->
      <div class="links mt-5">
        <div v-if="product.links.website">
          <v-icon size="40" class="mr-3">mdi-web</v-icon>
          <a :href="'//' + product.links.website" target="_blank">
            {{ product.links.website }}
          </a>
        </div>

        <!-- <div v-if="product.links.imdb">
          <v-icon size="40" class="mr-3">mdi-web</v-icon>
          <a :href="'//' + product.links.website" target="_blank">{{ product.links.imdb }}</a>
        </div> -->

        <div v-if="product.links.twitter">
          <v-icon size="40" class="mr-3">mdi-twitter</v-icon>
          <a :href="'//' + product.links.twitter" target="_blank">
            {{ product.links.twitter }}
          </a>
        </div>

        <div v-if="product.links.facebook">
          <v-icon size="40" class="mr-3">mdi-facebook</v-icon>
          <a :href="'//' + product.links.facebook" target="_blank">
            {{ product.links.facebook }}
          </a>
        </div>
      </div>
    </v-col>

    <!-- Right -->
    <v-col cols="12" md="5">
      <div class="mb-10">
        <VideoPlayer
          v-if="filterItems('trailer').length"
          :item="filterItems('trailer')[0]"
          image
        />

        <v-img v-else :src="$placeholderImage('720x383')" class="rounded-lg" />
      </div>

      <div class="item-group">
        <h2>Details</h2>

        <div class="item">
          <span class="key">{{ $t("labels.titleAlternative") }}:</span>
          <span class="value">{{ product.alternative_title }}</span>
        </div>

        <div class="item">
          <span class="key">Language:</span>
          <span class="value">
            {{ $codeToLanguage(product.original_language) }}
          </span>
        </div>

        <div class="item">
          <span class="key">Available dubbings:</span>
          <span class="value">
            {{ $codeToLanguage(product.dubbing_languages).join(", ") }}
          </span>
        </div>

        <div class="item">
          <span class="key">Available subtitles:</span>
          <span class="value">
            {{ $codeToLanguage(product.subtitle_languages).join(", ") }}
          </span>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import VideoPlayer from "@/components/common/VideoPlayer.vue";

export default {
  components: { VideoPlayer },
  data() {
    return {
      isSaved: null,
      myProduct: false,
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.isSaved = this.product.is_saved;
    this.myProduct =
      this.product.organisation_id ==
      this.$store.getters["auth/user"].organisation_id;
  },

  computed: {
    coverImage() {
      return (
        this.product.marketing_assets?.key_artwork?.image_url ||
        "https://via.placeholder.com/170x250/555555?text=MILC%20Platform"
      );
    },
  },

  methods: {
    filterItems(prefix) {
      return this.product.items.filter((i) =>
        i.fileName.split("/")[1].startsWith(prefix + "_")
      );
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
};
</script>

<style lang="scss">
.product-main-section {
  .links {
    div {
      margin-bottom: 8px;
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
