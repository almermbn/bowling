// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Buefy from 'buefy'
import VueResource from "vue-resource"
import HighchartsVue from 'highcharts-vue'
import VueAnimateNumber from 'vue-animate-number'


Vue.use(Buefy)
Vue.use(VueResource)
Vue.use(HighchartsVue)
Vue.use(VueAnimateNumber)

Vue.config.productionTip = false;
Vue.prototype.$remoteUrl = "https://drbowling.herokuapp.com/";


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
