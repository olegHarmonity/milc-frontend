<template>
  <v-dialog v-model="dialog" width="710">
    <v-card class="px-5 py-10 pa-md-15 text-center transparent-9">
      <close-button @click="dialog = false" />

      <h1 class="mb-5">{{ $t("city.shoppingCenter.title") }}</h1>

      <p class="formatted-text">{{ $t("city.shoppingCenter.text") }}</p>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    dialog: {
      get: function () {
        return this.$store.getters["city/modals"].shoppingCenter;
      },
      set: function (val) {
        this.$store.commit("city/SET_MODAL", {
          key: "shoppingCenter",
          value: val,
        });
      },
    },
  },

  methods: {
    enter() {
      //
      //this.$router.push("/exchange-building");
      this.$store.commit("city/HIDE_MODAL", "shoppingCenter");
    },
  },
};
</script>
