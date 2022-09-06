<template>
  <v-autocomplete
    v-model="country"
    :items="items"
    v-bind="attrs"
    v-on="on"
    :chips="attrs && attrs.multiple"
    :deletable-chips="attrs && attrs.multiple"
  />
</template>

<script>
import i18n from "@/plugins/i18n";
import { getNames, registerLocale } from "@cospired/i18n-iso-languages";

registerLocale(require("@cospired/i18n-iso-languages/langs/en.json"));
registerLocale(require("@cospired/i18n-iso-languages/langs/de.json"));

export default {
  props: {
    value: {
      type: [Array, String],
    },
    attrs: {
      type: Object,
    },
    on: {
      type: Object,
    },
  },

  computed: {
    country: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },

    items() {
      const names = getNames(i18n.locale);
      return Object.keys(names).map((key) => {
        return {
          text: names[key],
          value: key,
        };
      });
    },
  },
};
</script>

<style></style>
