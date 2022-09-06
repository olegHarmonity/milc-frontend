<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{}">
      <v-text-field
        v-model="model"
        v-bind="$attrs"
        v-mask="'##.##.####'"
        placeholder="DD.MM.YYYY"
        append-icon="mdi-calendar-outline"
        clearable
        @click:append="menu = !menu"
      />
    </template>

    <v-date-picker
      v-model="picker"
      @input="menu = false"
      color="primary"
      :min="min"
      :max="max"
    />
  </v-menu>
</template>

<script>
import dayjs from "@/plugins/dayjs";

export default {
  inheritAttrs: false,

  props: {
    value: {
      type: String,
    },
    min: {
      type: String,
      required: false,
    },
    max: {
      type: String,
      required: false,
    },
  },

  data: () => ({
    menu: false,
  }),

  computed: {
    model: {
      get: function () {
        return this.isValueDateValid()
          ? this.$formatDate(this.value)
          : this.value;
      },
      set: function (v) {
        if (this.isInputDateValid(v)) {
          const value = dayjs(v, "DD.MM.YYYY").format("YYYY-MM-DD");
          this.$emit("input", value);
        } else {
          this.$emit("input", v);
        }

        this.$forceUpdate();
      },
    },

    picker: {
      get: function () {
        return this.isValueDateValid() ? this.value : null;
      },
      set: function (v) {
        this.$emit("input", v);
      },
    },
  },

  methods: {
    isValueDateValid() {
      return dayjs(this.value, "YYYY-MM-DD", true).isValid();
    },

    isInputDateValid(date) {
      return dayjs(date, "DD.MM.YYYY", true).isValid();
    },
  },
};
</script>

<style></style>
