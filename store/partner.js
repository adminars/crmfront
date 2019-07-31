import _ from 'lodash'
export const state = () => ({
    partners: {
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
    SET_PARTNERS(state, payLoad) {
        state.partners.data = payLoad
    },
    /**
     *
     * @param {*} state
     * @param {*} payLoad
     */
    SET_META(state, payLoad) {
        state.partners.meta = payLoad
    },
    /**
     *
     * @param {*} state
     * @param {*} payLoad
     */
    SET_LINK(state, payLoad) {
        state.partners.meta = payLoad
    },

}
export const getters = {
    /**
     *
     * @param state
     * @returns {*}
     */
    opportunities: state => {
        return state.partners
    },
    meta: state => {
        return state.meta
    },
    /**
     * return @opportunity.link
     */
    link: state => {
        return state.partners.link
    },
}
export const actions = {
    /**
     *
     * @param {*} param0
     * @param {*} params
     */
    LineMessageLogAsync({ commit }, params) {
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
    },
    /**
     *
     * @param {*} param0
     * @param {*} params
     */
    addPartnerToLineList({ commit }, params) {
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
    },

    storeLinepartner({ commit }, { data, config }) {
        //console.log('i came here with data')
        // console.log(data)
        return this.$axios
            .post(`lineRequest`, data, config)
            .then(response => {
               // commit('SET_SHOW', response.data)
               // console.log('i am response')
               // console.log(response.data)
                return response
            })
    }
}
