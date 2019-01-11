import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import '@/assets/css/global/index.less'
import 'animate.css/animate.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import 'vue-material/dist/theme/default-dark.css' // This line here
import VueMaterial from 'vue-material'

import appApi from '@/api/app'
import exec from './utils/exec'
import fs from './utils/fs'
import env from './utils/env'
import time from '@/utils/time'

Vue.use(VueMaterial)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.appApi = Vue.prototype.$appApi = appApi
Vue.http = Vue.prototype.$http = axios
Vue.exec = Vue.prototype.$exec = exec
Vue.fs = Vue.prototype.$fs = fs
Vue.env = Vue.prototype.$env = env
Vue.time = Vue.prototype.$time = time
Vue.process=Vue.prototype.$process = process
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