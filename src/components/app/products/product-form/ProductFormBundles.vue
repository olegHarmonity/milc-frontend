<template>
  <div class="product-form-right-bundles">
    <h2 class="page-heading">{{ $t("products.headings.bundles") }}</h2>

    <div class="page-section">
      <v-form
        v-model="formsValid[i]"
        v-for="(item, i) in formData.bundle_rights"
        :key="i"
      >
        <BundleForm
          v-model="formData.bundle_rights[i]"
          :rights="product.rights_information"
          :index="i + 1"
          @delete="removeItem(i)"
        />
      </v-form>

      <v-btn @click="addItem" text class="mt-5">
        {{ $t("buttons.addAnother") }}
        <v-icon right> mdi-plus-circle-outline </v-icon>
      </v-btn>
    </div>

    <!-- Response box -->
    <api-response class="mt-15" :response="formResponse" />

    <!-- Button -->
    <div class="text-right mt-3">
      <v-btn
        v-if="$route.params.isNewProduct"
        class="px-5 mr-5"
        text
        @click="$emit('next')"
      >
        {{ $t("buttons.skip") }}
      </v-btn>

      <v-btn
        color="primary"
        class="px-15"
        type="submit"
        :disabled="buttonDisabled"
        :loading="$store.getters['products/loading'].update"
        @click="handleSubmit"
      >
        {{ $t("buttons.save") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import BundleForm from "./forms/BundleForm.vue";

export default {
  components: { BundleForm },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    formData: {
      bundle_rights: [],
    },
    formResponse: null,
    formsValid: {},
  }),

  computed: {
    buttonDisabled() {
      for (const key in this.formsValid) {
        if (Object.hasOwnProperty.call(this.formsValid, key)) {
          const isValid = this.formsValid[key];

          if (!isValid) {
            return true;
          }
        }
      }

      return false;
    },
  },

  created() {
    this.formData.id = this.product.id;

    if (this.product.bundle_rights) {
      this.formData.bundle_rights = this.$deepCopy(this.product.bundle_rights);
    }
  },

  methods: {
    addItem() {
      this.formData.bundle_rights.push({});
      this.$forceUpdate();
    },

    removeItem(i) {
      this.formData.bundle_rights.splice(i, 1);
      this.formsValid[i] = true;
      this.$forceUpdate();
    },

    handleSubmit() {
      this.$store
        .dispatch("products/update", this.formData)
        .then((data) => {
          this.product.bundle_rights = data.data.bundle_rights;
          this.$toast.success(data.message || this.$t("common.success"));

          if (this.$route.params.isNewProduct) {
            this.$emit("next");
          }
        })
        .catch((err) => {
          this.formResponse = err ? err.data : null;
        });
    },
  },
};
</script>

<style lang="scss">
.product-form-right-bundles {
  .menu-button {
    .v-btn__content {
      text-align: left;
      display: block;
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
