import store from '@/store'
import { stages } from '../store'

export const stageGuard = (allowedStages = stages) => async (to, from, next) => {
  if(!store.state.stage) {
    await store.dispatch('getStage')
  } 

  if (allowedStages.includes(store.state.stage)) next() 
  else if (store.state.stage !== 'end') next({name: 'Team'})
  else next({name: 'Banner'})
}

export const adminGuard = async (to, from, next) => {
  if(!store.state.user) {
    await store.dispatch('getUser')
  } 

  if (!store.state.user.admin) 
    next({name: 'Team'})
  else
    next()
}

export const mainAdminGuard = async (to, from, next) => {
  if(!store.state.user) {
    await store.dispatch('getUser')
  } 

  if (store.state.user.main_admin) 
    next()
  else
    next({name: 'Teams'})
}