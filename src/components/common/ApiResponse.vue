<template>
  <v-alert
    v-if="isShown"
    class="api-response"
    :type="response.success ? 'success' : 'error'"
    :icon="false"
    text
  >
    <p class="ma-0">{{ message }}</p>

    <template v-if="response.errors">
      <ul v-for="[key, value] of Object.entries(response.errors)" :key="key">
        <template v-if="Array.isArray(value)">
          <li v-for="(err, index) in value" :key="index">
            {{ err }}
          </li>
        </template>
      </ul>
    </template>
  </v-alert>
</template>

<script>
export default {
  props: {
    response: {
      type: Object,
      required: false,
    },
    successOnly: {
      type: Boolean,
      default: false,
    },
    errorOnly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isEmpty() {
      return !this.response || Object.keys(this.response).length === 0;
    },

    isShown() {
      if (
        this.isEmpty ||
        (this.response.success && this.errorOnly) ||
        (!this.response.success && this.successOnly)
      ) {
        return false;
      }

      return true;
    },

    message() {
      if (this.response.message) {
        return this.response.message;
      }

      if (typeof this.response.error == "string") {
        return this.response.error;
      }

      return this.response.success
        ? this.$t("common.success")
        : this.$t("common.error");
    },
  },
};
</script>

<style lang="scss">
.api-response {
  text-align: left !important;

  button.v-alert__dismissible {
    margin-top: -8px;
    align-self: start;
  }
}
</style>
