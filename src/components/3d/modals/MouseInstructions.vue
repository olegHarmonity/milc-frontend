<template>
  <v-card
    v-if="dialog"
    class="py-5 px-7 transparent-8"
    style="position: absolute; bottom: 20px; left: 20px"
    width="300"
  >
    <!-- <close-button @click="dialog = false" /> -->

    <v-row>
      <v-col class="text-center">
        <label>{{ $t("city.mouseInstructions.rotate") }}</label>
        <v-img
          width="35"
          :src="require('@/assets/images/mouse-left-click.png')"
          class="mx-auto mt-1"
        />
      </v-col>
      <v-col class="text-center">
        <label>{{ $t("city.mouseInstructions.pan") }}</label>
        <v-img
          width="35"
          :src="require('@/assets/images/mouse-right-click.png')"
          class="mx-auto mt-1"
        />
      </v-col>
      <v-col class="text-center">
        <label>{{ $t("city.mouseInstructions.zoom") }}</label>
        <v-img
          width="35"
          :src="require('@/assets/images/mouse-scroll.png')"
          class="mx-auto mt-1"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  computed: {
    dialog: {
      get: function () {
        return this.$store.getters["city/modals"].mouseInstructions;
      },
      set: function (val) {
        this.$store.commit("city/SET_MODAL", {
          key: "mouseInstructions",
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
