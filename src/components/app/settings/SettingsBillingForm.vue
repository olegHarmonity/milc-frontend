<template>
  <v-form v-model="formValid" ref="form" @submit.prevent="handleSubmit">
    <!-- Bank details -->
    <v-row>
      <!-- IBAN -->
      <v-col cols="12" sm="6" class="pr-md-10">
        <v-text-field
          rounded
          outlined
          :label="$t('labels.iban')"
          v-model="formData.iban"
          :rules="[rule.required, rule.string.min(5), rule.string.max(34)]"
          maxlength="34"
        />
      </v-col>

      <!-- SWIFT -->
      <v-col cols="12" sm="6" class="pl-md-10">
        <v-text-field
          rounded
          outlined
          :label="$t('labels.swift')"
          v-model="formData.swift_bic"
          :rules="[rule.required, rule.string.min(8), rule.string.max(11)]"
          maxlength="11"
        />
      </v-col>

      <!-- Bank name -->
      <v-col cols="12" sm="6" class="pr-md-10">
        <v-text-field
          rounded
          outlined
          :label="$t('labels.bankName')"
          v-model="formData.bank_name"
          :rules="[rule.required]"
        />
      </v-col>
    </v-row>

    <!-- Vat rules -->
    <!-- <v-label>{{ $t("labels.vatRules") }}</v-label> -->
    <template v-if="$isSeller">
      <v-row class="form-box mt-0">
        <!-- Domestic VAT -->
        <v-col cols="12" sm="6" class="pr-md-10">
          <v-label>{{ $t("labels.vatDomestic") }}<req /></v-label>
          <vat-rule
            v-model="formData.vat_rules[domesticVatIndex]"
            :rules="[rule.required]"
          />
        </v-col>

        <!-- International VAT -->
        <v-col cols="12" sm="6" class="pl-md-10">
          <v-label>{{ $t("labels.vatInternational") }}<req /></v-label>
          <vat-rule
            v-model="formData.vat_rules[intlVatIndex]"
            :rules="[rule.required]"
          />
        </v-col>

        <!-- VAT rules per country -->
        <v-col cols="12" sm="6" class="pr-md-10">
          <v-label>{{ $t("labels.vatCountry") }}</v-label>
          <template v-for="(item, i) in formData.vat_rules">
            <vat-rule
              v-if="item.rule_type === 'by_country'"
              v-model="formData.vat_rules[i]"
              country
              deletable
              @delete="deleteVat(i)"
              :key="i"
              :rules="[rule.required]"
            />
          </template>

          <div class="text-right">
            <v-btn
              text
              small
              style="font-size: 14px"
              @click="addCountryVat"
              tabindex="-1"
            >
              {{ $t("buttons.addAnother") }}
              <v-icon right>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </template>

    <api-response :response="formResponse" class="mt-3" />

    <div class="text-end mt-5">
      <v-btn
        rounded
        color="primary"
        width="200"
        :disabled="!formValid"
        :loading="$store.getters['auth/loading'].updateOrganisation"
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
      vat_rules: [],
    },
    formValid: false,
    formResponse: null,
  }),

  computed: {
    domesticVatIndex() {
      return this.formData.vat_rules?.findIndex(
        (i) => i.rule_type === "domestic"
      );
    },
    intlVatIndex() {
      return this.formData.vat_rules?.findIndex(
        (i) => i.rule_type === "international_other"
      );
    },
  },

  created() {
    this.initData();
  },

  methods: {
    handleSubmit() {
      delete this.formData.vat_rules[this.domesticVatIndex].country;
      delete this.formData.vat_rules[this.intlVatIndex].country;

      this.formResponse = null;
      this.$store
        .dispatch("auth/updateOrganisation", this.formData)
        .then((data) => {
          this.$toast.success(data.message || this.$t("common.success"));
        })
        .catch((err) => {
          this.formResponse = err.data;
        });
    },

    initData() {
      this.formData.bank_name = this.$organisation.bank_name;
      this.formData.iban = this.$organisation.iban;
      this.formData.swift_bic = this.$organisation.swift_bic;
      this.formData.vat_rules = this.$organisation.vat_rules;

      if (!this.formData.vat_rules || !this.formData.vat_rules.length) {
        this.formData.vat_rules = [
          {
            rule_type: "domestic",
            vat: { value: null },
          },
          {
            rule_type: "international_other",
            vat: { value: null },
          },
        ];
      }
    },

    addCountryVat() {
      this.formData.vat_rules.push({
        country: "",
        rule_type: "by_country",
        vat: {},
      });
      this.$forceUpdate();
    },

    deleteVat(i) {
      this.formData.vat_rules.splice(i, 1);
      this.$forceUpdate();
    },
  },
};
</script>

<style></style>
