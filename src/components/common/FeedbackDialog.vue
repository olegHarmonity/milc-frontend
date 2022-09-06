<template>
  <div class="feedback-dialog text-center" :class="{ cornered }">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn small color="primary" v-bind="attrs" v-on="on">
          <v-icon left>mdi-comment-edit-outline</v-icon>
          Leave feedback
        </v-btn>
      </template>

      <v-form v-model="formValid" @submit.prevent="submit" ref="form">
        <v-card>
          <v-card-title class="text-h5">
            {{ $t("feedback.dialogTitle") }}
          </v-card-title>

          <v-card-text>
            <v-row class="mb-1">
              <v-col cols="auto" class="pt-6">
                <v-label>{{ $t("feedback.type") }}<req /></v-label>
              </v-col>
              <v-col>
                <v-select
                  v-model="formData.type"
                  solo
                  :rules="[rule.required]"
                  :items="types"
                  hide-details
                />
              </v-col>
            </v-row>

            <v-textarea
              v-model="formData.content"
              rows="10"
              :rules="[rule.required]"
              outlined
              hide-details
              autofocus
            />
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Cancel -->
            <v-btn text @click="cancel" class="mr-3">
              {{ $t("buttons.cancel") }}
            </v-btn>

            <v-btn
              color="primary"
              class="px-10"
              type="submit"
              :disabled="!formValid"
              :loading="$store.getters['feedback/loading'].send"
              @click="submit"
            >
              {{ $t("buttons.send") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    cornered: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: false,
      formData: {
        type: "general",
        content: "",
      },
      formResponse: null,
      formValid: false,
    };
  },

  computed: {
    types() {
      return [
        { text: this.$t("feedback.types.general"), value: "general" },
        { text: this.$t("feedback.types.bug"), value: "bug" },
        { text: this.$t("feedback.types.suggestion"), value: "suggestion" },
      ];
    },
  },

  methods: {
    submit() {
      if (this.$store.getters["feedback/loading"].send) {
        return;
      }

      this.$store
        .dispatch("feedback/send", {
          type: this.formData.type,
          content: this.formData.content,
        })
        .then((data) => {
          this.$toast.success(data.message || this.$t("common.success"));
          this.cancel();
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },

    cancel() {
      this.dialog = false;
      this.formData.type = this.types[0].value;
      this.formData.content = "";
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style lang="scss">
.feedback-dialog {
  &.cornered {
    position: absolute;
    bottom: 5px;
    right: 5px;
    z-index: 2;
  }
}
</style>
