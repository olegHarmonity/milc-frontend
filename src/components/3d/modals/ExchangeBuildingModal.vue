<template>
  <v-dialog v-model="dialog" width="710">
    <v-card class="px-5 py-10 pa-md-15 text-center transparent-9">
      <close-button @click="dialog = false" />

      <h1 class="mb-5">{{ $t("city.exchangeBuilding.title") }}</h1>

      <p class="formatted-text">{{ $t("city.exchangeBuilding.text") }}</p>

      <v-btn color="primary" class="px-10 mt-5" @click="enter">
        {{ $t("city.exchangeBuilding.button") }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    dialog: {
      get: function () {
        return this.$store.getters["city/modals"].exchangeBuilding;
      },
      set: function (val) {
        this.$store.commit("city/SET_MODAL", {
          key: "exchangeBuilding",
          value: val,
        });
      },
    },
  },

  methods: {
    enter() {
      //
      this.$router.push("/exchange-building");
      this.$store.commit("city/HIDE_MODAL", "exchangeBuilding");
    },
  },
};
</script>
