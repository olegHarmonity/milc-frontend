<template>
  <Editor
    v-model="model"
    api-key="9xyf0hzcn4iz566yc1qceq850lulyzn5tgv66b78zln4flvs"
    :init="init"
  />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

const createPlaceholder = (s) => `<%${s}%>`;

const buyerPlaceholders = [
  { text: "Company name", value: "buyer.company_name" },
  { text: "Country", value: "buyer.country" },
];

const sellerPlaceholders = [
  { text: "Company name", value: "seller.company_name" },
  { text: "Email", value: "seller.email" },
  { text: "Country", value: "seller.country" },
  { text: "Address", value: "seller.address" },
  { text: "Postal code", value: "seller.post_code" },
];

const licencePlaceholders = [
  { text: "Languages", value: "languages" },
  { text: "Rights", value: "rights" },
  { text: "Territories", value: "territories" },
];

export default {
  components: { Editor },

  props: {
    value: {
      type: String,
    },
  },

  data: () => ({
    init: {
      height: "80vh",
      menubar: false,
      toolbar: "undo redo | styleselect | bold italic underline | placeholders",
      setup: function (editor) {
        editor.ui.registry.addMenuButton("placeholders", {
          text: "Placeholders",
          fetch: function (callback) {
            const items = [
              {
                type: "nestedmenuitem",
                text: "Buyer",
                getSubmenuItems: function () {
                  return buyerPlaceholders.map(function (i) {
                    return {
                      type: "menuitem",
                      text: i.text,
                      onAction: function () {
                        editor.insertContent(createPlaceholder(i.value));
                      },
                    };
                  });
                },
              },
              {
                type: "nestedmenuitem",
                text: "Seller",
                getSubmenuItems: function () {
                  return sellerPlaceholders.map(function (i) {
                    return {
                      type: "menuitem",
                      text: i.text,
                      onAction: function () {
                        editor.insertContent(createPlaceholder(i.value));
                      },
                    };
                  });
                },
              },
              {
                type: "nestedmenuitem",
                text: "Licence",
                getSubmenuItems: function () {
                  return licencePlaceholders.map(function (i) {
                    return {
                      type: "menuitem",
                      text: i.text,
                      onAction: function () {
                        editor.insertContent(createPlaceholder(i.value));
                      },
                    };
                  });
                },
              },
            ];
            callback(items);
          },
        });
      },
    },
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

<style lang="scss"></style>
