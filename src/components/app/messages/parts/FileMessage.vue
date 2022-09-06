<template>
  <div class="message file-message" :class="{ 'own-message': own }">
    <template v-if="isImage">
      <img :src="parsedData.url" :alt="parsedData.name" class="rounded" />
    </template>
    <a :href="parsedData.url" v-else>
      <v-btn large color="primary">
        {{ parsedData.name }}
      </v-btn>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
    own: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      parsedData: null,
      isImage: false,
      validImageExtentions: [
        "svg",
        "jpg",
        "jpeg",
        "png",
        "apng",
        "avif",
        "gif",
        "webp",
      ],
    };
  },
  methods: {
    parseData() {
      return JSON.parse(this.value.body);
    },
  },
  beforeMount() {
    this.parsedData = this.parseData();
    this.isImage =
      this.validImageExtentions.indexOf(
        this.parsedData.extension?.toLowerCase()
      ) >= 0;
  },
};
</script>

<style lang="scss">
.file-message {
  padding: 0 10px;
  img {
    max-width: 293px;
  }
}
</style>
