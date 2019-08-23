import _ from "lodash";
export const state = () => ({
  pmemos: {},
  cmemo: {}
});
export const mutations = {
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_PMEMOS(state, payLoad) {
    state.pmemos = payLoad;
  },
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_CMEMO(state, payLoad) {
    state.cmemo = payLoad;
  }
};
export const getters = {
  /**
   *
   * @param state
   * @returns {*}
   */
  pmemos: state => {
    return state.pmemos;
  },
  cmemo: state => {
    return state.cmemo;
  }
};
export const actions = {
  asyncMemoByPhone({ commit }, params) {
    // console.log(params);
    let searchData = "";
    _.each(params, (value, key) => {
      if (key != "page") {
        searchData += `&${key}=${value}`;
      }
    });
    return this.$axios
      .$get("itijimemobyphone?phone=" + params.phone)
      .then(response => {
        // console.log(response.data);
        commit("SET_PMEMOS", response.data);
      });
  },
  asyncMemoByPhoneTypeTwo({ commit }, params) {
    let searchData = "";
    _.each(params, (value, key) => {
      if (key != "page") {
        searchData += `&${key}=${value}`;
      }
    });
    return this.$axios
      .$get("itijimemobyphonetypetwo?phone=" + params.phone)
      .then(response => {
        // console.log(response.data);
        commit("SET_CMEMO", response.data);
      });
  }
};
