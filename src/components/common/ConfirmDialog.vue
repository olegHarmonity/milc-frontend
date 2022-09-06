<template>
  <v-dialog v-model="dialog" width="500">
    <!-- Button -->
    <template v-slot:activator="{ on, attrs }">
      <!-- Button slot (default) -->
      <slot name="button" v-bind="{ on, attrs }">
        <v-btn v-bind="{ attrs, ...buttonAttrs }" v-on="on">
          <v-icon v-if="buttonIcon" left>
            {{ buttonIcon }}
          </v-icon>

          {{ buttonText || $t("buttons.confirm") }}
        </v-btn>
      </slot>
    </template>

    <!-- Card -->
    <v-card>
      <!-- Title -->
      <v-card-title class="text-h5 lighten-2">
        <slot name="title">
          {{ title || $t("confirmDialog.title") }}
        </slot>
      </v-card-title>

      <!-- Content -->
      <v-card-text>
        <slot>
          {{ text || $t("confirmDialog.text") }}
        </slot>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Actions -->
      <v-card-actions>
        <slot name="actions">
          <v-spacer></v-spacer>
          <v-btn text @click="cancel" class="mr-3">
            {{ $t("buttons.cancel") }}
          </v-btn>
          <v-btn color="primary" @click="confirm" class="px-5">
            {{ $t("buttons.confirm") }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    buttonText: {
      type: String,
      required: false,
    },
    buttonAttrs: {
      type: Object,
      required: false,
    },
    buttonIcon: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    confirm() {
      this.dialog = false;
      this.$emit("confirm");
    },
    cancel() {
      this.dialog = false;
      this.$emit("cancel");
    },
  },
};
</script>
