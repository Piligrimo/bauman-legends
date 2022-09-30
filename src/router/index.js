import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Team from '../views/Team.vue'
import Teams from '../views/admin/Teams.vue'
import Help from '../views/Help.vue'
import Consult from '../views/Consult.vue'
import Feed from '../views/Feed.vue'
import Game from '../views/Game.vue'


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
    path: '/teams',
    name: 'Teams',
    component: Teams
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/consult',
    name: 'Consult',
    component: Consult
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  // {
  //   path: '/side-quest',
  //   name: 'SideQuest',
  //   component: SideQuest
  // },
  // {
  //   path: '/docs',
  //   name: 'Docs',
  //   component: Docs
  // },
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
