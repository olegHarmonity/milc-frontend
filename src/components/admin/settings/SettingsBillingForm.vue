<template>
  <v-form v-model="formValid" ref="form" @submit.prevent="handleSubmit">
    <!-- Bank details -->
    <v-row>
      <!-- IBAN -->
      <v-col cols="12" sm="6" class="pr-md-10">
        <v-label>{{ $t("labels.iban") }}<req /></v-label>
        <v-text-field v-model="formData.iban" :rules="[rule.required]" />
      </v-col>

      <!-- SWIFT -->
      <v-col cols="12" sm="6" class="pl-md-10">
        <v-label>{{ $t("labels.swift") }}<req /></v-label>
        <v-text-field v-model="formData.swift_bic" :rules="[rule.required]" />
      </v-col>

      <!-- Bank name -->
      <v-col cols="12" sm="6" class="pr-md-10">
        <v-label>{{ $t("labels.bankName") }}<req /></v-label>
        <v-text-field v-model="formData.bank_name" :rules="[rule.required]" />
      </v-col>
    </v-row>

    <api-response :response="formResponse" class="mt-3" />

    <div class="text-end mt-5">
      <v-btn
        color="primary"
        width="200"
        :disabled="!formValid"
        :loading="$store.getters['admin/loading'].updateSettings"
        type="submit"
      >
        {{ $t("buttons.save") }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    formData: {
      bank_name: "",
      iban: "",
      swift_bic: "",
    },
    formValid: false,
    formResponse: null,
  }),

  created() {
    this.initData();
  },

  methods: {
    handleSubmit() {
      this.formResponse = null;
      this.$store
        .dispatch("admin/updateSettings", this.formData)
        .then((data) => {
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch((err) => {
          this.formResponse = err.data;
        });
    },

    initData() {
      this.$store.dispatch("admin/fetchSettings").then((data) => {
        this.formData.bank_name = data.bank_name;
        this.formData.iban = data.iban;
        this.formData.swift_bic = data.swift_bic;
      });
    },
  },
};
</script>

<style></style>
