import Vue from 'vue'
import Vuex from 'vuex'
import {getUser} from '@/api/user'
import { getStage } from '@/api/game'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    user: null,
    stage:''
  },
  mutations: {
    setAuth(state, payload) {
        state.isAuth = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setStage(state, payload) {
      state.stage = payload
    }
  },
  actions: {
    async getUser({commit}) {
      try {
        const {data} = await getUser()
        commit('setUser', data)
        if (data?.id) 
          commit('setAuth', true) 
        else
          commit('setAuth', false)
      } catch (e) {
          commit('setAuth', false)
      }
    },

    async getStage ({commit}) {
      try {
        const {data} = await getStage()
        commit('setStage', data)
      } catch (e) {
        console.error(e)
      }
    }
  }
})
