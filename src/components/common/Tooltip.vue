<template>
  <v-tooltip v-bind="$attrs">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" style="cursor: help">
        {{ icon }}
      </v-icon>
    </template>
    <slot>
      {{ text }}
    </slot>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "mdi-information-outline",
    },
    text: {
      type: String,
      required: false,
    },
  },
};
</script>
