import _ from 'lodash'
export const state = () => ({
    user: {}
})
export const mutations = {
    /**
     *
     * @param {*} state
     * @param {*} payLoad
     */
    SET_USER(state, payLoad) {
        state.user = payLoad
    }
}
export const getters = {
    /**
     *
     * @param state
     * @returns {*}
     */
    user: state => {
        return state.user
    }
}
export const actions = {
    loginAsync({ commit }, params) {
        let searchData = ''
        _.each(params, (value, key) => {
            if (key != 'page') {
                searchData += `&${key}=${value}`
            }
        })
        return this.$axios.$get('country').then(response => {
            commit('SET_COUNTRY', response)
        })
    }
}