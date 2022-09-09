<template>
  <v-text-field
    outlined
    rounded
    v-model="password"
    v-bind="attrs"
    v-on="on"
    :type="showPassword ? 'text' : 'password'"
  >
    <template v-slot:append>
      <v-icon @click="showPassword = !showPassword" tabindex="-1">
        <template v-if="showPassword"> mdi-eye-off-outline </template>
        <template v-else> mdi-eye-outline </template>
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    attrs: {
      type: Object,
    },
    on: {
      type: Object,
    },
  },

  data: () => ({
    showPassword: false,
  }),

  computed: {
    password: {
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

<style></style>
