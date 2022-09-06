<template>
  <v-row class="bundle-form">
    <v-col cols="auto" class="d-flex flex-column align-center">
      <!-- Bundle button -->
      <v-btn color="primary" class="d-block w-100" height="48">
        Bundle item {{ index }}
      </v-btn>

      <!-- Delete button -->
      <a
        class="text--secondary d-block w-100 text-right mt-1"
        style="text-decoration: underline"
        @click.prevent="$emit('delete')"
      >
        {{ $t("buttons.delete") }}
      </a>

      <div v-if="value.buyer_id" class="w-100" style="color: #e67e22">
        * Custom bundle
      </div>
    </v-col>

    <v-col>
      <!-- Rights select -->
      <v-autocomplete
        v-model="value.rights_information"
        :items="rights"
        :rules="[rule.required, rule.selection.min(1)]"
        item-text="title"
        item-value="id"
        multiple
        chips
        deletable-chips
        solo
      />

      <!-- Money -->
      <v-row>
        <v-col></v-col>
        <v-col cols="auto">
          <v-label>{{ $t("labels.price") }}</v-label>
          <money-field
            v-model="value.price"
            :attrs="{ rules: [rule.required, rule.number.min(1, ' EUR')] }"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    rights: {
      type: Array,
      defualt: () => [],
    },
    index: {
      type: Number,
      required: true,
    },
  },

  created() {
    if (!this.value.price) {
      this.value.price = {
        value: 1.0,
        currency: "EUR",
      };
    }

    if (this.value.rights_information) {
      this.value.rights_information = this.value.rights_information.map(
        (i) => i.id
      );
    }
  },
};
</script>

<style lang="scss">
.bundle-form {
}
</style>
