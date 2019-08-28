import _ from "lodash";
export const state = () => ({
  dial: {}
});
export const mutations = {
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_DIAL(state, payLoad) {
    state.dial = payLoad;
  }
};
export const getters = {
  /**
   *
   * @param state
   * @returns {*}
   */
  dial: state => {
    return state.dial;
  }
};
export const actions = {
  /**
   *
   * @param {*} param0
   * @param {*} params
   */
  dialListAsync({ commit }) {
    return this.$axios.$get("dial").then(response => {
      commit("SET_DIAL", response.data);
    });
  }
};
