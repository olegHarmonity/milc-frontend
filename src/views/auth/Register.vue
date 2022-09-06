<template>
  <div>
    <RegisterUserForm v-if="step == 1" v-model="formData" @next="nextStep" />

    <RegisterOrganisationForm
      v-if="step == 2"
      v-model="formData"
      @next="nextStep"
      @back="step = 1"
    />

    <RegisterSuccess v-if="step == 3" :email="formData.email" />

    <div class="text-center mt-2">
      <small v-if="step != 3">
        {{ $t("register.alreadyHaveAccount") }}
        <router-link :to="{ name: 'auth.login' }">
          {{ $t("buttons.login") }}
        </router-link>
      </small>

      <small v-else>
        <router-link :to="{ name: 'auth.login' }">
          {{ $t("buttons.returnToLogin") }}
        </router-link>
      </small>
    </div>
  </div>
</template>

<script>
import RegisterUserForm from "@/components/auth/register/RegisterUserForm.vue";
import RegisterOrganisationForm from "@/components/auth/register/RegisterOrganisationForm.vue";
import RegisterSuccess from "@/components/auth/register/RegisterSuccess.vue";

export default {
  components: { RegisterUserForm, RegisterOrganisationForm, RegisterSuccess },

  data: () => ({
    step: 1,
    formData: {
      organisation: {},
    },
  }),

  created() {
    this.$store.dispatch("organisationTypes/fetchAll");
  },

  methods: {
    nextStep() {
      if (this.step == 1) {
        this.formData.organisation.country = this.formData.country;
      }

      ++this.step;
    },
  },
};
</script>

<style></style>
