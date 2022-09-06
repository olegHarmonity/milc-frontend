import axios from "@/plugins/axios";
import { serialize } from "object-to-formdata";

export default {
  namespaced: true,

  state: {
    items: [],
    loading: {
      fetchAll: false,
      create: false,
      update: false,
      delete: null,
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
    async fetchAll({ commit, state }, force = false) {
      if (!force && state.items.length > 0) {
        return;
      }

      try {
        commit("SET_LOADING", { key: "fetchAll", value: true });

        const res = await axios.get("movie-genres", {
          params: {
            "sort[name]": "asc",
          },
        });
        commit("SET_ITEMS", res.data.data);

        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchAll", value: false });
      }
    },

    async create({ commit }, data) {
      try {
        commit("SET_LOADING", { key: "create", value: true });

        const res = await axios.post("movie-genres", serialize(data));

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "create", value: false });
      }
    },

    async update({ commit, state }, data) {
      try {
        commit("SET_LOADING", { key: "update", value: true });

        data["_method"] = "PUT";
        const res = await axios.post(
          "movie-genres/" + data.id,
          serialize(data)
        );

        const index = state.items.findIndex((i) => i.id == data.id);
        Object.keys(state.items[index]).forEach((key) => {
          state.items[index][key] = res.data.data[key];
        });

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "update", value: false });
      }
    },

    async delete({ commit, state }, id) {
      try {
        commit("SET_LOADING", { key: "delete", value: id });

        const res = await axios.delete("movie-genres/" + id);

        commit(
          "SET_ITEMS",
          state.items.filter((p) => p.id != id)
        );

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "delete", value: null });
      }
    },
  },
};
