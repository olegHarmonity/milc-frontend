import axios from "@/plugins/axios";

export default {
  namespaced: true,

  state: {
    items: [],
    total: 0,
    loading: {
      fetch: false,
      fetchAll: false,
      fetchAdminDefault: false,
      fetchOrganisationDefault: false,
      updateAdminDefault: false,
      updateOrganisationDefault: false,
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
    async fetch({ commit }, id) {
      try {
        commit("SET_LOADING", { key: "fetch", value: true });

        const res = await axios.get("contracts/" + id);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetch", value: false });
      }
    },

    async fetchByOrderNumber({ commit }, id) {
      try {
        commit("SET_LOADING", { key: "fetch", value: true });

        const res = await axios.get("checkout/contract/" + id);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetch", value: false });
      }
    },

    async fetchAll({ commit, state }, params) {
      try {
        commit("SET_LOADING", { key: "fetchAll", value: true });

        const res = await axios.get("contracts", { params });
        commit("SET_ITEMS", res.data.data);
        commit("SET_TOTAL", res.data.total);
        state.paramsCache = params;

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchAll", value: false });
      }
    },

    async fetchAdminDefault({ commit }) {
      try {
        commit("SET_LOADING", { key: "fetchAdminDefault", value: true });

        const res = await axios.get("contracts/admin-default");

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", {
          key: "fetchAdminDefault",
          value: false,
        });
      }
    },

    async fetchOrganisationDefault({ commit }) {
      try {
        commit("SET_LOADING", { key: "fetchOrganisationDefault", value: true });

        const res = await axios.get("contracts/organisation-default");

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", {
          key: "fetchOrganisationDefault",
          value: false,
        });
      }
    },

    async updateAdminDefault({ commit }, data) {
      try {
        commit("SET_LOADING", {
          key: "updateAdminDefault",
          value: true,
        });

        const res = await axios.put("contracts/admin-default", data);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", {
          key: "updateAdminDefault",
          value: false,
        });
      }
    },

    async updateOrganisationDefault({ commit }, data) {
      try {
        commit("SET_LOADING", {
          key: "updateOrganisationDefault",
          value: true,
        });

        const res = await axios.put("contracts/organisation-default", data);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", {
          key: "updateOrganisationDefault",
          value: false,
        });
      }
    },

    async downloadPdf({ commit }, number) {
      try {
        commit("SET_LOADING", { key: "downloadPdf", value: number });

        const res = await axios.get(
          `download-contract-pdf/${number}?download`,
          {
            responseType: "blob",
            headers: {
              "Content-Disposition": "attachment",
            },
          }
        );

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `milc_contract_${number}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "downloadPdf", value: null });
      }
    },
  },
};
