import axios from "@/plugins/axios";
import { serialize } from "object-to-formdata";

export default {
  namespaced: true,

  state: {
    items: [],
    total: 0,
    loading: {
      fetchAll: false,
      search: false,
      create: false,
      update: null,
      delete: null,
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

        const res = await axios.get("persons", { params });
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

    async search({ commit }, params) {
      try {
        commit("SET_LOADING", { key: "search", value: true });

        const res = await axios.get("persons", { params });

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "search", value: false });
      }
    },

    async create({ commit, state, dispatch }, data) {
      try {
        commit("SET_LOADING", { key: "create", value: true });

        const res = await axios.post("persons", serialize(data));
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

        data["_method"] = "PUT";
        const res = await axios.post("persons/" + data.id, serialize(data));

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

    async changeStatus({ commit }, { id, status }) {
      try {
        commit("SET_LOADING", { key: "update", value: id });

        const res = await axios.put("persons/change-status/" + id, {
          status,
        });

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "update", value: null });
      }
    },

    async delete({ commit, state }, id) {
      try {
        commit("SET_LOADING", { key: "delete", value: id });

        const res = await axios.delete("persons/" + id);

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
