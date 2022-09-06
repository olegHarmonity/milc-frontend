<template>
  <span class="feedback-type d-inline-block">
    <!-- Icon -->
    <v-icon :color="color" size="8" class="mr-1 pb-1">mdi-circle</v-icon>

    <!-- Text -->
    {{ $t("feedback.types." + value) }}
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    color() {
      switch (this.value) {
        case "general":
          return "info";

        case "bug":
          return "error";

        case "suggestion":
          return "warning";

        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss"></style>
