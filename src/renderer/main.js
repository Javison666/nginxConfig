import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import '@/assets/css/global/index.less'
import 'animate.css/animate.css'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default-dark.css' // This line here
import VueMaterial from 'vue-material'

import exec from './utils/exec'
import fs from './utils/fs'

Vue.use(VueMaterial)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.exec = Vue.prototype.$exec = exec
Vue.fs = Vue.prototype.$fs = fs
Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
	components: {
		App
	},
	router,
	store,
	template: '<App/>'
}).$mount('#app')