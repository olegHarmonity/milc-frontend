<template>
  <spinner v-if="loading" large center />
  <div v-else>
    <v-alert type="info" text class="my-5">
      {{ $t("products.edit.fileUploadInfo") }}
    </v-alert>

    <!-- Movie -->
    <div>
      <h2 class="page-heading mb-5">{{ $t("labels.movie") }}</h2>

      <MediaHubVideoItem
        v-for="item in filterItems('movie')"
        :key="item.id"
        :item="item"
        class="mb-3"
      />

      <dashboard
        v-if="uppyMovie"
        :uppy="uppyMovie"
        :props="{ theme: 'dark' }"
      />

      <v-btn
        v-else
        color="primary"
        @click="uppyMovie = createUppyInstance('movie')"
      >
        <v-icon left>mdi-plus-circle-outline</v-icon>
        {{ $t("labels.upload") }}
      </v-btn>
    </div>

    <!-- Trailer -->
    <div>
      <h2 class="page-heading mt-15 mb-5">{{ $t("labels.trailer") }}</h2>

      <MediaHubVideoItem
        v-for="item in filterItems('trailer')"
        :key="item.id"
        :item="item"
        class="mb-3"
      />

      <dashboard
        v-if="uppyTrailer"
        :uppy="uppyTrailer"
        :props="{ theme: 'dark' }"
      />

      <v-btn
        v-else
        color="primary"
        @click="uppyTrailer = createUppyInstance('trailer')"
      >
        <v-icon left>mdi-plus-circle-outline</v-icon>
        {{ $t("labels.upload") }}
      </v-btn>
    </div>

    <!-- Promo videos -->
    <div>
      <h2 class="page-heading mt-15 mb-5">
        {{ $t("labels.promotionalVideos") }}
      </h2>

      <MediaHubVideoItem
        v-for="item in filterItems('promo')"
        :key="item.id"
        :item="item"
        class="mb-3"
      />

      <dashboard
        v-if="uppyPromo"
        :uppy="uppyPromo"
        :props="{ theme: 'dark' }"
      />

      <v-btn
        v-else
        color="primary"
        @click="uppyPromo = createUppyInstance('promo')"
      >
        <v-icon left>mdi-plus-circle-outline</v-icon>
        {{ $t("labels.upload") }}
      </v-btn>
    </div>

    <!-- Next Button -->
    <div class="text-right mt-10">
      <v-btn
        v-if="$route.params.isNewProduct"
        class="px-5"
        color="primary"
        @click="$emit('next')"
      >
        {{ $t("buttons.next") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/vue";
import AwsS3Multipart from "@uppy/aws-s3-multipart";

import MediaHubVideoItem from "./mediahub/MediaHubVideoItem.vue";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

export default {
  components: {
    Dashboard,
    MediaHubVideoItem,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    uppyMovie: null,
    uppyTrailer: null,
    uppyPromo: null,
    loading: true,
  }),

  async created() {
    await this.$store.dispatch("mediahub/getAccessToken");
    await this.$store.dispatch(
      "mediahub/getItemsForAsset",
      this.product.external_reference
    );

    this.loading = false;
  },

  beforeDestroy() {
    !this.uppyMovie || this.uppyMovie.close();
    !this.uppyTrailer || this.uppyTrailer.close();
    !this.uppyPromo || this.uppyPromo.close();
  },

  methods: {
    createUppyInstance(prefix = null) {
      const uppy = new Uppy({
        debug: true,
        autoProceed: false,
        allowMultipleUploads: false,
      });

      uppy.setMeta({ assetId: this.product.external_reference });
      uppy.setMeta({ externalReference: this.product.id });

      uppy.use(AwsS3Multipart, {
        companionUrl: this.$env("API_URL"),

        createMultipartUpload: (file) => {
          if (prefix) {
            file.name = `${prefix}_${file.name}`;
          }

          return this.$store.dispatch("mediahub/createMultipartUpload", file);
        },
      });

      return uppy;
    },

    filterItems(prefix) {
      return this.$store.getters["mediahub/items"].filter((i) =>
        i.fileName.split("/")[1].startsWith(prefix + "_")
      );
    },
  },
};
</script>

<style lang="scss">
.uppy-Dashboard-inner {
  width: 100% !important;
  height: 320px !important;
}
</style>
