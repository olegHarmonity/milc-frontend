<template>
  <v-card
    v-if="dialog"
    class="py-2 px-2 transparent-8"
    style="position: absolute; bottom: 150px; left: 20px; z-index: 9999"
    width="300"
  >
    <!-- <close-button @click="dialog = false" /> -->

    <v-row>
      <v-col id="navigateConfirmClick" class="text-center cursor-pointer">
        <div class="cursor-pointer">
          {{ $t("city.navigateConfirmation.navigate") }}
        </div>
        <label class="cursor-pointer">{{
          title && title.title ? title.title : " - "
        }}</label>
      </v-col>
      <v-col class="text-center col-2">
        <close-button id="navigateCancelClick" @click="dialog = false" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  computed: {
    title: {
      get: function () {
        return this.$store.getters["city/modals"].navigationProps;
      },
    },
    dialog: {
      get: function () {
        return this.$store.getters["city/modals"].navigateConfirmation;
      },
      set: function (val) {
        this.$store.commit("city/SET_MODAL", {
          key: "navigateConfirmation",
          value: val,
        });
      },
    },
  },

  methods: {
    enter() {
      //
    },
  },
};
</script>
