import axios from "@/plugins/axios";

export default {
  namespaced: true,

  state: {
    loading: {
      send: false,
    },
  },

  getters: {
    loading: (state) => state.loading,
  },

  mutations: {
    SET_LOADING(state, { key, value }) {
      state.loading[key] = value;
    },
  },

  actions: {
    async send({ commit }, data) {
      try {
        commit("SET_LOADING", { key: "send", value: true });

        const res = await axios.post("send-email", data);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "send", value: false });
      }
    },
  },
};
