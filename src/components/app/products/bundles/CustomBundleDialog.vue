<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        {{ $t("products.bundles.customBundle") }}
      </v-btn>
    </template>

    <v-form v-model="formValid" ref="form">
      <v-card>
        <v-card-title>
          {{ $t("products.bundles.createCustomBundle") }}
        </v-card-title>

        <v-card-text>
          <template v-if="!productId">
            <v-label>{{ $t("labels.product") }}<req /></v-label>
            <ProductFilter
              v-model="productId"
              :organisation="$organisation"
              solo
              hide-details
              :rules="[rule.required]"
            />
          </template>

          <template v-else-if="$store.getters['products/loading'].fetch">
            <spinner large center style="height: 200px" />
          </template>

          <template v-else-if="product">
            <!-- Rights select -->
            <v-label>{{ $t("labels.rights") }}<req /></v-label>
            <v-autocomplete
              v-model="formData.rights_information"
              :items="product.rights_information"
              :rules="[rule.required, rule.selection.min(1)]"
              item-text="title"
              item-value="id"
              multiple
              chips
              deletable-chips
              autofocus
            />

            <!-- Price -->
            <v-label>{{ $t("labels.price") }}<req /></v-label>
            <money-field
              v-model="formData.price"
              :attrs="{ rules: [rule.required, rule.number.min(1, ' EUR')] }"
            />
          </template>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />

          <!-- Cancel -->
          <v-btn text @click="cancel" class="mr-3">
            {{ $t("buttons.cancel") }}
          </v-btn>

          <!-- Submit -->
          <v-btn
            color="primary"
            class="px-5"
            :disabled="!formValid"
            :loading="$store.getters['products/loading'].createRightsBundle"
            @click="submit"
          >
            {{ $t(this.productId ? "buttons.submit" : "buttons.continue") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import ProductFilter from "@/components/filters/ProductFilter.vue";

const defaultFormData = () => ({
  price: {
    value: 1.0,
    currency: "EUR",
  },
});

export default {
  components: { ProductFilter },

  props: {
    buyer: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    dialog: false,
    productId: null,
    product: null,
    formData: defaultFormData(),
    formValid: false,
  }),

  watch: {
    productId(val) {
      if (val) {
        this.$store.dispatch("products/fetch", val).then((product) => {
          this.product = product;
        });
      }
    },
  },

  methods: {
    cancel() {
      this.dialog = false;
      this.productId = null;
      this.formData = defaultFormData();
      this.$refs.form.reset();
    },

    submit() {
      this.$store
        .dispatch("products/createRightsBundle", {
          buyer_id: this.buyer.id,
          product_id: this.productId,
          ...this.formData,
        })
        .then(() => {
          this.$toast.success(this.$t("toast.created"));
          this.cancel();
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },
};
</script>
