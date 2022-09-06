import axios from "@/plugins/axios";

export default {
  namespaced: true,

  state: {
    items: [],
    total: 0,
    loading: {
      fetchAll: false,
      send: false,
      update: null,
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

        const res = await axios.get("feedbacks", { params });
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

    async send({ commit }, data) {
      try {
        commit("SET_LOADING", { key: "send", value: true });

        const res = await axios.post("feedbacks", data);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "send", value: false });
      }
    },

    async update({ commit, state, dispatch }, data) {
      try {
        commit("SET_LOADING", { key: "update", value: data.id });

        const res = await axios.put("feedbacks/" + data.id, data);

        if (data.refresh) {
          dispatch("fetchAll", state.paramsCache);
        } else {
          const index = state.items.findIndex((i) => i.id == data.id);

          if (state.items[index]) {
            Object.keys(state.items[index]).forEach((key) => {
              state.items[index][key] = res.data.data[key];
            });
          }
        }

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "update", value: null });
      }
    },
  },
};
