<template>
  <div v-if="organisation" id="admin-organisations" class="page">
    <!-- Header -->
    <v-row class="page-header mb-10">
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ organisation.organisation_name }}</h1>
      </v-col>
    </v-row>

    <!-- Status buttons -->
    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col
            v-for="(status, i) in ['accepted', 'pending', 'declined']"
            :key="i"
          >
            <v-btn
              :color="organisation.status == status ? 'primary' : 'secondary'"
              block
              @click="updateStatus(status)"
              :loading="
                $store.getters['organisations/loading'].updateStatus == status
              "
              :disabled="$store.getters['organisations/loading'].update"
            >
              {{ $t(`buttons.${status}`) }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-10" />

    <v-row>
      <v-col cols="12" md="6" class="pr-md-10">
        <OrganisationOverview :organisation="organisation" />
      </v-col>
      <v-col cols="12" md="6" class="pl-md-10">
        <UserOverview :user="organisation.organisation_owner" />
      </v-col>
    </v-row>

    <!-- <v-divider class="my-10" /> -->

    <!-- Send email -->
    <v-row>
      <v-col cols="12" md="6">
        <v-label>{{ $t("common.sendEmail") }}</v-label>

        <v-textarea v-model="emailContent" outlined hide-details />

        <div class="text-right">
          <v-btn
            @click="sendEmail"
            :loading="$store.getters['emails/loading'].send"
            color="primary"
            class="mt-5 px-10"
          >
            {{ $t("buttons.send") }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import OrganisationOverview from "@/components/admin/organisations/OrganisationOverview.vue";
import UserOverview from "@/components/admin/users/UserOverview.vue";

export default {
  components: { OrganisationOverview, UserOverview },

  data: () => ({
    organisation: null,
    emailContent: "",
  }),

  created() {
    this.$store
      .dispatch("organisations/fetch", this.$route.params.id)
      .then((org) => {
        this.organisation = org;
      })
      .catch(() => {
        this.$404();
      });
  },

  methods: {
    updateStatus(status) {
      this.$store
        .dispatch("organisations/updateStatus", {
          id: this.organisation.id,
          status,
        })
        .then((data) => {
          this.organisation.status = status;
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },

    sendEmail() {
      this.$store
        .dispatch("emails/send", {
          emails: [
            this.organisation.email,
            this.organisation.organisation_owner.email,
          ],
          message: this.emailContent,
        })
        .then((data) => {
          this.emailContent = "";
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },
  },
};
</script>

<style></style>
