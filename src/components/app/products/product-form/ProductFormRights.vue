<template>
  <div class="product-form-rights">
    <h2 class="page-heading">{{ $t("products.headings.rights") }}</h2>

    <v-row class="page-section">
      <!-- Left - Navigation -->
      <v-col class="pr-md-5" cols="12" md="auto" style="width: 275px">
        <template v-for="(item, i) in formData.rights_information">
          <v-btn
            :key="i"
            :color="selectedItemIndex == i ? 'primary' : 'transparent'"
            @click="selectedItemIndex = i"
            class="d-block w-100 mb-3 menu-button"
            :title="item.title"
          >
            {{ item.title }}
          </v-btn>
        </template>

        <v-btn @click="addItem" text>
          {{ $t("buttons.addAnother") }}
          <v-icon right> mdi-plus-circle-outline </v-icon>
        </v-btn>
      </v-col>

      <!-- Right - Forms -->
      <v-col class="pl-md-5">
        <v-form
          v-model="formsValid[i]"
          v-for="(item, i) in formData.rights_information || []"
          :key="i"
        >
          <RightsForm
            v-model="formData.rights_information[i]"
            v-show="selectedItemIndex === i"
            @delete="removeItem(selectedItemIndex)"
            deletable
          />
        </v-form>

        <!-- Response box -->
        <api-response class="mt-15" :response="formResponse" />

        <!-- Button -->
        <div class="d-flex mt-3">
          <v-btn text @click="duplicateRight">
            {{ $t("buttons.makeCopy") }}
          </v-btn>

          <v-spacer />

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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RightsForm from "./forms/RightsForm.vue";

export default {
  components: { RightsForm },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    formData: {
      rights_information: [],
    },
    formResponse: null,
    formsValid: {},
    selectedItemIndex: 0,
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

    if (this.product.rights_information) {
      this.formData.rights_information = this.$deepCopy(
        this.product.rights_information
      );
    }
  },

  methods: {
    addItem() {
      this.formData.rights_information.push({});
      this.selectedItemIndex = this.formData.rights_information.length - 1;
      this.$forceUpdate();
    },

    removeItem(i) {
      this.selectedItemIndex = i - 1;
      this.formData.rights_information.splice(i, 1);
      this.formsValid[i] = true;
      this.$forceUpdate();
    },

    handleSubmit() {
      this.$store
        .dispatch("products/update", this.formData)
        .then((data) => {
          this.product.rights_information = data.data.rights_information;
          this.$toast.success(data.message || this.$t("common.success"));

          if (this.$route.params.isNewProduct) {
            this.$emit("next");
          }
        })
        .catch((err) => {
          this.formResponse = err ? err.data : null;
        });
    },

    duplicateRight() {
      const duplicate = Object.assign(
        {},
        this.formData.rights_information[this.selectedItemIndex]
      );
      delete duplicate.id;
      duplicate.title += " - Copy";

      this.formData.rights_information.splice(
        this.selectedItemIndex + 1,
        0,
        duplicate
      );
      ++this.selectedItemIndex;

      this.$forceUpdate();
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss">
.product-form-rights {
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
