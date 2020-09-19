import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false
  },
  mutations: {
    setAuth(state, payload) {
        state.isAuth = payload
    }
  }
})
