<template>
  <v-dialog v-model="dialog" width="710">
    <v-card style="overflow: hidden">
      <close-button @click="dialog = false" style="z-index: 2" />

      <v-img
        :src="require('@/assets/images/under-construction.png')"
        width="710"
        height="480"
      />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    dialog: {
      get: function () {
        return this.$store.getters["city/modals"].underConstruction;
      },
      set: function (val) {
        this.$store.commit("city/SET_MODAL", {
          key: "underConstruction",
          value: val,
        });
      },
    },
  },
};
</script>
