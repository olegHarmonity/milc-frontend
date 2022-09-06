<template>
  <v-form v-model="formValid" @submit.prevent="handleSubmit">
    <v-btn
      v-if="!product"
      style="position: absolute; top: 0rem; right: 1rem"
      @click="fillData"
      title="This is for development purposes and will be removed in production."
    >
      Fill data
    </v-btn>

    <GeneralInfoForm v-model="formData" />

    <ProductionInfoForm v-model="formData" />

    <MarketingInfoForm v-model="formData" />

    <LocalizationForm v-model="formData" />

    <api-response class="mt-15" :response="formResponse" />

    <div class="text-right mt-3">
      <v-btn
        color="primary"
        class="px-15"
        type="submit"
        :disabled="!formValid"
        :loading="formLoading"
      >
        {{ $t("buttons.save") }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import GeneralInfoForm from "./forms/GeneralInfoForm.vue";
import ProductionInfoForm from "./forms/ProductionInfoForm.vue";
import MarketingInfoForm from "./forms/MarketingInfoForm.vue";
import LocalizationForm from "./forms/LocalizationForm.vue";

export default {
  components: {
    GeneralInfoForm,
    ProductionInfoForm,
    MarketingInfoForm,
    LocalizationForm,
  },

  props: {
    product: {
      type: Object,
      required: false,
    },
  },

  data: () => ({
    formData: {
      allow_requests: false,
      links: {},
      production_info: {
        box_office: {},
        production_status: "released",
      },
      marketing_assets: {},
      rights_information: [],
      files: {},
    },
    formLoading: false,
    formResponse: null,
    formValid: false,
  }),

  created() {
    this.$store.dispatch("movieContentTypes/fetchAll");
    this.$store.dispatch("movieGenres/fetchAll");
    this.$store.dispatch("movieFormats/fetchAll");
    this.$store.dispatch("movieRights/fetchAll");

    if (this.product) {
      this.formData = Object.assign({}, this.product);
      this.formData.files = {};
      delete this.formData.content_type;
      delete this.formData.dub_files;
      delete this.formData.subtitles;
      delete this.formData.marketing_assets.key_artwork;
      delete this.formData.marketing_assets.key_artwork_id;
      delete this.formData.marketing_assets.production_images;
      delete this.formData.movie_id;
      delete this.formData.screener_id;
      delete this.formData.trailer_id;
      delete this.formData.promotional_videos;
      delete this.formData.organisation;
      delete this.formData.organisation_id;
      delete this.formData.rights_information;
      delete this.formData.bundle_rights;
    }
  },

  methods: {
    handleSubmit() {
      this.formResponse = null;
      this.product ? this.update() : this.create();
    },
    create() {
      this.formLoading = true;
      this.$toast.info("Creating product...");
      this.$store
        .dispatch("products/create", this.formData)
        .then((data) => {
          this.uploadFiles(data.data);
        })
        .catch((err) => {
          this.formResponse = err.data;
        })
        .finally(() => {
          this.formLoading = false;
        });
    },
    update() {
      this.formLoading = true;
      this.$toast.info("Updating product...");
      this.$store
        .dispatch("products/update", this.formData)
        .then((data) => {
          this.uploadFiles(data.data);
        })
        .catch((err) => {
          this.formResponse = err ? err.data : null;
        })
        .finally(() => {
          this.formLoading = false;
        });
    },
    async uploadFiles(product) {
      // TODO: Refactor

      if (!Object.keys(this.formData.files).length) {
        this.$toast.success(this.$t("common.success"));
        this.redirectToEdit(product);
        return;
      }

      this.formLoading = true;
      this.$toast.info("Uploading files...");

      const formData = {
        ...this.formData,
        id: product.id,
      };

      if (this.formData.files.key_art) {
        await this.$store
          .dispatch("files/uploadImage", this.formData.files.key_art)
          .then((data) => {
            formData.marketing_assets.key_artwork_id = data.data.id;
          })
          .catch(() => {});
      }

      if (this.formData.files.production_images) {
        const ids = [];
        for (const file of this.formData.files.production_images) {
          await this.$store
            .dispatch("files/uploadImage", file)
            .then((data) => {
              ids.push(data.data.id);
            })
            .catch(() => {});
        }
        formData.marketing_assets.production_images = ids;
      }

      if (this.formData.files.screener) {
        await this.$store
          .dispatch("files/uploadVideo", this.formData.files.screener)
          .then((data) => {
            formData.screener_id = data.data.id;
          })
          .catch(() => {});
      }

      if (this.formData.files.trailer) {
        await this.$store
          .dispatch("files/uploadVideo", this.formData.files.trailer)
          .then((data) => {
            formData.trailer_id = data.data.id;
          })
          .catch(() => {});
      }

      if (this.formData.files.dub_files) {
        const ids = [];
        for (const file of this.formData.files.dub_files) {
          await this.$store
            .dispatch("files/uploadAudio", file)
            .then((data) => {
              ids.push(data.data.id);
            })
            .catch(() => {});
        }
        formData.dub_files = ids;
      }

      if (this.formData.files.subtitles) {
        const ids = [];
        for (const file of this.formData.files.subtitles) {
          await this.$store
            .dispatch("files/uploadFile", file)
            .then((data) => {
              ids.push(data.data.id);
            })
            .catch(() => {});
        }
        formData.subtitles = ids;
      }

      if (this.formData.files.promotional_videos) {
        const ids = [];
        for (const file of this.formData.files.promotional_videos) {
          await this.$store
            .dispatch("files/uploadVideo", file)
            .then((data) => {
              ids.push(data.data.id);
            })
            .catch(() => {});
        }
        formData.promotional_videos = ids;
      }

      if (this.formData.files.movie) {
        await this.$store
          .dispatch("files/uploadVideo", this.formData.files.movie)
          .then((data) => {
            formData.movie_id = data.data.id;
          })
          .catch(() => {});
      }

      await this.$store
        .dispatch("products/update", formData)
        .then((data) => {
          this.$toast.success(data.message || this.$t("common.success"));
          this.redirectToEdit(data.data);
        })
        .catch((err) => {
          this.formResponse = err ? err.data : null;
        });

      this.formLoading = false;
    },
    redirectToEdit(product) {
      if (this.$route.name == "app.products.edit") {
        return;
      }

      this.$router.push({
        name: "app.products.edit",
        params: { id: product.id, isNewProduct: true },
      });
    },
    fillData() {
      const data = {
        title: "New Movie",
        alternative_title: "The New Movie",
        runtime: 7125,
        content_type_id: 1,
        allow_requests: true,
        synopsis:
          "In her second installment of the Harry Potter saga, J.K. Rowling takes readers through the adventures of Harry Potter at the Hogwarts School of Witchcraft and Wizardry. A mysterious warning from an elf keeps Harry on his toes as he begins to unlock the secrets of Tom Riddle, talking spiders and a unique journal.",
        keywords: ["New Movie", "The New Movie"],
        genres: [1, 3, 8],
        available_formats: [2, 3, 4],
        original_language: "en",
        dubbing_languages: ["de"],
        subtitle_languages: ["en", "de"],
        links: {
          website: "www.newmovie.com",
          facebook: "www.facebook.com/newmovie",
          twitter: "www.twitter.com/newmovie",
          imdb: "www.imdb.com/newmovie",
        },
        production_info: {
          production_year: 2020,
          release_year: 2021,
          country_of_origin: "US",
          production_status: "released",
          awards: ["Best movie of 2021"],
          festivals: ["Some festival in US"],
          box_office: {
            globalGbo: "$1,000,000",
            domesticGbo: "$1,000,000",
            internationalGbo: "$1,000,000",
          },
        },
        marketing_assets: {
          copyright_information: "Copyright information for New Movie.",
          links: ["www.review.com/newmovie"],
        },
      };

      this.formData = {
        ...this.formData,
        ...data,
      };
    },
  },
};
</script>

<style></style>
