import axios from "@/plugins/axios";

export default {
  namespaced: true,

  state: {
    items: [],
    loading: {
      fetchAll: false,
    },
  },

  getters: {
    items: (state) => state.items,
    loading: (state) => state.loading,
  },

  mutations: {
    SET_ITEMS(state, value) {
      state.items = value;
    },
    SET_LOADING(state, { key, value }) {
      state.loading[key] = value;
    },
  },

  actions: {
    async fetchAll({ commit, state }) {
      if (state.items.length > 0) {
        return state.items;
      }

      try {
        commit("SET_LOADING", { key: "fetchAll", value: true });

        const res = await axios.get("movie-content-types");
        commit("SET_ITEMS", res.data.data);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchAll", value: false });
      }
    },
  },
};
