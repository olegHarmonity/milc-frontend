import axios from "@/plugins/axios";
import axiosDefault from "axios";

const axiosSource = {
  productsBySearchCancelToken: null,
};

const CancelToken = axiosDefault.CancelToken;

function checkAxiosSource(name) {
  if (axiosSource[name]) {
    axiosSource[name].cancel("Start new requeat, stop spam");
  }
  axiosSource[name] = CancelToken.source();
}

export default {
  namespaced: true,

  state: {
    items: [],
    total: 0,
    myProducts: [],
    savedProducts: [],
    loading: {
      fetchAll: false,
      fetchMyProducts: false,
      fetchSavedProducts: false,
      fetch: false,
      create: false,
      update: false,
      delete: null,
      saveProduct: null,
      removeSavedProduct: null,
      fetchRightInfo: false,
      createRightsBundle: false,
    },
    activeGenre: {
      id: "all",
      created_at: "2021-11-10 09:21",
      updated_at: "2021-11-10 09:21",
      name: "All",
    },
  },

  getters: {
    items: (state) => state.items,
    total: (state) => state.total,
    myProducts: (state) => state.myProducts,
    savedProducts: (state) => state.savedProducts,
    loading: (state) => state.loading,
  },

  mutations: {
    SET_ITEMS(state, value) {
      state.items = value;
    },
    SET_TOTAL(state, value) {
      state.total = value;
    },
    SET_MY_PRODUCTS(state, value) {
      state.myProducts = value;
    },
    SET_SAVED_PRODUCTS(state, value) {
      state.savedProducts = value;
    },
    SET_LOADING(state, { key, value }) {
      state.loading[key] = value;
    },
  },

  actions: {
    async fetchAll({ commit }, params) {
      try {
        commit("SET_LOADING", { key: "fetchAll", value: true });

        const res = await axios.get("products", { params });
        commit("SET_ITEMS", res.data.data);
        commit("SET_TOTAL", res.data.total);

        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchAll", value: false });
      }
    },

    async fetchMyProducts({ commit, rootState }, search) {
      try {
        commit("SET_LOADING", { key: "fetchMyProducts", value: true });

        const res = await axios.get("products", {
          params: {
            "exact_search[organisation.id]":
              rootState.auth.user.organisation_id,
            "search[title]": search,
            per_page: 9999,
          },
        });
        commit("SET_MY_PRODUCTS", res.data.data);

        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchMyProducts", value: false });
      }
    },

    async fetch({ commit }, id) {
      try {
        commit("SET_LOADING", { key: "fetch", value: true });

        const res = await axios.get("products/" + id);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetch", value: false });
      }
    },

    async create({ commit }, payload) {
      try {
        const data = {
          ...payload,
        };
        delete data["files"];

        commit("SET_LOADING", { key: "create", value: true });

        const res = await axios.post("products", data);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "create", value: false });
      }
    },

    async update({ commit }, payload) {
      try {
        const data = {
          ...payload,
        };
        delete data["files"];

        commit("SET_LOADING", { key: "update", value: true });

        const res = await axios.patch("products/" + payload.id, data);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "update", value: false });
      }
    },

    async changeStatus({ commit }, { id, status }) {
      try {
        commit("SET_LOADING", { key: "update", value: id });

        const res = await axios.put("products/change-status/" + id, {
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

        const res = await axios.delete("products/" + id);

        commit(
          "SET_MY_PRODUCTS",
          state.myProducts.filter((p) => p.id != id)
        );
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

    async fetchProductsBySearch({ commit }, payload) {
      checkAxiosSource("productsBySearchCancelToken");
      try {
        commit("SET_LOADING", { key: "fetchMyProducts", value: true });
        const genreId = payload.genre_id;
        const params = { ...payload };
        delete params.genre_id;
        const res = await axios.get("products/by-category/" + genreId, {
          params,
          cancelToken: axiosSource.productsBySearchCancelToken.token,
        });
        commit("SET_MY_PRODUCTS", res.data.data);
        axiosSource.productsBySearchCancelToken = null;
        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchMyProducts", value: false });
      }
    },

    async fetchSavedProducts({ commit }, search) {
      try {
        commit("SET_LOADING", { key: "fetchSavedProducts", value: true });

        const res = await axios.get("users/saved-products", {
          params: {
            "search[title]": search,
          },
        });
        commit("SET_SAVED_PRODUCTS", res.data.data);

        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchSavedProducts", value: false });
      }
    },

    async saveProduct({ commit }, id) {
      try {
        commit("SET_LOADING", { key: "saveProduct", value: id });

        const res = await axios.post("users/save-product/", {
          product_id: id,
        });

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "saveProduct", value: null });
      }
    },

    async removeSavedProduct({ commit, state }, id) {
      try {
        commit("SET_LOADING", { key: "removeSavedProduct", value: id });

        const res = await axios.delete("users/delete-saved-product/" + id);

        commit(
          "SET_SAVED_PRODUCTS",
          state.savedProducts.filter((p) => p.id != id)
        );

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "removeSavedProduct", value: null });
      }
    },

    async fetchRightInfo({ commit }, id) {
      try {
        commit("SET_LOADING", { key: "fetchRightInfo", value: true });

        const res = await axios.get("rights-info/" + id);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchRightInfo", value: false });
      }
    },

    async createRightsBundle({ commit }, payload) {
      try {
        commit("SET_LOADING", { key: "createRightsBundle", value: true });

        const res = await axios.post("rights-bundles", payload);

        return res.data.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "createRightsBundle", value: false });
      }
    },

    async canAddProduct() {
      try {
        const res = await axios.get("can-add-product");
        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      }
    },

    async canBuyProduct() {
      try {
        const res = await axios.get("can-buy-product");
        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      }
    },
  },
};
