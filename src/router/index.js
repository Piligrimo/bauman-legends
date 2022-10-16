import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Team from '../views/Team.vue'
import Teams from '../views/admin/Teams.vue'
import Moderators from '../views/admin/Moderators.vue'
import Help from '../views/Help.vue'
import Consult from '../views/Consult.vue'
import Feed from '../views/Feed.vue'
import Banner from '../views/Banner.vue'
import Game from '../views/Game.vue'
import StageControl from '../views/admin/StageControl.vue'
import Results from '../views/Results.vue'
import List from '../views/admin/puzzles/List.vue'
import PuzzleCreate from '../views/admin/puzzles/Create.vue'
import PuzzleEdit from '../views/admin/puzzles/Edit.vue'
import { adminGuard, stageGuard } from './guards'


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
    component: Team,
    beforeEnter: stageGuard(['main','register'])
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams,
    beforeEnter: adminGuard
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/consult',
    name: 'Consult',
    component: Consult,
    beforeEnter: stageGuard(['main','register'])
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
    beforeEnter: stageGuard(['main','register'])
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
    beforeEnter: stageGuard(['main'])
  },
  {
    path: '/puzzle',
    name: 'Puzzles',
    component: List,
    beforeEnter: adminGuard
  },
  {
    path: '/puzzle/create',
    name: 'PuzzleCreate',
    component: PuzzleCreate,
    beforeEnter: adminGuard
  },
  {
    path: '/puzzle/edit/:id/:type',
    name: 'PuzzleEdit',
    component: PuzzleEdit,
    beforeEnter: adminGuard
  },
  {
    path: '/moders',
    name: 'Moderators',
    component: Moderators,
    beforeEnter: adminGuard
  },
  {
    path: '/banner',
    name: 'Banner',
    component: Banner,
    beforeEnter: stageGuard(['final','register','end'])
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
    beforeEnter: stageGuard(['main'])
  },
  {
    path: '/stage-control',
    name: 'StageControl',
    component: StageControl,
    beforeEnter: adminGuard
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
