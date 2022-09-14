<template>
  <v-form v-model="formValid" @submit.prevent="handleSubmit" autocomplete="off">
    <div class="text-center mb-5" style="position: relative">
      <v-btn
        icon
        class="mt-5"
        style="position: absolute; left: 0"
        @click="$emit('back')"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <h1 class="ml-10 ml-sm-0">{{ $t("register.org.heading") }}</h1>
      <div class="subtitle-1 ml-10 ml-sm-0">
        {{ $t("register.org.subheading") }}
      </div>
      <v-img
        :src="require(`@/assets/logos/milc-56.png`)"
        width="60"
        class="mx-auto cursor-pointer"
        @click="$router.push({ name: 'home' })"
      />
    </div>

    <div>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            outlined
            rounded
            v-model="value.organisation.organisation_name"
            :label="$t('labels.orgName')"
            :rules="[rule.required]"
            ref="organisationName"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            outlined
            rounded
            v-model="value.organisation.registration_number"
            :label="$t('labels.registrationNumber')"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <country-picker
            v-model="value.organisation.country"
            :attrs="{
              label: $t('labels.country'),
              rules: [rule.required],
              autocomplete: 'new-password',
            }"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            outlined
            rounded
            v-model="value.organisation.organisation_type_id"
            :label="$t('labels.orgType')"
            :rules="[rule.required]"
            :items="$store.getters['organisationTypes/items']"
            item-text="name"
            item-value="id"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-textarea
            v-model="value.organisation.description"
            :label="$t('labels.description')"
            :rules="[rule.required]"
            outlined
            rows="6"
            counter="500"
            maxlength="500"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-item-group
            v-model="value.organisation.organisation_role"
            class="d-flex justify-space-between mb-7"
          >
            <v-item value="buyer" v-slot="{ active, toggle }">
              <v-btn rounded outlined @click="toggle">
                {{ $t("org.buyer") }}
              </v-btn>
            </v-item>

            <v-item value="seller" v-slot="{ active, toggle }">
              <v-btn rounded outlined @click="toggle">
                {{ $t("org.seller") }}
              </v-btn>
            </v-item>
            <v-item value="both" v-slot="{ active, toggle }">
              <v-btn rounded outlined @click="toggle">
                {{ $t("org.both") }}
              </v-btn>
            </v-item>
          </v-item-group>

          <!-- <v-item-group
            v-model="value.organisation.organisation_role"
            mandatory
            class="mb-4 w-150 justify-space-between"
          >
            <v-item value="buyer">
              <v-btn rounded outlined class="w-30 mr-10">
                {{ $t("org.buyer") }}
              </v-btn>
            </v-item>

            <v-item value="seller">
              <v-btn rounded outlined class="w-30 mr-10">
                {{ $t("org.seller") }}
              </v-btn>
            </v-item>
            <v-item value="both">
              <v-btn rounded outlined class="w-30">
                {{ $t("org.both") }}
              </v-btn>
            </v-item>
          </v-item-group> -->
          <v-text-field
            rounded
            outlined
            v-model="value.organisation.website_link"
            :label="$t('labels.website')"
            :rules="[rule.url]"
          />
          <v-row class="d-flex justify-space-between pl-5">
            <v-col cols="8" class="d-flex align-center">
              <span>Company logo</span>
            </v-col>
            <v-col cols="2" class="d-flex justify-end pt-0">
              <v-file-input
                v-model="value.organisation.logo"
                :label="$t('labels.orgLogo')"
                accept=".jpg, .jpeg, .png"
                show-size
                prepend-icon="$vuetify.icons.upload"
                hide-details="auto"
                hide-input
              ></v-file-input
            ></v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <api-response :response="formResponse" error-only class="mt-3" />

    <div class="text-center mt-5">
      <v-btn
        rounded
        color="primary"
        width="280"
        type="submit"
        :disabled="!formValid"
        :loading="$store.getters['auth/loading'].register"
      >
        {{ $t("buttons.createAccount") }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    formValid: false,
    formResponse: null,
  }),

  mounted() {
    this.$refs.organisationName.focus();
  },

  methods: {
    handleSubmit() {
      this.formResponse = null;
      this.$store
        .dispatch("auth/register", this.value)
        .then(() => {
          this.$emit("next");
        })
        .catch((err) => {
          this.formResponse = err.data;
        });
    },
  },
};
</script>

<style></style>
