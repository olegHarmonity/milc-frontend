import dayjs from "@/plugins/dayjs";
import i18n from "@/plugins/i18n";
import router from "@/router";
import { ROLES } from "@/utils/config/constants";

import { getName as countryGetName } from "i18n-iso-countries";
import { getName as langGetName } from "@cospired/i18n-iso-languages";

export default {
  methods: {
    $404() {
      router.replace({ name: "not-found" });
    },

    $alert(message = "") {
      alert(message);
    },

    $codeToCountry(code) {
      if (Array.isArray(code)) {
        return code.map((c) => countryGetName(c, i18n.locale));
      }

      return countryGetName(code, i18n.locale);
    },

    $codeToLanguage(code) {
      if (Array.isArray(code)) {
        return code.map((c) => langGetName(c, i18n.locale));
      }

      return langGetName(code, i18n.locale);
    },

    $dayjs(...args) {
      return dayjs(...args);
    },

    $deepCopy(object) {
      return JSON.parse(JSON.stringify(object));
    },

    $diff(orig, updated, jsons = []) {
      const result = {};

      function iter(u, o, r) {
        Object.keys(u).forEach(function (k) {
          if (u[k] !== null && typeof u[k] === "object") {
            if (u[k] instanceof File) {
              r[k] = u[k];
            } else {
              r[k] = {};
              iter(u[k], o[k], r[k]);
              if (Object.keys(r[k]).length === 0) {
                delete r[k];
              }
            }
            return;
          }

          if (o[k] === "undefined" || u[k] !== o[k]) {
            r[k] = u[k];
          }
        });
      }

      iter(updated, orig, result);

      jsons.forEach((k) => {
        if (result[k]) {
          result[k] = updated[k];
        }
      });

      return result;
    },

    $env(variableName) {
      return process.env[`VUE_APP_${variableName}`];
    },

    $formatDate(date) {
      return date ? dayjs(date).format("DD.MM.YYYY") : null;
    },

    $formatDatetime(date) {
      return date ? dayjs(date).format("DD.MM.YYYY HH:mm") : null;
    },

    $formatDuration(duration, unit = "seconds", format = "H[h] m[m]") {
      return dayjs.duration(+duration, unit).format(format);
    },

    $formatMoney(number, currency = "EUR") {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency,
      }).format(number);
    },

    $fullAddress(object) {
      const arr = [];

      ["address", "postal_code", "city", "country"].forEach((key) => {
        if (object[key]) {
          if (key == "country") {
            arr.push(this.$codeToCountry(object[key]));
          } else {
            arr.push(object[key]);
          }
        }
      });

      return arr
        .join(", ")
        .replace(`${object.postal_code}, `, `${object.postal_code} `);
    },

    $fullName(user) {
      return `${user.first_name} ${user.last_name}`;
    },

    $goBack() {
      if (window.history.length > 2) {
        router.back();
      }

      router.push(this.$platformRoute).catch(() => {});
    },

    $isAdmin(user = null) {
      if (user === null) {
        user = this.$user;
      }

      return user && user.role === ROLES.ADMIN;
    },

    $isBuyer(org = null) {
      if (org === null) {
        org = this.$organisation;
      }

      return (
        org &&
        (org?.organisation_role == "buyer" || org?.organisation_role == "both")
      );
    },

    $isOrganisationOwner(user, organisation = null) {
      if (!organisation) {
        return user.role === ROLES.ORGANISATION_ADMIN;
      }

      return (
        user.role === ROLES.ORGANISATION_ADMIN &&
        user.organisation_id === organisation.id
      );
    },

    $isSeller(org = null) {
      if (org === null) {
        org = this.$organisation;
      }

      return (
        org &&
        (org?.organisation_role == "seller" || org?.organisation_role == "both")
      );
    },

    $log(...args) {
      console.log(...args);
    },

    $placeholderImage(size = "150x150", text = "MILC Platform") {
      return `https://via.placeholder.com/${size}/555555?text=${text}`;
    },

    $productImage(product, placeholderSize = "150x230") {
      return (
        product?.marketing_assets?.key_artwork?.image_url ||
        product?.marketing_assets?.key_artwork?.image?.image_url ||
        this.$placeholderImage(placeholderSize)
      );
    },
  },
};
