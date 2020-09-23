import Vue from 'vue'
import Vuex from 'vuex'
import {getUser} from '@/api/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    user: null
  },
  mutations: {
    setAuth(state, payload) {
        state.isAuth = payload
    },
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async getUser({commit}) {
      try {
        const {data} = await getUser()
        commit('setUser', data)
        if (data?.user_id) 
          commit('setAuth', true) 
        else
          commit('setAuth', false)
      } catch (e) {
          commit('setAuth', false)
      }
    }
  }
})
