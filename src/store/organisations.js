import axios from "@/plugins/axios";

export default {
  namespaced: true,

  state: {
    items: [],
    total: 0,
    loading: {
      fetchAll: false,
      fetch: false,
      create: false,
      update: null,
      delete: null,
      updateStatus: null,
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

        const res = await axios.get("organisations", { params });
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
    /**
     * Fetch organisation without store in state
     */
    async search({ commit }, params) {
      try {
        commit("SET_LOADING", { key: "search", value: true });

        const res = await axios.get("organisations", { params });

        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "search", value: false });
      }
    },

    async fetch({ commit }, id) {
      try {
        commit("SET_LOADING", { key: "fetch", value: true });

        const res = await axios.get("organisations/" + id);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetch", value: false });
      }
    },

    async create({ commit, state, dispatch }, data) {
      try {
        commit("SET_LOADING", { key: "create", value: true });

        const res = await axios.post("organisations", data);
        dispatch("fetchAll", state.paramsCache);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "create", value: false });
      }
    },

    async update({ commit, state }, data) {
      try {
        commit("SET_LOADING", { key: "update", value: data.id });

        const res = await axios.put("organisations/" + data.id, data);

        const index = state.items.findIndex((i) => i.id == data.id);
        Object.keys(state.items[index]).forEach((key) => {
          state.items[index][key] = res.data.data[key];
        });

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "update", value: null });
      }
    },

    async updateStatus({ commit }, data) {
      try {
        commit("SET_LOADING", { key: "update", value: data.id });
        commit("SET_LOADING", { key: "updateStatus", value: data.status });

        const res = await axios.put(
          "organisations/change-status/" + data.id,
          data
        );

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "update", value: null });
        commit("SET_LOADING", { key: "updateStatus", value: null });
      }
    },

    async delete({ commit, state }, id) {
      try {
        commit("SET_LOADING", { key: "delete", value: id });

        const res = await axios.delete("organisations/" + id);

        commit(
          "SET_ITEMS",
          state.items.filter((i) => i.id != id)
        );
        commit("SET_TOTAL", state.total - 1);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "delete", value: null });
      }
    },
  },
};
