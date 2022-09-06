import dayjs from "@/plugins/dayjs";
import i18n from "../../plugins/i18n";
import PhoneNumber from "awesome-phonenumber";

export default {
  data: () => ({
    rule: {
      creditCard: (v) =>
        !v ||
        /^([0-9]{4}[\s-]?){3}([0-9]{4})$/.test(v) ||
        i18n.t("rules.creditCard"),

      cvv: (v) => !v || /^[0-9]{3,4}$/.test(v) || i18n.t("rules.cvv"),

      date: (v) =>
        !v || dayjs(v, "DD.MM.YYYY", true).isValid() || i18n.t("rules.date"),

      duration: (v) =>
        !v ||
        /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/.test(v) ||
        i18n.t("rules.duration"),

      email: (v) => !v || /\S+@\S+\.\S+/.test(v) || i18n.t("rules.email"),

      expirationDate: (v) =>
        !v ||
        /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(v) ||
        i18n.t("rules.expirationDate"),

      number: {
        greater:
          (compareValue, suffix = "") =>
          (v) =>
            !v ||
            !compareValue ||
            Number(v) > Number(compareValue) ||
            i18n.t("rules.greater", { n: compareValue, suffix }),

        less:
          (compareValue, suffix = "") =>
          (v) =>
            !v ||
            !compareValue ||
            Number(v) < Number(compareValue) ||
            i18n.t("rules.less", { n: compareValue, suffix }),

        max:
          (maxValue, suffix = "") =>
          (v) =>
            !v ||
            !maxValue ||
            Number(v) >= Number(maxValue) ||
            i18n.t("rules.number.max", { n: maxValue, suffix }),

        min:
          (minValue, suffix = "") =>
          (v) =>
            !v ||
            !minValue ||
            Number(v) >= Number(minValue) ||
            i18n.t("rules.number.min", { n: minValue, suffix }),
      },

      password: (v) =>
        !v ||
        /^(?=.*[a-z]|[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(v) ||
        i18n.t("rules.password"),

      phone: (v) => !v || new PhoneNumber(v).isValid() || i18n.t("rules.phone"),

      time24: (v) =>
        !v || /^([01]\d|2[0-3]):([0-5]\d)$/.test(v) || i18n.t("rules.time24"),

      required: (v) => !!v || v === "0" || v === 0 || i18n.t("rules.required"),

      same: (fieldName, fieldVal) => (v) =>
        v === fieldVal || i18n.t("rules.same", { field: fieldName }),

      selection: {
        max: (n) => (v) =>
          !v || v.length <= n || i18n.t("rules.selection.max", { n }),
        min: (n) => (v) =>
          !v || v.length >= n || i18n.t("rules.selection.min", { n }),
      },

      string: {
        size: (n) => (v) =>
          (v && v.length == n) || i18n.t("rules.string.size", { n }),
        max: (n) => (v) =>
          !v || v.length <= n || i18n.t("rules.string.max", { n }),
        min: (n) => (v) =>
          !v || v.length >= n || i18n.t("rules.string.min", { n }),
      },

      url: (v) =>
        !v ||
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(
          v
        ) ||
        i18n.t("rules.url"),

      year: (v) => !v || /^(19|20)\d{2}$/.test(v) || i18n.t("rules.year"),
    },
  }),
};
