import _ from "lodash";
export const state = () => ({
  partner: {},
  partners: {
    data: {},
    meta: {},
    link: {}
  },
  phartner: {}
});
export const mutations = {
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_PARTNERS(state, payLoad) {
    state.partners.data = payLoad;
  },
  SET_PARTNER(state, payLoad) {
    state.partner = payLoad;
  },
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_PHARTNER(state, payLoad) {
    state.phartner = payLoad;
  },
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_META(state, payLoad) {
    state.partners.meta = payLoad;
  },
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_LINK(state, payLoad) {
    state.partners.meta = payLoad;
  }
};
export const getters = {
  /**
   *
   * @param state
   * @returns {*}
   */
  opportunities: state => {
    return state.partners;
  },
  meta: state => {
    return state.meta;
  },
  phartner: state => {
    return state.phartner;
  },
  partner: state => {
    return state.partner;
  },
  /**
   * return @opportunity.link
   */
  link: state => {
    return state.partners.link;
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

  asyncPartnerList({ commit }) {
    return this.$axios.$get("partner").then(response => {
      // console.log(response);
      commit("SET_PARTNER", response.data);
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
  },
  asyncPartnerByphone({ commit }, params) {
    // getPartnerByphone
    console.log("i am here at partner");
    let searchData = "";
    _.each(params, (value, key) => {
      if (key != "page") {
        searchData += `&${key}=${value}`;
      }
    });
    return this.$axios
      .$get("partnerbyphone?phone=" + params.phone)
      .then(response => {
        //  console.log(response.data);
        commit("SET_PHARTNER", response.data);
      });
  }
};
