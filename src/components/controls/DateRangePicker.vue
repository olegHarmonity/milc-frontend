<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        v-bind="{ ...attrs, ...textFieldAttrs }"
        v-on="{ ...on, ...textFieldOn }"
        append-icon="mdi-calendar-outline"
        readonly
        clearable
        @click:clear="clearInput"
      ></v-text-field>
    </template>

    <v-date-picker
      v-model="date"
      color="primary"
      range
      v-bind="attrs"
      v-on="on"
      ref="datePicker"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import dayjs from "dayjs";

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
    textFieldAttrs: {
      type: Object,
    },
    textFieldOn: {
      type: Object,
    },
  },

  data() {
    return {
      menu: false,
    };
  },

  watch: {
    date(val, oldVal) {
      if (!oldVal[1] && val[1]) {
        this.menu = false;
      }
    },
  },

  computed: {
    date: {
      get: function () {
        return this.value;
      },
      set: function (newVal) {
        this.$emit("input", newVal);
      },
    },
    dateFormatted: {
      get: function () {
        if (!this.date || !this.date[0]) {
          return null;
        }

        const format = (date) => dayjs(date).format("DD.MM.YYYY");
        const date1 = this.date[0] ? format(this.date[0]) : "";
        const date2 = this.date[1] ? format(this.date[1]) : "";

        return `${date1} ~ ${date2}`;
      },
      set: function () {},
    },
  },

  methods: {
    clearInput() {
      this.date = [];
      this.$refs.datePicker.$emit("change");
    },
  },
};
</script>

<style></style>
