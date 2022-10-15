import store from '@/store'
import { stages } from '../store'

export const stageGuard = (allowedStages = stages) => async (to, from, next) => {
  if(!store.state.stage) {
    await store.dispatch('getStage')
  } 

  if (allowedStages.includes(store.state.stage)) next() 
  else if (!['final', 'end'].includes(store.state.stage)) next({name: 'Team'})
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