<template>
  <div class="product-rights-section">
    <h2 class="mb-3">Rights bundles available for purchase</h2>

    <ContactSellerDialog
      :product="product"
      v-if="!$isAdmin() && product.organisation_id !== $organisation.id"
    />

    <v-alert
      type="warning"
      text
      v-if="!product.bundle_rights || !product.bundle_rights.length"
    >
      {{ $t("common.noDataAvailable") }}
    </v-alert>

    <v-row>
      <!-- Bundle loop -->
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="bundle in product.bundle_rights"
        :key="bundle.id"
      >
        <div class="box d-flex flex-column h-100" style="position: relative">
          <!-- Custom bundle chip -->
          <v-tooltip bottom v-if="bundle.buyer_id">
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                small
                color="#e67e22"
                style="position: absolute; top: 5px; right: 5px"
                v-bind="attrs"
                v-on="on"
              >
                {{ $t("products.bundles.customBundle") }}
              </v-chip>
            </template>
            {{ customBundleTooltip }}
          </v-tooltip>

          <!-- Bundle's rights loop -->
          <div class="flex-grow-1">
            <div
              v-for="right in bundle.rights_information"
              :key="right.id"
              class="mb-3"
            >
              <h3>{{ right.title }}<RightInfoDialog :id="right.id" icon /></h3>
              <p class="text--secondary">{{ right.short_description }}</p>
            </div>
          </div>

          <v-divider></v-divider>

          <!-- Footer -->
          <div class="mt-5 text-right">
            <!-- Price -->
            {{ $t("labels.price") }}:
            <b>
              {{ $formatMoney(bundle.price.value, bundle.price.currency) }}
            </b>

            <!-- Buy button -->
            <BuyBundleButton :product="product" :bundle="bundle" />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RightInfoDialog from "./parts/RightInfoDialog.vue";
import ContactSellerDialog from "./parts/ContactSellerDialog.vue";
import BuyBundleButton from "./parts/BuyBundleButton.vue";

export default {
  components: { RightInfoDialog, ContactSellerDialog, BuyBundleButton },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    customBundleTooltip() {
      return this.$isAdmin() ||
        this.product.organisation_id === this.$organisation.id
        ? this.$t("products.bundles.customBundleTooltip")
        : this.$t("products.bundles.customBundleTooltipBuyer");
    },
  },

  methods: {
    checkout(bundleId) {
      this.$store
        .dispatch("orders/create", bundleId)
        .then((order) => {
          this.$router.push({
            name: "app.checkout",
            params: { number: order.order_number },
          });
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },
};
</script>

<style lang="scss">
.product-bundles-section {
}
</style>
