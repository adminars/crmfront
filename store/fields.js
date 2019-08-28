import _ from "lodash";
export const state = () => ({
  field: {}
});
export const mutations = {
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_FIELD(state, payLoad) {
    state.fields = payLoad;
  }
};
export const getters = {
  /**
   *
   * @param state
   * @returns {*}
   */
  field: state => {
    return state.field;
  }
};
export const actions = {
  /**
   *
   * @param {*} param0
   * @param {*} params
   */
  fieldsListAsync({ commit }) {
    return this.$axios.$get("fields").then(response => {
      //  console.log(response);
      commit("SET_FIELD", response);
    });
  }
};
