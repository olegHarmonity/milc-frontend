import axios from "@/plugins/axios";
import Vue from "vue";
import i18n from "@/plugins/i18n";

export default {
  namespaced: true,

  state: {
    all: null,
    total: 0,
    totalPages: 0,
    latest: null,
    unreadCount: null,
    loading: {
      fetchAll: false,
      fetchLatest: false,
      fetchUnreadCount: false,
      markAsRead: null,
      markAllAsRead: false,
    },
    paramsCache: null,
  },

  getters: {
    all: (state) => state.all,
    total: (state) => state.total,
    totalPages: (state) => state.totalPages,
    latest: (state) => state.latest,
    unreadCount: (state) => state.unreadCount,
    loading: (state) => state.loading,
  },

  mutations: {
    SET_ALL(state, value) {
      state.all = value;
    },
    SET_TOTAL(state, value) {
      state.total = value;
    },
    SET_TOTAL_PAGES(state, value) {
      state.totalPages = value;
    },
    SET_LATEST(state, value) {
      state.latest = value;
    },
    SET_UNREAD_COUNT(state, value) {
      state.unreadCount = value;
    },
    SET_LOADING(state, { key, value }) {
      state.loading[key] = value;
    },
    CLEAR(state) {
      state.items = null;
      state.total = 0;
      state.latest = null;
      state.unreadCount = null;
      state.paramsCache = null;
    },
  },

  actions: {
    async fetchAll({ commit, state }, params) {
      try {
        commit("SET_LOADING", { key: "fetchAll", value: true });

        const res = await axios.get("notifications", { params });

        commit("SET_ALL", res.data.data);
        commit("SET_TOTAL", res.data.total);
        commit("SET_TOTAL_PAGES", res.data.last_page);
        state.paramsCache = params;

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchAll", value: false });
      }
    },

    async fetchLatest({ commit }, params = {}) {
      try {
        commit("SET_LOADING", { key: "fetchLatest", value: true });

        const res = await axios.get("notifications", { params });

        commit("SET_LATEST", res.data.data);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchLatest", value: false });
      }
    },

    async fetchUnreadCount({ commit, state, dispatch }) {
      try {
        commit("SET_LOADING", { key: "fetchUnreadCount", value: true });

        const { data } = await axios.get("notifications/has-unread");

        if (state.unreadCount === 0 && data.notifications_count > 0) {
          Vue.$toast.info(i18n.t("notifications.newNotificationsAlert"));
          dispatch("fetchLatest");

          if (state.all !== null) {
            dispatch("fetchAll", state.paramsCache);
          }
        }

        commit("SET_UNREAD_COUNT", data.notifications_count);

        return data.notifications_count;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "fetchUnreadCount", value: false });
      }
    },

    async markAsRead({ commit, state, dispatch }, id) {
      try {
        commit("SET_LOADING", { key: "markAsRead", value: id });

        const res = await axios.put("notifications/mark-as-read/" + id);

        let item = state.latest?.find((i) => i.id == id);

        if (item) {
          item.is_read = true;
        }

        item = state.all?.find((i) => i.id == id);

        if (item) {
          item.is_read = true;
        }

        dispatch("fetchUnreadCount");

        return res.data;
      } catch (err) {
        return Promise.reject(err?.response?.data || err);
      } finally {
        commit("SET_LOADING", { key: "markAsRead", value: null });
      }
    },

    async markAllAsRead({ commit, state }) {
      try {
        commit("SET_LOADING", { key: "markAllAsRead", value: true });

        const res = await axios.get("notifications/mark-all-as-read");

        commit("SET_UNREAD_COUNT", 0);

        if (state.latest) {
          state.latest.forEach((i) => (i.is_read = true));
        }

        if (state.all) {
          state.all.forEach((i) => (i.is_read = true));
        }

        Vue.$toast.success(i18n.t("common.success"));

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "markAllAsRead", value: false });
      }
    },
  },
};
