<template>
  <v-dialog v-model="dialog" width="500">
    <!-- Button -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="{ attrs, ...buttonAttrs }"
        v-on="on"
        @click="
          dialog = true;
          $emit('click');
        "
      >
        <v-icon v-if="buttonIcon" left>
          {{ buttonIcon }}
        </v-icon>

        {{ buttonText || $t("buttons.addCategory") }}
      </v-btn>
    </template>

    <!-- Card -->
    <v-card>
      <v-card-title>
        {{
          category
            ? $t("categories.editCategory")
            : $t("categories.addCategory")
        }}
      </v-card-title>

      <!-- Content -->
      <v-card-text class="pt-5 pb-0">
        <v-form v-model="formValid" ref="form">
          <v-label>{{ $t("labels.image") }}<req /></v-label>
          <image-field
            v-model="formData.image"
            width="250"
            height="180"
            :rules="[rule.required]"
          />

          <v-label>{{ $t("labels.name") }}<req /></v-label>
          <v-text-field v-model="formData.name" :rules="[rule.required]" />
        </v-form>

        <api-response :response="formResponse" />
      </v-card-text>

      <v-divider></v-divider>

      <!-- Actions -->
      <v-card-actions>
        <v-spacer></v-spacer>

        <!-- Cancel -->
        <v-btn text @click="cancel" class="mr-3">
          {{ $t("buttons.cancel") }}
        </v-btn>

        <!-- Save -->
        <v-btn
          color="primary"
          @click="save"
          :disabled="!formValid"
          :loading="
            $store.getters['movieGenres/loading'].create ||
            !!$store.getters['movieGenres/loading'].update
          "
          class="px-10"
        >
          {{ $t("buttons.save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
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
      default: "mdi-plus",
    },
  },

  data() {
    return {
      dialog: false,
      formData: {},
      formValid: false,
      formResponse: null,
    };
  },

  watch: {
    dialog(val) {
      if (val) {
        if (this.category) {
          this.formData = this.$deepCopy(this.category);
        }
      }
    },
  },

  methods: {
    save() {
      this.category ? this.update() : this.create();
    },

    cancel() {
      if (!this.category) {
        this.$refs.form.reset();
      }

      this.dialog = false;
    },

    create() {
      this.formResponse = null;
      this.$store
        .dispatch(`movieGenres/create`, this.getFormData())
        .then((data) => {
          this.cancel();
          this.$toast.success(data.message || this.$t("common.success"));
          this.$store.dispatch("movieGenres/fetchAll", true);
        })
        .catch((resp) => {
          this.formResponse = resp.data;
        });
    },

    update() {
      this.formResponse = null;
      this.$store
        .dispatch(`movieGenres/update`, this.getFormData())
        .then((data) => {
          this.cancel();
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch((resp) => {
          this.formResponse = resp.data;
        });
    },

    getFormData() {
      const data = Object.assign({}, this.formData);
      delete data.image_id;

      if (!(this.formData.image instanceof File)) {
        delete data.image;
      }

      return data;
    },
  },
};
</script>
