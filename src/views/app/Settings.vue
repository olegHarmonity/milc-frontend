<template>
  <div id="app-settings" class="page">
    <!-- Title -->
    <h1 class="page-title">{{ $t("settings.title") }}</h1>

    <!-- User details -->
    <h2 class="page-heading">{{ $t("settings.headings.user") }}</h2>

    <v-alert text type="warning" class="mt-5">
      {{ $t("settings.requiredFieldsNotice") }}
    </v-alert>

    <div class="page-section">
      <SettingsUserForm />
    </div>

    <!-- Change password -->
    <h2 class="page-heading">{{ $t("settings.headings.changePassword") }}</h2>
    <div class="page-section">
      <SettingsChangePasswordForm />
    </div>

    <!-- Organisation details -->
    <h2 class="page-heading">{{ $t("settings.headings.organisation") }}</h2>
    <div class="page-section">
      <SettingsOrganisationForm />
    </div>

    <!-- Billing data -->
    <h2 class="page-heading">{{ $t("settings.headings.billing") }}</h2>
    <div class="page-section">
      <SettingsBillingForm />
    </div>
  </div>
</template>

<script>
import SettingsUserForm from "@/components/app/settings/SettingsUserForm.vue";
import SettingsChangePasswordForm from "@/components/app/settings/SettingsChangePasswordForm.vue";
import SettingsOrganisationForm from "@/components/app/settings/SettingsOrganisationForm.vue";
import SettingsBillingForm from "@/components/app/settings/SettingsBillingForm.vue";

export default {
  components: {
    SettingsUserForm,
    SettingsChangePasswordForm,
    SettingsOrganisationForm,
    SettingsBillingForm,
  },
};
</script>

<style></style>
