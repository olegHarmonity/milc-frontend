<template>
  <div class="spinner" :class="{ center: this.center }">
    <v-progress-circular
      indeterminate
      :color="color"
      :size="getSize"
      :width="getSize / 15"
    ></v-progress-circular>

    <div class="spinner-text" v-if="text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "primary",
    },
    size: {
      type: [Number, String],
      required: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: false,
    },
  },

  computed: {
    getSize() {
      if (this.size) {
        return this.size;
      }

      if (this.large) {
        return 150;
      }

      if (this.medium) {
        return 75;
      }

      if (this.small) {
        return 25;
      }

      return 50;
    },
  },
};
</script>

<style lang="scss">
.spinner {
  &.center {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .spinner-text {
    margin-top: 20px;
    letter-spacing: 2px;
  }
}
</style>
