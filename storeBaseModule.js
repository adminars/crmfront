import Vue from 'vue'
import _ from 'lodash'

export default function({ resource }) {
  return {
    state() {
      return {
        list: { data: [], meta: { total: 0 } },
        lost: { data: [], meta: { total: 0 } },
        headers: [],
        columns: {},
        show: {},
        otherUpdate: {},
        otherUpdateFlash: false,
        currentId: -1,
        currentIndex: -1,
        loading: true,
        pagination: {
          descending: true
        },
        selected: [],
        echo: []
      }
    },
    actions: {
      /**
       * list all the item
       * @param  commit
       * @param dispatch
       * @param { boolean } caching
       * @param { object } params
       */
      listAsync({ commit, dispatch }, { caching = true, params }) {
        return this.$axios
          .get('provider/' + resource, { params })
          .then(response => {
            if (caching) {
              commit('SET_LIST', response.data)
              // dispatch('channel', { name: 'order' })
            }
            return response
          })
      },
      /**
       * @param commit
       * @param dispatch
       * @param caching
       * @param params
       * @returns {Promise<AxiosResponse<any> | never>}
       */
      userListAsync({ commit, dispatch }, { caching = false, params }) {
        return this.$axios
          .get('provider/' + resource, { params })
          .then(response => {
            if (caching) {
              commit('SET_LOST', response.data)
              // dispatch('channel', { name: 'order' })
            }
            console.log(response)
            return response
          })
      },
      /**
       * show specific item
       * @param commit
       * @param {integer} id
       */
      showAsync({ commit, dispatch }, id) {
        return this.$axios.get(`provider/${resource}/${id}`).then(response => {
          commit('SET_SHOW', response.data)
          return response
        })
      },
      /**
       * delete specific item
       * @param commit
       * @param { integer } id
       */
      destroyAsync({ commit }, id) {
        return this.$axios.delete(`provider/${resource}/${id}`)
      },

      bulkdestroyAsync({ commit }, id) {
        return this.$axios.delete(`provider/${resource}/bulk`, {
          data: { id }
        })
      },

      /**
       * display cache item
       * @param { object } state,
       * @param commit
       * @param {object} getters
       * @param dispatch
       * @param {integer} id
       * @return {Promise<any>}
       */
      showCacheAsync({ state, commit, getters, dispatch }, id) {
        return new Promise(resolve => {
          const _id = _.toInteger(id)
          const dataFromList = getters.show(_id)
          if (dataFromList) {
            commit('SET_SHOW', dataFromList)
            resolve(dataFromList)
            return
          }
          resolve(dispatch('showAsync', id))
        })
      },
      /**
       * update specific item
       * @param commit
       * @param { integer } id
       * @param { object } data
       * @return {Promise<T>}
       */
      updateAsync({ commit }, { id, data }) {
        return this.$axios
          .post(`provider/${resource}/${id}`, data)
          .then(response => {
            commit('SET_SHOW', response.data)
            return response
          })
      },

      /**
       * update specific item
       * @param commit
       * @param { integer } id
       * @param { object } data
       * @return {Promise<T>}
       */
      updateIdAsync({ commit }, { id, data }) {
        return this.$axios
          .put(`provider/${resource}/${id}`, data)
          .then(response => {
            commit('SET_SHOW', response.data)
            return response
          })
      },

      /**
       * store newly created item
       * @param commit
       * @param { object } data
       * @param config
       */
      storeAsync({ commit }, { data, config }) {
        return this.$axios
          .post(`provider/${resource}`, data, config)
          .then(response => {
            commit('SET_SHOW', response.data)
            return response
          })
      },
      /**
       * mass update
       * @param commit
       * @param {array} data
       */
      bulkUpdateAsync({ commit, getters }, { data }) {
        return this.$axios
          .patch(`provider/${resource}/bulk`, data)
          .then(response => {
            if (!_.isEmpty(response.data.data)) {
              _.forEach(response.data.data, item => {
                commit('SET_SHOW', { data: item })
              })
            }
            return response
          })
      },
      /**
       * user confiramtion page
       * @param commit
       * @param {token} string
       */
      showConfirmationAsync({ commit, dispatch }, token) {
        return this.$axios
          .get(`provider/${resource}/confirmation/${token}`)
          .then(response => {
            dispatch('channel', { name: 'user' })
            return response
          })
      },
      /**
       * user confirmation
       * @param commit
       * @param {object} data
       */
      confirmUserAsync({ commit, getters }, { data }) {
        return this.$axios
          .post(`provider/${resource}/confirm`, data)
          .then(response => {
            if (!_.isEmpty(response.data.data)) {
              _.forEach(response.data.data, item => {
                commit('SET_SHOW', { data: item })
              })
            }
            return response
          })
      },
      /**
       * download CSV
       * @param commit
       * @param { object } params
       */
      download({ commit }, { params }) {
        return this.$axios({
          method: 'GET',
          url: resource,
          responseType: 'stream',
          params: _.merge(_.cloneDeep(params), {
            format: 'csv'
          })
        }).then(response => {
          if (response.status === 200) {
            if (!_.isEmpty(response.data)) {
              const matches = _.get(
                response,
                'headers.content-disposition'
              ).match(/filename="(.+)"/)
              const filename = !_.isEmpty(matches[1]) ? matches[1] : 'unknown'
              const bom = new Uint8Array([0xef, 0xbb, 0xbf])
              const url = window.URL.createObjectURL(
                new Blob([bom, response.data])
              )
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', filename)
              document.body.appendChild(link)
              link.click()
              link.remove()
            }
          }
          return response
        })
      },
      /**
       * chart information
       * @param { object } state
       * @param { object } params
       * @param { string } type
       */
      chartAsync({ state }, { params, type }) {
        return this.$axios.get(`${resource}/${type}`, { params })
      }
    },
    mutations: {
      /**
       * set list
       * @param { object } state
       * @param { object } payload
       * @constructor
       */
      SET_LIST(state, payload) {
        state.list = payload
      },
      /**
       * @param state
       * @param payload
       * @constructor
       */
      SET_LOST(state, payload) {
        state.lost = payload
      },

      /**
       * set header
       * @param { object } state
       * @param { object } payload
       * @constructor
       */
      SET_HEADERS(state, payload) {
        const headers = _.cloneDeep(payload)
        const columns = _.cloneDeep(state.columns)
        _.forEach(headers, header => {
          header.visible = _.get(header, 'visible', true)
          if (!_.hasIn(columns, header.value)) {
            columns[header.value] = {
              key: header.value,
              label: header.text,
              visible: header.visible
            }
          }
        })
        state.headers = headers
        state.columns = columns
      },

      /**
       * set the column
       * @param { object } state
       * @param { object } payload
       * @constructor
       */
      SET_COLUMNS(state, payload) {
        const headers = _.cloneDeep(state.headers)
        const columns = _.cloneDeep(payload)
        _.forEach(headers, header => {
          const visible = _.get(columns, `${header.value}.visible`, true)
          header.visible = visible
          if (!_.hasIn(columns, header.value)) {
            columns[header.value] = {
              key: header.value,
              label: header.text,
              visible: header.visible
            }
          }
        })
        state.columns = columns
        state.headers = headers
      },

      /**
       * set item to display
       * @param { object } state
       * @param { object } value
       * @constructor
       */
      SET_SHOW(state, payload) {
        state.show = payload
        const id = _.toInteger(payload.data.id)
        const index = _.findIndex(_.get(state, 'list.data', []), { id: id })
        if (index > -1) {
          Vue.set(state.list.data, index, payload.data)
          state.currentId = id
          state.currentIndex = index
        }
      },

      /**
       * set item updated by others
       * @param { object } state
       * @param { object } value
       * @constructor
       */
      SET_OTHER_UPDATE(state, payload) {
        state.show = payload
        const id = _.toInteger(payload.data.id)
        const index = _.findIndex(_.get(state, 'list.data', []), { id: id })
        if (index > -1) {
          Vue.set(state.list.data, index, payload.data)
          state.otherUpdate = payload
          state.otherUpdateFlash = true
        }
      },

      SET_OTHER_UPDATE_FLASH(state, payload) {
        state.otherUpdateFlash = payload
      },

      /**
       * set item of selected
       * @param { object } state
       * @param { object } payload
       * @constructor
       */
      SET_SELECTED(state, payload) {
        state.selected = payload
      },

      /**
       * set loading information
       * @param { object } state
       * @param { boolean } payload
       * @constructor
       */
      SET_LOADING(state, value) {
        state.loading = value
      },

      /**
       * set pagination information
       * @param { object } state
       * @param { object } payload
       * @constructor
       */
      SET_PAGINATION(state, payload) {
        state.pagination = payload
      }

      /**
       * set echo channel
       * @param state
       * @param payload
       * @constructor
       */
      /*
      SET_CHANNEL (state, payload) {
        state.echo = payload
      }
      */
    },
    getters: {
      /**
       * receive loading
       * @param { object } state
       * @returns {*}
       */
      loading(state) {
        return state.loading
      },
      /**
       * receive pagination
       * @param { object } state
       * @return {Object|*}
       */
      pagination(state) {
        return state.pagination
      },
      /**
       * receive show
       * @param { object } state
       * @return {function(*=)}
       */
      show: state => (id, checkValue) => {
        // TODO::check data type if necessary
        // TODO::check data type if necessary
        // const _id = _.toInteger(id)
        const dataFromList = _.find(_.get(state, 'list.data', []), [
          checkValue,
          id
        ])
        const data = dataFromList ? { data: dataFromList } : state.show
        return _.get(data, `data.${checkValue}`, -1) === id ? data : undefined
      },

      /**
       * Retrieve item updated by others
       * @param { object } state
       * @return { object }
       */
      otherUpdate(state) {
        return state.otherUpdate
      },

      otherUpdateFlash(state) {
        return state.otherUpdateFlash
      },

      /**
       * receive current id
       * @param { object } state
       * @return {*}
       */
      currentId(state) {
        return state.currentId
      },
      /**
       * receive current Index
       * @param { object } state
       * @return {*}
       */
      currentIndex(state) {
        return state.currentIndex
      },
      /**
       * receive list
       * @param { object } state
       * @return {Object|*}
       */
      list(state) {
        return state.list
      },
      /**
       * @param state
       * @returns {*}
       */
      lost(state) {
        return state.lost
      },
      /**
       * receive headers
       * @param { object } state
       * @return {*}
       */
      headers(state) {
        return state.headers
      },
      /**
       * receive columns
       * @param { object } state
       * @return {*}
       */
      columns(state) {
        return state.columns
      },
      /**
       * receive selected
       * @param { object } state
       * @return {Object|*}
       */
      selected(state) {
        return state.selected
      },
      /**
       * receive previous item
       * @param { object } state
       * @param { object } getters
       * @return {*}
       */
      prevItem(state, getters) {
        let item = null
        const index = getters.currentIndex
        if (index > -1) {
          const items = getters.list.data
          item = _.get(items, index - 1)
        }
        return item
      },
      /**
       * receive next item
       * @param {object} state
       * @param {object} getters
       * @return {*}
       */
      nextItem(state, getters) {
        let item = null
        const index = getters.currentIndex
        if (index > -1) {
          const items = getters.list.data
          item = _.get(items, index + 1)
        }
        return item
      },
      /**
       * receive previous path
       * @param { object } state
       * @param { object } getters
       * @return {*}
       */
      prevItemPath(state, getters) {
        const item = getters.prevItem
        return item ? `/${resource}/${item.id}` : null
      },
      /**
       * receive next path
       * @param {object} state
       * @param {object} getters
       * @return {*}
       */
      nextItemPath(state, getters) {
        const item = getters.nextItem
        return item ? `/${resource}/${item.id}` : null
      }
    }
  }
}
