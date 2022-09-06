<template>
  <div :class="{ 'mb-3': !isEmpty, 'mb-5': isEmpty }">
    <v-text-field
      v-for="(item, i) in model"
      v-model="model[i]"
      v-bind="attrs"
      v-on="on"
      :key="i"
      append-icon="mdi-close"
      @click:append="removeItem(i)"
    />

    <div
      v-if="showAddItemButton"
      class="text-right"
      :style="{
        'margin-top': isEmpty ? '-25px' : '-10px',
      }"
    >
      <v-btn text small style="font-size: 14px" @click="addItem" tabindex="-1">
        {{ $t("buttons.addAnother") }}
        <v-icon right> mdi-plus-circle-outline </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
    },
    attrs: {
      type: Object,
    },
    on: {
      type: Object,
    },
    max: {
      type: [Number, String],
      required: false,
    },
  },

  data: () => ({}),

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    showAddItemButton() {
      return !+this.max || this.model.length < +this.max;
    },
    isEmpty() {
      return !this.model || !this.model.length;
    },
  },

  watch: {
    value() {
      if (!this.value) {
        this.model = [];
      }
    },
  },

  created() {
    if (!this.value) {
      this.model = [];
    }
  },

  methods: {
    addItem() {
      this.model.push("");
      this.$forceUpdate();
    },
    removeItem(i) {
      this.model.splice(i, 1);
      this.$forceUpdate();
    },
  },
};
</script>

<style></style>
