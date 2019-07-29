import _ from 'lodash'
export const state = () => ({
  countries: {}
})
export const mutations = {
  /**
   *
   * @param {*} state
   * @param {*} payLoad
   */
  SET_COUNTRY(state, payLoad) {
    state.countries = payLoad
  }
}
export const getters = {
  /**
   *
   * @param state
   * @returns {*}
   */
  countries: (state) => {
    return state.countries
  }
}
export const actions = {
  countryListAsync({ commit }, params) {
    // let searchData = ''
    _.each(params, (value, key) => {
      if (key !== 'page') {
        //  searchData += `&${key}=${value}`
      }
    })
    return this.$axios.$get('country').then((response) => {
      commit('SET_COUNTRY', response)
    })
  }
}
