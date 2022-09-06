import axios from "@/plugins/axios";

export default {
  namespaced: true,

  state: {
    settings: null,
    loading: {
      fetchSettings: false,
      updateSettings: false,
    },
  },

  getters: {
    settings: (state) => state.settings,
    loading: (state) => state.loading,
  },

  mutations: {
    SET_SETTINGS(state, value) {
      state.settings = value;
    },
    SET_LOADING(state, { key, value }) {
      state.loading[key] = value;
    },
  },

  actions: {
    async fetchSettings({ commit, state }) {
      if (state.settings !== null) {
        return state.settings;
      }

      try {
        commit("SET_LOADING", { key: "fetchSettings", value: true });

        const res = await axios.get("admin-settings/1");
        commit("SET_SETTINGS", res.data.data);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err?.response?.data);
      } finally {
        commit("SET_LOADING", { key: "fetchSettings", value: false });
      }
    },

    async updateSettings({ commit }, data) {
      try {
        commit("SET_LOADING", { key: "updateSettings", value: true });

        const res = await axios.put("admin-settings/1", data);
        commit("SET_SETTINGS", res.data.data);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err?.response?.data);
      } finally {
        commit("SET_LOADING", { key: "updateSettings", value: false });
      }
    },
  },
};
