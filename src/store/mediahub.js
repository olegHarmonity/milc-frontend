import axios from "axios";
import mainAxios from "@/plugins/axios";

const mediaAxios = axios.create({
  baseURL: "https://milc-int.de/services/assets/api/",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  namespaced: true,

  state: {
    items: [],
    loading: {
      deleteItem: null,
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
    async getAccessToken() {
      try {
        const res = await mainAxios.post("media-token");

        mediaAxios.defaults.headers.Authorization =
          "Baerer " + res.data.access_token;

        return res.data.access_token;
      } catch (err) {
        return Promise.reject(err.response);
      }
    },

    async getItemsForAsset({ commit }, assetId) {
      try {
        // const res = await mediaAxios.get(`assets/${assetId}/items`);
        const res = await mainAxios.get(`assets/${assetId}/items`);
        commit("SET_ITEMS", res.data);

        return res.data;
      } catch (err) {
        return Promise.reject(err?.response?.data || err);
      }
    },

    async deleteItem({ commit, state }, id) {
      try {
        commit("SET_LOADING", { key: "deleteItem", value: id });
        // const res = await mediaAxios.get(`assets/${assetId}/items`);
        const res = await mainAxios.delete(`items/${id}`);
        commit(
          "SET_ITEMS",
          state.items.filter((i) => i.id !== id)
        );

        return res.data;
      } catch (err) {
        return Promise.reject(err?.response?.data || err);
      } finally {
        commit("SET_LOADING", { key: "deleteItem", value: null });
      }
    },

    createMultipartUpload(context, file) {
      return new Promise((resolve, reject) => {
        mainAxios
          .post("s3/multipart", {
            filename: file.name,
            type: file.type,
            assetId: file.meta["assetId"],
            externalReference: file.meta["externalReference"],
          })
          .then((res) => resolve(res.data))
          .catch((err) => reject(err?.response?.data || err));
      });
    },
  },
};
