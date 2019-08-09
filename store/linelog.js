import _ from 'lodash'
export const state = () => ({

    linemessages: {
        data: {},
        meta: {},
        link: {}
    }
})
export const mutations = {
    /**
     *
     * @param {*} state
     * @param {*} payLoad
     */
    SET_LINELOG(state, payLoad) {
        state.linemessages.data = payLoad
    },
    SET_LINELOGMMESSAGE(state, payLoad) {
        state.linemessages.data = payLoad
    },

    /**
     *
     * @param {*} state
     * @param {*} payLoad
     */
    SET_META(state, payLoad) {
        state.linemessages.meta = payLoad
    },
    /**
     *
     * @param {*} state
     * @param {*} payLoad
     */
    SET_LINK(state, payLoad) {
        state.linemessages.meta = payLoad
    },

}
export const getters = {
    /**
     *
     * @param state
     * @returns {*}
     */
    lineLog: state => {
        return state.linemessages
    },
    meta: state => {
        return state.linemessages.meta
    },
    /**
     * return @opportunity.link
     */
    link: state => {
        return state.linemessages.link
    },
    /**
     *
     */
    lineData: state => {
        return state.linemessages.data
    },
    /**
     *
     */
    lineMeta: state => {
        return linemessages.meta
    },
    lineLink: state => {
        return linemessages.link
    }
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
        return this.$axios.$get('getlineeventlog').then(response => {
            commit('SET_LINELOG', response)
            commit('SET_META', response.meta)
            commit('SET_LINK', response.links)
        })
    }
}