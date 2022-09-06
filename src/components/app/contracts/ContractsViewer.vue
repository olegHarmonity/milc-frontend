<template>
  <v-card class="contracts-viewer">
    <slot name="header" />

    <v-card-text>
      <div
        style="overflow-y: scroll"
        :style="{ height: height }"
        @scroll="contractScrolled"
      >
        <div v-html="parseToHtml(contract.contract_text)"></div>
        <div v-html="parseToHtml(contract.contract_text_part_2)"></div>
        <div v-html="parseToHtml(contract.contract_appendix)"></div>
      </div>
    </v-card-text>

    <slot name="footer" />
  </v-card>
</template>

<script>
import showdown from "showdown";

const converter = new showdown.Converter();

export default {
  props: {
    contract: {
      type: Object,
      required: true,
    },
    height: {
      type: String,
      default: "80vh",
    },
  },

  methods: {
    contractScrolled(event) {
      const element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        this.$emit("scrolled");
      }
    },

    parseToHtml(text) {
      return converter.makeHtml(text);
    },
  },
};
</script>

<style scoped>
code {
  background-color: transparent !important;
}
</style>
