<template>
  <div class="chat-header">
    <v-avatar size="60">
      <v-img
        :src="organisation.logo || $placeholderImage('60x60', 'MILC')"
        @error="organisation.logo = $placeholderImage('60x60', 'MILC')"
        :alt="organisation.name"
      />
    </v-avatar>

    <h2>{{ organisation.name }}</h2>

    <v-spacer />

    <CustomBundleDialog v-if="$isSeller()" :buyer="organisation" />
  </div>
</template>

<script>
import CustomBundleDialog from "@/components/app/products/bundles/CustomBundleDialog.vue";

export default {
  components: { CustomBundleDialog },

  props: {
    organisation: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.chat-header {
  padding-left: 25px;
  padding-right: 25px;
  align-items: center;
  display: flex;
  h2 {
    padding-left: 23px;
  }
}
</style>
