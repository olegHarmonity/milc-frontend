<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" class="mb-5" v-bind="attrs" v-on="on">
        {{ $t("products.contactSeller.button") }}
      </v-btn>
    </template>

    <v-form v-model="formValid" @submit.prevent="submit" ref="form">
      <v-card>
        <v-card-title class="text-h5 mb-3">
          {{ $t("products.contactSeller.title") }}
        </v-card-title>

        <v-card-text>
          <p>{{ $t("products.contactSeller.text") }}</p>

          <v-textarea
            v-model="formData.message"
            :rules="[rule.required]"
            outlined
            hide-details="auto"
            rows="8"
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text class="px-5" @click="cancel">
            {{ $t("buttons.cancel") }}
          </v-btn>

          <v-btn
            color="primary"
            class="px-10 ml-5"
            :disabled="!formValid"
            :loading="$store.getters['messages/loading'].startChat"
            type="submit"
          >
            {{ $t("buttons.send") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    dialog: false,
    formData: {
      message: "",
    },
    formValid: false,
  }),

  methods: {
    submit() {
      this.$store
        .dispatch("messages/startChat", {
          ...this.formData,
          product_id: this.product.id,
        })
        .then(() => {
          this.$router.push({
            name: "app.messages",
          });
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },

    cancel() {
      this.dialog = false;
      this.$refs.form.reset();
    },
  },
};
</script>
