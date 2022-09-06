import axios from "@/plugins/axios";
import { serialize } from "object-to-formdata";

export default {
  namespaced: true,

  state: {
    items: [],
    loading: {
      fetchAll: false,
      startChat: false,
      send: false,
    },
    activeConversations: null,
  },

  getters: {
    items: (state) => state.items,
    loading: (state) => state.loading,
    activeConversations: (state) => state.activeConversations,
  },

  mutations: {
    SET_ITEMS(state, value) {
      state.items = value;
    },
    SET_LOADING(state, { key, value }) {
      state.loading[key] = value;
    },
    SET_ACTIVE_CONVERSATIONS(state, payload) {
      state.activeConversations = payload;
    },
  },

  actions: {
    async fetchAll({ commit }, archived = null) {
      try {
        commit("SET_LOADING", { key: "fetchAll", value: true });
        const url = `conversations${archived ? "?archived=true" : ""}`;

        const res = await axios.get(url);

        commit("SET_ITEMS", res.data);

        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchAll", value: false });
      }
    },
    async fetchSingle({ commit }, payload) {
      try {
        commit("SET_LOADING", { key: "fetchSingle", value: true });
        const url = `conversations/${payload}`;
        const res = await axios.get(url);
        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchSingle", value: false });
      }
    },

    async startChat({ commit }, data) {
      try {
        commit("SET_LOADING", { key: "startChat", value: true });
        const url = `conversations`;
        await axios.post(url, data);
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "startChat", value: false });
      }
    },

    async send({ commit }, payload) {
      try {
        commit("SET_LOADING", { key: "send", value: true });
        const url = `conversations/${payload.id}`;
        await axios.post(url, serialize(payload.data), {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "send", value: false });
      }
    },
  },
};
