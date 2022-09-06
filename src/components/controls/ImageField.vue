<template>
  <div
    class="image-field"
    :class="{
      'mt-1': !!imageUrl,
      'd-flex': aside,
      'mb-5': !!imageUrl && aside,
    }"
  >
    <v-img
      v-if="imageUrl"
      :src="imageUrl"
      :width="width"
      :height="height"
      :max-width="width"
      :max-height="height"
      :contain="contain"
      class="rounded cursor-pointer"
      :class="{ rounded: !circle, 'rounded-circle': circle }"
      @click="$refs.fileInput.$refs.input.click()"
      @error="imgError = true"
    />

    <v-file-input
      v-show="!hideInput"
      v-model="model"
      :accept="accept"
      append-icon="mdi-file-upload-outline"
      :class="{ 'align-center': aside, 'ml-5': aside && imageUrl }"
      :hide-details="hideDetails"
      prepend-icon=""
      ref="fileInput"
      :rules="rules"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Object, File],
    },
    width: {
      type: [Number, String],
      default: 100,
    },
    height: {
      type: [Number, String],
      default: 100,
    },
    accept: {
      type: String,
      default: "image/*",
    },
    aside: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    contain: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: [Boolean, String],
      default: false,
    },
    hideInput: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    imgError: false,
  }),

  computed: {
    model: {
      get: function () {
        if (this.value?.id) {
          return {
            ...this.value,
            name: this.value.image_name,
          };
        }

        return this.value;
      },
      set: function (val) {
        this.$emit("input", val);
      },
    },

    placeholderImage() {
      return this.$placeholderImage(
        `${this.width}x${this.height}`,
        this.$t("common.noImage")
      );
    },

    imageUrl() {
      if (!this.value) {
        return this.hideInput ? this.placeholderImage : null;
      }

      if (this.imgError && this.value?.id) {
        return this.placeholderImage;
      }

      return this.model instanceof File
        ? URL.createObjectURL(this.model)
        : this.model.image_url || null;
    },
  },
};
</script>

<style lang="scss"></style>
