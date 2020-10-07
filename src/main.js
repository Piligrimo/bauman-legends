import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex';
import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCrown, faUserMinus, faSignOutAlt, faBars, faSyncAlt, faSearch, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faCrown)
library.add(faUserMinus)
library.add(faSignOutAlt)
library.add(faBars)
library.add(faSyncAlt)
library.add(faSearch)
library.add(faCheck)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuex);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
