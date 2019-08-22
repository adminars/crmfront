import _ from "lodash";
export const state = () => ({
  user: {},
  total_anken: {}
});
export const mutations = {
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_USER(state, payLoad) {
    state.user = payLoad;
  },
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_TOTAL_ANKEN(state, payLoad) {
    state.total_anken = payLoad;
  }
};
export const getters = {
  /**
   *
   * @param state
   * @returns {*}
   */
  user: state => {
    return state.user;
  },
  /**
   *
   */
  total_anken: state => {
    return state.total_anken;
  }
};
export const actions = {
  /**
   *
   * @param {*} param0
   * @param {*} params
   */
  LineMessageLogAsync({ commit }, params) {
    let searchData = "";
    _.each(params, (value, key) => {
      if (key != "page") {
        searchData += `&${key}=${value}`;
      }
    });
    return this.$axios.$get("opportunity").then(response => {
      commit("SET_OPPORTUNITIES", response.data);
      commit("SET_META", response.meta);
      commit("SET_LINK", response.links);
    });
  },
  /**
   *
   * @param {*} param0
   * @param {*} params
   */
  addPartnerToLineList({ commit }, params) {
    let searchData = "";
    _.each(params, (value, key) => {
      if (key != "page") {
        searchData += `&${key}=${value}`;
      }
    });
    return this.$axios.$get("opportunity").then(response => {
      commit("SET_OPPORTUNITIES", response.data);
      commit("SET_META", response.meta);
      commit("SET_LINK", response.links);
    });
  },

  storeLinepartner({ commit }, { data, config }) {
    //console.log('i came here with data')
    // console.log(data)
    return this.$axios.post(`lineRequest`, data, config).then(response => {
      // commit('SET_SHOW', response.data)
      // console.log('i am response')
      // console.log(response.data)
      return response;
    });
  }
};
