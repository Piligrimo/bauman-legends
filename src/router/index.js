import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Team from '../views/Team.vue'
import Game from '../views/Game.vue'
import SideQuest from '../views/SideQuest.vue'
import Docs from '../views/Docs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/side-quest',
    name: 'SideQuest',
    component: SideQuest
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs
  },
  {
    path: '*',
    redirect: '/login'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
