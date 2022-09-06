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

        {{ buttonText }}
      </v-btn>
    </template>

    <!-- Card -->
    <v-card>
      <!-- Content -->
      <v-card-text class="pt-5 pb-0">
        <v-form v-model="formValid" ref="form">
          <!-- Image -->
          <image-field
            v-model="formData.image"
            width="100"
            height="100"
            circle
            aside
            hide-input
          />

          <!-- First name -->
          <v-label>{{ $t("labels.firstName") }}<req /></v-label>
          <v-text-field
            v-model="formData.first_name"
            :rules="[rule.required]"
          />

          <!-- Last name -->
          <v-label>{{ $t("labels.lastName") }}<req /></v-label>
          <v-text-field v-model="formData.last_name" :rules="[rule.required]" />
        </v-form>
      </v-card-text>

      <v-divider />

      <!-- Actions -->
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="cancel" class="mr-3">
          {{ $t("buttons.cancel") }}
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!formValid"
          @click="save"
          :loading="
            $store.getters['people/loading'].create ||
            !!$store.getters['people/loading'].update
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
    person: {
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
        if (this.person) {
          this.formData = this.$deepCopy(this.person);
        }
      }
    },
  },

  methods: {
    save() {
      this.person ? this.update() : this.create();
    },
    cancel() {
      if (!this.person) {
        this.$refs.form.reset();
      }

      this.dialog = false;
    },
    create() {
      this.formResponse = null;
      this.$store
        .dispatch(`people/create`, this.getFormData())
        .then((data) => {
          this.cancel();
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch((resp) => {
          this.formResponse = resp.data;
        });
    },
    update() {
      this.formResponse = null;
      this.$store
        .dispatch(`people/update`, this.getFormData())
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
