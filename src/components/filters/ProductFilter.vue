<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    item-text="title"
    item-value="id"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },
    organisation: {
      type: Object,
      required: false,
    },
  },

  data: () => ({
    items: [],
  }),

  computed: {
    model: {
      get: function () {
        return this.value;
      },
      set: function (val) {
        this.$emit("input", val);
      },
    },
  },

  created() {
    const params = {
      per_page: 1000,
      "sort[title]": "asc",
    };

    if (this.organisation) {
      params["exact_search[organisation_id]"] = this.organisation.id;
    }

    this.$store.dispatch("products/fetchAll", params).then((res) => {
      this.items = res.data.data;
    });
  },
};
</script>

<style></style>
