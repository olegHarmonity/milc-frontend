import Vue from "vue";

import Anchor from "@/components/common/Anchor.vue";
import ApiResponse from "@/components/common/ApiResponse.vue";
import CloseButton from "@/components/common/CloseButton.vue";
import ChipSelect from "@/components/controls/ChipSelect.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import CountryPicker from "@/components/controls/CountryPicker.vue";
import DatePicker from "@/components/controls/DatePicker.vue";
import DateRangePicker from "@/components/controls/DateRangePicker.vue";
import DurationPicker from "@/components/controls/DurationPicker.vue";
import ImageField from "@/components/controls/ImageField.vue";
import LanguagePicker from "@/components/controls/LanguagePicker.vue";
import MultiplePersonField from "@/components/controls/MultiplePersonField.vue";
import MultipleTextField from "@/components/controls/MultipleTextField.vue";
import PasswordField from "@/components/controls/PasswordField.vue";
import PersonField from "@/components/controls/PersonField.vue";
import MoneyField from "@/components/controls/MoneyField.vue";
import Spinner from "@/components/common/Spinner.vue";
import Tooltip from "@/components/common/Tooltip.vue";
import VatRule from "@/components/controls/VatRule.vue";

Vue.component("anchor", Anchor);
Vue.component("api-response", ApiResponse);
Vue.component("close-button", CloseButton);
Vue.component("chip-select", ChipSelect);
Vue.component("confirm-dialog", ConfirmDialog);
Vue.component("country-picker", CountryPicker);
Vue.component("date-picker", DatePicker);
Vue.component("date-range-picker", DateRangePicker);
Vue.component("duration-picker", DurationPicker);
Vue.component("image-field", ImageField);
Vue.component("language-picker", LanguagePicker);
Vue.component("multiple-person-field", MultiplePersonField);
Vue.component("multiple-text-field", MultipleTextField);
Vue.component("password-field", PasswordField);
Vue.component("person-field", PersonField);
Vue.component("money-field", MoneyField);
Vue.component("req", {
  render: (h) => h("span", { style: { color: "var(--v-error-base)" } }, ` *`),
});
Vue.component("spinner", Spinner);
Vue.component("tooltip", Tooltip);
Vue.component("vat-rule", VatRule);
