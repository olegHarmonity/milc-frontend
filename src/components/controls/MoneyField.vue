<template>
  <div class="price-field d-flex">
    <!-- Value -->
    <v-text-field
      v-model="model.value"
      v-mask="currencyMask"
      class="value-input"
      style="width: 150px"
      v-bind="attrs"
      v-on="on"
    />

    <!-- Currency -->
    <v-select
      v-model="model.currency"
      :items="$config.app.payments.currencies"
      style="width: 70px"
    />
  </div>
</template>

<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  allowNegative: false,
  includeThousandsSeparator: false,
  // thousandsSeparatorSymbol: ".",
  // decimalSymbol: ",",
});

export default {
  props: {
    value: {
      type: Object,
    },
    attrs: {
      type: Object,
      required: false,
    },
    on: {
      type: Object,
      required: false,
    },
  },

  data: () => ({
    currencyMask,
  }),

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style lang="scss">
.price-field {
  .v-input {
    padding-top: 0px;
  }

  .value-input {
    input {
      padding-right: 10px;
    }
  }
}
</style>
