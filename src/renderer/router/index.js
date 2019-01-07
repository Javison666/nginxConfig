import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/port',
			name: 'landing-page',
			component: require('@/components/LandingPage').default,
		},{
			path: '/nginx',
			name: 'nginx',
			component: require('@/pages/home/nginx').default,
		},
		{
			path: '*',
			redirect: '/port'
		}
	]
})