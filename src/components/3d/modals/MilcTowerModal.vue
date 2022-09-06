<template>
  <v-dialog v-model="dialog" width="710">
    <v-card class="px-5 py-10 pa-md-15 text-center transparent-9">
      <close-button @click="dialog = false" />

      <h1 class="mb-5">{{ $t("city.milcTower.title") }}</h1>

      <p class="formatted-text">{{ $t("city.milcTower.text") }}</p>

      <v-btn color="primary" class="px-10 mt-5" @click="enter">
        {{ $t("city.milcTower.button") }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    dialog: {
      get: function () {
        return this.$store.getters["city/modals"].milcTower;
      },
      set: function (val) {
        this.$store.commit("city/SET_MODAL", {
          key: "milcTower",
          value: val,
        });
      },
    },
  },

  methods: {
    enter() {
      //
      //this.$router.push("/exchange-building");
      window.open("https://www.milc.global/", "_blank");
      this.$store.commit("city/HIDE_MODAL", "milcTower");
    },
  },
};
</script>
