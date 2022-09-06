<template>
  <v-progress-linear
    v-if="loading"
    indeterminate
    color="primary"
    class="mb-7 mt-4"
  ></v-progress-linear>

  <v-chip-group v-else v-model="model" v-bind="$attrs" color="primary" column>
    <v-chip
      v-for="(item, i) in items"
      :key="i"
      :value="itemValue ? item[itemValue] : item"
    >
      {{ itemText ? item[itemText] : item }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: String,
      required: false,
    },
    itemValue: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

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

  watch: {
    value() {
      this.formatValue();
    },
  },

  created() {
    this.formatValue();
  },

  methods: {
    formatValue() {
      const val = this.value;
      if (Array.isArray(val) && val.length && typeof val[0] == "object") {
        this.model = val.map((i) => i.id);
      }
    },
  },
};
</script>

<style lang="scss">
.v-chip-group {
  .v-chip:not(.v-chip--active) {
    background-color: transparent !important;
    border: 1px solid #555;

    &::before {
      opacity: 0 !important;
    }
  }

  .v-chip--active {
    background-color: var(--v-primary-base) !important;
    border: 1px solid transparent !important;
    color: white !important;

    &::before {
      opacity: 0 !important;
    }
  }
}
</style>
