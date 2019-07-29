import _ from 'lodash'
export const state = () => ({
  opportunities: {
    data: {},
    meta: {},
    link: {}
  },
})
export const mutations = {
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_OPPORTUNITIES(state, payLoad) {
    state.opportunities.data = payLoad
  },
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_META(state, payLoad) {
    state.meta = payLoad
  },
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_LINK(state, payLoad) {
    state.opportunities.meta = payLoad
  }
}
export const getters = {
  /**
   *
   * @param state
   * @returns {*}
   */
  opportunities: state => {
    return state.opportunities
  },
  meta: state => {
    return state.meta
  },
  /**
   * return @opportunity.link
   */
  link: state => {
    return state.opportunities.link
  }
}
export const actions = {
  /**
   *
   * @param {*} param0
   * @param {*} params
   */
  opportunitylistAsync({ commit }, params) {
    let searchData = ''
    _.each(params, (value, key) => {
      if (key != 'page') {
        searchData += `&${key}=${value}`
      }
    })
    return this.$axios.$get('opportunity').then(response => {
      commit('SET_OPPORTUNITIES', response.data)
      commit('SET_META', response.meta)
      commit('SET_LINK', response.links)
    })
  }
}
