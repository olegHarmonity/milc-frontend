<template>
  <v-row no-gutters class="vat-rule">
    <!-- Country picker -->
    <v-col v-if="country">
      <country-picker
        v-model="model.country"
        :attrs="{
          placeholder: $t('labels.country'),
          rules: [rule.required],
        }"
      />
    </v-col>

    <!-- Percentage input -->
    <v-col :cols="country ? 'auto' : 'col'">
      <v-text-field
        v-model="model.vat.value"
        v-bind="$attrs"
        v-mask="'##'"
        :placeholder="'%'"
        :style="{ width: country ? '90px' : '100%' }"
        suffix="%"
        type="number"
        :max="100"
        :min="0"
      />
    </v-col>

    <v-col cols="auto" v-if="deletable">
      <v-icon class="ml-2 mt-3" @click="$emit('delete')">mdi-close</v-icon>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
    country: {
      type: Boolean,
      default: false,
    },
    deletable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    model: {
      get() {
        if (!this.value) {
          return {
            vat: {
              value: "",
            },
          };
        }

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
