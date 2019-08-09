import { EventEmitter } from 'events'
import _ from 'lodash'

class Auth extends EventEmitter {
  constructor(context) {
    super()
    this.context = context
    let auth = ''
    if (process.browser) {
      auth = sessionStorage.getItem('auth') || localStorage.getItem('auth')
    }
    if (!_.isEmpty(auth)) {
      this.context.store.commit('SET_AUTH', JSON.parse(auth))
      this.emit('change', true)
    }

    this.context.$axios.interceptors.request.use(config => {
      if (this.check()) {
        config.headers.Authorization = `Bearer ${this.getAccessToken()}`
      }
      return config
    })

    this.context.$axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      if (code === 401) {
        this.context.store.commit('SET_AUTH', null)
        this.emit('change', false)
      }
    })
  }

  loginAsync(data) {
    this.context.store.commit('SET_AUTH', null)
    this.emit('change', false)
    return this.context.$axios.post('user/login', data).then(response => {
      if (_.has(response, 'data.access_token')) {
        const auth = _.cloneDeep(response.data)
        auth.remember_me = _.get(data, 'remember_me', false)
        this.context.store.commit('SET_AUTH', auth)
        this.emit('change', true)
      }
      return response
    })
  }

  logoutAsync() {
    // return this.context.$axios.post('logout')
    // .then((response) => {
    this.context.store.commit('SET_AUTH', null)
    // this.emit('change', false)
    // return response

    // })
  }

  check() {
    // debugger
    const accessToken = _.get(this.context.store, 'state.auth.access_token')
    return !_.isEmpty(accessToken)
  }

  getUserId() {
    return _.get(this.context.store, 'state.auth.user.id')
  }

  getAccessToken() {
    return _.get(this.context.store, 'state.auth.access_token')
  }
}

export default (context, inject) => {
  inject('auth', new Auth(context))
}
