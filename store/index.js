import _ from "lodash";
export const state = () => ({
  auth: null
});
export const mutations = {
  SET_AUTH_USER(state, payload) {
    state.auth.user = payload;
  },

  /**
   * user auth
   * @param { object } state
   * @param { object } payload
   * @constructor
   */
  SET_AUTH(state, payload) {
    state.auth = payload;
    if (process.browser) {
      if (_.isEmpty(payload)) {
        localStorage.removeItem("auth");
        sessionStorage.removeItem("auth");
        return;
      }
      if (_.get(payload, "remember_me", false)) {
        localStorage.setItem("auth", JSON.stringify(payload));
      } else {
        sessionStorage.setItem("auth", JSON.stringify(payload));
      }
    }
  }
};
export const getters = {
  isAuthenticated: state => {
    return state.auth.loggedIn;
  },

  /**
   *
   * @param state
   * @returns {*|props.user|{type, default}|null|module.exports.strategies.local.endpoints.user|{url, method, propertyName}}
   */

  loggedInUser: state => {
    return state.auth;
  }
};
