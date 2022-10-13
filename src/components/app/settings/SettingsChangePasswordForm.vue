<template>
  <v-form v-model="formValid" ref="form" @submit.prevent="handleSubmit">
    <div>
      <v-row>
        <v-col cols="12" sm="6" class="pr-md-10">
          <password-field
            :label="$t('labels.passwordCurrent')"
            v-model="formData.old_password"
            :attrs="{
              label: $t('labels.passwordCurrent'),
              rules: [rule.required],
            }"
          />
        </v-col>
        <v-col cols="12" sm="6" class="pl-md-10">
          <password-field
            v-model="formData.new_password"
            :attrs="{
              label: $t('labels.passwordNew'),
              rules: [rule.required, rule.password],
            }"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" offset-sm="6" class="pl-md-10">
          <password-field
            v-model="formData.password_confirmation"
            :attrs="{
              label: $t('labels.passwordConfirm'),
              rules: [
                rule.required,
                rule.same($t('labels.passwordNew'), formData.new_password),
              ],
            }"
          />
        </v-col>
      </v-row>
    </div>

    <api-response :response="formResponse" class="mt-3" />

    <div class="text-end mt-5">
      <v-btn
        rounded
        color="primary"
        width="200"
        :disabled="!formValid"
        :loading="$store.getters['auth/loading'].changePassword"
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
    formData: {},
    formValid: false,
    formResponse: null,
  }),

  methods: {
    handleSubmit() {
      this.formResponse = null;
      this.$store
        .dispatch("auth/changePassword", this.formData)
        .then((data) => {
          this.$toast.success(data.message);
          this.$refs.form.reset();
        })
        .catch((err) => {
          this.formResponse = err.data;
        });
    },
  },
};
</script>

<style></style>
