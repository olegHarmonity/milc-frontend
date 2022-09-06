<template>
  <a :href="href">{{ content }}</a>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: null,
    },
    email: {
      type: Boolean,
      default: false,
    },
    tel: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    href() {
      if (this.email) {
        return `mailto:${this.value}`;
      }

      if (this.tel) {
        return `tel:${this.value}`;
      }

      return this.value;
    },

    content() {
      return this.text || this.value;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
