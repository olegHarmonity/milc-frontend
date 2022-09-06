import axios from "@/plugins/axios";

export default {
  namespaced: true,

  state: {
    items: [],
    total: 0,
    loading: {
      fetchAll: false,
      fetch: false,
      create: null,
      changeState: null,
      contractResponse: false,
      changeCurrency: false,
      payBankTransfer: false,
      payPaypal: false,
      payStripe: false,
      paymentSuccess: false,
      paymentError: false,
      downloadPdf: null,
    },
    paramsCache: null,
  },

  getters: {
    items: (state) => state.items,
    total: (state) => state.total,
    loading: (state) => state.loading,
  },

  mutations: {
    SET_ITEMS(state, value) {
      state.items = value;
    },
    SET_TOTAL(state, value) {
      state.total = value;
    },
    SET_LOADING(state, { key, value }) {
      state.loading[key] = value;
    },
  },

  actions: {
    async fetchAll({ commit, state }, params) {
      try {
        commit("SET_LOADING", { key: "fetchAll", value: true });

        const res = await axios.get("orders", { params });
        commit("SET_ITEMS", res.data.data);
        commit("SET_TOTAL", res.data.total);
        state.paramsCache = params;

        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchAll", value: false });
      }
    },

    async fetch({ commit }, id) {
      try {
        commit("SET_LOADING", { key: "fetch", value: true });

        const res = await axios.get("orders/" + id);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetch", value: false });
      }
    },

    async fetchByNumber({ commit }, number) {
      try {
        commit("SET_LOADING", { key: "fetch", value: true });

        const res = await axios.get("checkout/" + number);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetch", value: false });
      }
    },

    async create({ commit }, rights_bundle_id) {
      try {
        commit("SET_LOADING", { key: "create", value: rights_bundle_id });

        const res = await axios.post("orders", { rights_bundle_id });

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "create", value: null });
      }
    },

    async changeState({ commit }, { number, state }) {
      try {
        commit("SET_LOADING", { key: "changeState", value: state });

        const res = await axios.put(`checkout/mark-${state}/${number}`);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "changeState", value: null });
      }
    },

    async downloadPdf({ commit }, number) {
      try {
        commit("SET_LOADING", { key: "downloadPdf", value: number });

        const res = await axios.get(`download-order-pdf/${number}?download`, {
          responseType: "blob",
          headers: {
            "Content-Disposition": "attachment",
          },
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `milc_order_${number}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "downloadPdf", value: null });
      }
    },

    //---------------------------------------------------------------------
    // Checkout actions below ---------------------------------------------
    //---------------------------------------------------------------------

    async contractResponse({ commit }, { id, response }) {
      try {
        commit("SET_LOADING", { key: "contractResponse", value: true });

        const res = await axios.put("checkout/update-contract/" + id, {
          accept_contract: response,
        });

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "contractResponse", value: false });
      }
    },

    async changeCurrency({ commit }, { id, currency }) {
      try {
        commit("SET_LOADING", { key: "changeCurrency", value: true });

        const res = await axios.put("checkout/change-currency/" + id, {
          pay_in_currency: currency,
        });

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "changeCurrency", value: false });
      }
    },

    async payBankTransfer({ commit }, id) {
      try {
        commit("SET_LOADING", { key: "payBankTransfer", value: true });

        const res = await axios.put("checkout/pay-bank-transfer/" + id);

        return res.data;
      } catch (err) {
        return Promise.reject(err?.response?.data);
      } finally {
        commit("SET_LOADING", { key: "payBankTransfer", value: false });
      }
    },

    async payPaypal({ commit }, id) {
      try {
        commit("SET_LOADING", { key: "payPaypal", value: true });

        const res = await axios.put("checkout/pay-paypal/" + id);

        window.location = res.data.redirect_link;
      } catch (err) {
        return Promise.reject(err?.response?.data);
      } finally {
        commit("SET_LOADING", { key: "payPaypal", value: false });
      }
    },

    async payStripe({ commit }, { id, data }) {
      try {
        commit("SET_LOADING", { key: "payStripe", value: true });

        const res = await axios.put("checkout/pay-stripe/" + id, data);

        return res.data;
      } catch (err) {
        return Promise.reject(err?.response?.data);
      } finally {
        commit("SET_LOADING", { key: "payStripe", value: false });
      }
    },

    async paymentSuccess({ commit }, { id, query }) {
      try {
        commit("SET_LOADING", { key: "paymentSuccess", value: true });

        const res = await axios.put("payment-success/" + id + "?" + query);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err?.response?.data);
      } finally {
        commit("SET_LOADING", { key: "paymentSuccess", value: false });
      }
    },

    async paymentError({ commit }, id) {
      try {
        commit("SET_LOADING", { key: "paymentError", value: true });

        const res = await axios.put("payment-error/" + id);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err?.response?.data);
      } finally {
        commit("SET_LOADING", { key: "paymentError", value: false });
      }
    },
  },
};
