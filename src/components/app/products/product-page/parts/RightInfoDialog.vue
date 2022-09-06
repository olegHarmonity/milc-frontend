<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="icon"
        icon
        color="white"
        class="ml-2 mb-1"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>

      <v-btn v-else color="secondary" v-bind="attrs" v-on="on">
        {{ $t("buttons.seeMore") }}
      </v-btn>
    </template>

    <v-card class="pa-7">
      <close-button @click="dialog = false" />

      <spinner v-if="!right" large center style="height: 300px" />

      <RightInfo v-else :right="right" full />
    </v-card>
  </v-dialog>
</template>

<script>
import RightInfo from "./RightInfo.vue";

export default {
  components: { RightInfo },

  props: {
    id: {
      type: Number,
      required: true,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: false,
      right: null,
    };
  },

  watch: {
    dialog(val) {
      if (val && !this.right) {
        this.$store
          .dispatch("products/fetchRightInfo", this.id)
          .then((right) => (this.right = right))
          .catch(() => {
            this.$toast.error(this.$t("common.error"));
            this.dialog = false;
          });
      }
    },
  },
};
</script>
