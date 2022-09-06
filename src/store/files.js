import axios from "@/plugins/axios";
import { serialize } from "object-to-formdata";

export default {
  namespaced: true,

  state: {
    loading: {
      upload: false,
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
    async uploadFile({ commit }, file) {
      try {
        commit("SET_LOADING", { key: "upload", value: true });

        const res = await axios.post("files", serialize({ file }));

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "upload", value: false });
      }
    },

    async uploadImage({ commit }, image) {
      try {
        commit("SET_LOADING", { key: "upload", value: true });

        const res = await axios.post("images", serialize({ image }));

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "upload", value: false });
      }
    },

    async uploadVideo({ commit }, video) {
      try {
        commit("SET_LOADING", { key: "upload", value: true });

        const res = await axios.post("videos", serialize({ video }));

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "upload", value: false });
      }
    },

    async uploadAudio({ commit }, audio) {
      try {
        commit("SET_LOADING", { key: "upload", value: true });

        const res = await axios.post("audios", serialize({ audio }));

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "upload", value: false });
      }
    },
  },
};
