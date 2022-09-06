import axios from "@/plugins/axios";
import { serialize } from "object-to-formdata";

export default {
  namespaced: true,

  state: {
    user: null,
    loading: {
      user: false,
      login: false,
      loginVerify: false,
      logout: false,
      register: false,
      emailExists: false,
      forgotPassword: false,
      resetPassword: false,
      changePassword: false,
      updateUser: false,
      updateOrganisation: false,
      sendVerificationLink: false,
      verifyEmail: false,
    },
  },

  getters: {
    user: (state) => state.user,
    loading: (state) => state.loading,
  },

  mutations: {
    SET_USER(state, value) {
      state.user = value;
    },
    SET_LOADING(state, { key, value }) {
      state.loading[key] = value;
    },
  },

  actions: {
    async user({ commit }) {
      if (!localStorage.getItem("token")) {
        return;
      }

      try {
        commit("SET_LOADING", { key: "user", value: true });

        const res = await axios.get("me");
        const user = res.data.data;

        if (!user || !user.id) {
          commit("SET_USER", null);
          return Promise.reject();
        }

        commit("SET_USER", res.data.data);

        return res;
      } catch (err) {
        commit("SET_USER", null);
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "user", value: false });
      }
    },

    async login({ commit, dispatch }, payload) {
      try {
        commit("SET_LOADING", { key: "login", value: true });

        await axios.get("csrf-cookie");
        const res = await axios.post("auth/login", payload);

        if (res.data.access_token) {
          localStorage.setItem("token", res.data.access_token);
          await dispatch("user");
        }

        return res.data;
      } catch (err) {
        return Promise.reject(err?.response?.data || err);
      } finally {
        commit("SET_LOADING", { key: "login", value: false });
      }
    },

    async loginVerify({ commit, dispatch }, payload) {
      try {
        commit("SET_LOADING", { key: "loginVerify", value: true });

        const res = await axios.post("auth/login-verify", payload);

        localStorage.setItem("token", res.data.access_token);
        await dispatch("user");

        return res.data;
      } catch (err) {
        return Promise.reject(err?.response?.data || err);
      } finally {
        commit("SET_LOADING", { key: "loginVerify", value: false });
      }
    },

    async logout({ commit }) {
      try {
        commit("SET_LOADING", { key: "logout", value: true });
        await axios.post("auth/logout");
        return true;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_USER", null);
        localStorage.removeItem("token");
        commit("SET_LOADING", { key: "logout", value: false });
      }
    },

    async register({ commit }, data) {
      try {
        commit("SET_LOADING", { key: "register", value: true });

        const formData = serialize(data, {
          nullsAsUndefineds: true,
        });
        const res = await axios.post("register", formData);

        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "register", value: false });
      }
    },

    async emailExists({ commit }, email) {
      try {
        commit("SET_LOADING", { key: "emailExists", value: true });

        const res = await axios.get("email-exists", {
          params: { email },
        });

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "emailExists", value: false });
      }
    },

    async forgotPassword({ commit }, data) {
      try {
        commit("SET_LOADING", { key: "forgotPassword", value: true });

        const res = await axios.post("forgot-password", data);

        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "forgotPassword", value: false });
      }
    },

    async resetPassword({ commit }, data) {
      try {
        commit("SET_LOADING", { key: "resetPassword", value: true });

        const res = await axios.post("reset-password", data);

        return res;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "resetPassword", value: false });
      }
    },

    async changePassword({ commit }, data) {
      try {
        commit("SET_LOADING", { key: "changePassword", value: true });

        const res = await axios.post("change-password", data);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "changePassword", value: false });
      }
    },

    async updateUser({ commit, state }, data) {
      try {
        commit("SET_LOADING", { key: "updateUser", value: true });

        data._method = "PUT";
        const res = await axios.post(`users/${state.user.id}`, serialize(data));
        delete res.data.data.organisation;

        const user = {
          ...state.user,
          ...res.data.data,
        };
        commit("SET_USER", user);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "updateUser", value: false });
      }
    },

    async updateOrganisation({ commit, state }, data) {
      try {
        commit("SET_LOADING", { key: "updateOrganisation", value: true });

        data._method = "PUT";
        const res = await axios.post(
          `organisations/${state.user.organisation_id}`,
          serialize(data, { indices: true })
        );
        const user = {
          ...state.user,
          organisation: {
            ...res.data.data,
          },
        };
        commit("SET_USER", user);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "updateOrganisation", value: false });
      }
    },

    async sendVerificationLink({ commit }, email) {
      try {
        commit("SET_LOADING", { key: "sendVerificationLink", value: true });

        const res = await axios.get("auth/resend-verification-email/" + email);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "sendVerificationLink", value: false });
      }
    },

    async verifyEmail({ commit }, token) {
      try {
        commit("SET_LOADING", { key: "verifyEmail", value: true });

        const res = await axios.get("auth/verify-email/" + token);

        return res.data;
      } catch (err) {
        return Promise.reject(err.response);
      } finally {
        commit("SET_LOADING", { key: "verifyEmail", value: false });
      }
    },
  },
};
