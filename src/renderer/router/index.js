import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/port',
			name: 'port',
			component: require('@/pages/home/port').default,
		},{
			path: '/nginx',
			name: 'nginx',
			component: require('@/pages/home/nginx').default
		},{
			path:'/nginx-proj/:id',
			name:'nginx-proj-id',
			component:require('@/pages/home/nginx/proj').default
		},{
			path:'/ntfs',
			name:'ntfs',
			component:require('@/pages/home/ntfs').default
		},{
			path:'/system',
			name:'system',
			component:require('@/pages/home/system').default
		},{
			path: '*',
			redirect: '/nginx'
		}
	]
})