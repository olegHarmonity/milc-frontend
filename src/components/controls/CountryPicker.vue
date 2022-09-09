<template>
  <v-autocomplete
    rounded
    outlined
    v-model="country"
    :items="items"
    v-bind="attrs"
    v-on="on"
  >
    <!-- Selection -->
    <template v-slot:selection="{ item }">
      <div :class="'mx-3 vti__flag ' + item.value.toLowerCase()"></div>
      {{ item.text }}
    </template>

    <!-- Item -->
    <template v-slot:item="{ item }">
      <div :class="'vti__flag ' + item.value.toLowerCase()"></div>
      {{ item.text }}
    </template>
  </v-autocomplete>
</template>

<script>
import i18n from "@/plugins/i18n";
import { getNames, registerLocale } from "i18n-iso-countries";

registerLocale(require("i18n-iso-countries/langs/en.json"));
registerLocale(require("i18n-iso-countries/langs/de.json"));

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
