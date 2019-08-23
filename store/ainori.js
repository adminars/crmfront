import _ from "lodash";
export const state = () => ({
  ainori: {},
  anken: {}
});
export const mutations = {
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_AINORI(state, payLoad) {
    state.ainori = payLoad;
  },
  SET_ANKEN(state, payLoad) {
    state.anken = payLoad;
  }
};
export const getters = {
  /**
   *
   * @param state
   * @returns {*}
   */
  ainori: state => {
    return state.ainori;
  },
  anken: state => {
    return state.anken;
  }
};
export const actions = {
  ainoriListAsync({ commit }, params) {
    console.log();
    // console.log(sessionStorage);
    // console.log(this.window.localStorage);
    let searchData = "";
    _.each(params, (value, key) => {
      if (key != "page") {
        searchData += `&${key}=${value}`;
      }
    });
    return this.$axios
      .$get("itijimemo?extention=" + params.extension)
      .then(response => {
        commit("SET_AINORI", response.data);
      });
  },
  asyncOpportunityByPhone({ commit }, params) {
    // console.log(params);
    let searchData = "";
    _.each(params, (value, key) => {
      if (key != "page") {
        searchData += `&${key}=${value}`;
      }
    });
    return this.$axios
      .$get("searchbyphone?phone=" + params.phone)
      .then(response => {
        //  console.log(response.data);
        commit("SET_ANKEN", response.data);
      });
  }
};
