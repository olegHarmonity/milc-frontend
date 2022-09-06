<template>
  <div v-if="user" id="admin-user" class="page">
    <!-- Header -->
    <v-row class="page-header mb-10">
      <v-col cols="12" md="auto">
        <h1 class="page-title">{{ $fullName(user) }}</h1>
      </v-col>
    </v-row>

    <!-- Status buttons -->
    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col v-for="(status, i) in ['active', 'inactive']" :key="i">
            <v-btn
              :color="user.status == status ? 'primary' : 'secondary'"
              block
              @click="updateStatus(status)"
              :loading="$store.getters['users/loading'].update === user.id"
              :disabled="$store.getters['users/loading'].update === user.id"
            >
              {{ $t(`labels.${status}`) }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-10" />

    <v-row>
      <v-col cols="12" md="6" class="pr-md-10">
        <UserOverview :user="user" />

        <v-divider class="my-10" />

        <div>
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
        </div>
      </v-col>
      <v-col cols="12" md="6" class="pl-md-10">
        <OrganisationOverview :organisation="user.organisation" />
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
    user: null,
    emailContent: "",
  }),

  created() {
    this.$store
      .dispatch("users/fetch", this.$route.params.id)
      .then((user) => {
        this.user = user;
      })
      .catch(() => {
        this.$404();
      });
  },

  methods: {
    updateStatus(status) {
      this.$store
        .dispatch("users/update", {
          id: this.user.id,
          status,
        })
        .then((data) => {
          this.user.status = status;
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch(() => {
          this.$toast.error(this.$t("common.error"));
        });
    },

    sendEmail() {
      this.$store
        .dispatch("emails/send", {
          emails: [this.user.email],
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
