<template>
  <v-row dense class="person-field">
    <v-col>
      <v-combobox
        v-model="model[firstNameProp]"
        v-bind="attrs"
        v-on="on"
        v-debounce="searchItems"
        @input="(item) => select(item)"
        :placeholder="$t('labels.firstName')"
        :search-input.sync="search"
        :items="items"
        :item-text="(item) => $fullName(item)"
        :readonly="!!model.id"
        no-filter
        append-icon=""
      />
    </v-col>
    <v-col>
      <v-text-field
        v-model="model[lastNameProp]"
        v-bind="attrs"
        v-on="on"
        :placeholder="$t('labels.lastName')"
        :readonly="!!model.id"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
    attrs: {
      type: Object,
    },
    on: {
      type: Object,
    },
    firstNameProp: {
      type: String,
      default: "first_name",
    },
    lastNameProp: {
      type: String,
      default: "last_name",
    },
  },

  data: () => ({
    search: null,
    items: [],
  }),

  computed: {
    model: {
      get() {
        if (!this.value) {
          return {};
        }

        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },

  methods: {
    searchItems() {
      this.$store
        .dispatch("people/search", {
          per_page: 999,
          "search[full_name]": this.search,
        })
        .then((items) => {
          this.items = items;
        })
        .catch(() => {
          this.items = [];
        });
    },

    select(item) {
      if (typeof item === "string") {
        this.model[this.firstNameProp] = item;
      } else {
        this.search = null;
        this.model = item;
      }
    },
  },
};
</script>

<style lang="scss"></style>
