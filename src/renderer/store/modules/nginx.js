import _fs from '../../utils/fs'

const state = {
	isNginxInstalled: false,
	isNginxRunning: false,
	nginxConf:{
		projList:[
			// {
			// 	// 项目id
			// 	id:1,
			// 	// 项目名称
			// 	name:'云管理',
			// 	// 项目开关
			// 	switch:false,
			// 	// 项目的配置列表
			// 	list:[
			// 		{
			// 			// 单项id
			// 			id:1,
			// 			// 单项名称
			// 			name:'指向方潇雄',
			// 			// 单项服务端口
			// 			serverPort:'',
			// 			// 单项服务名称
			// 			serverName:'',
			// 			// 是否开启
			// 			switch:false,
			// 			// 拦截列表
			// 			locationList:[
			// 				{
			// 					// 拦截api地址
			// 					apiPath:'',
			// 					// 指向ip的地址
			// 					apiIp:'',
			// 					// 指向的端口
			// 					apiPort:'',
			// 					// html代理的ip
			// 					proxyIp:'',
			// 					// html代理的端口
			// 					proxyPort:'',
			// 					// 或者静态的地址
			// 					htmlPath:''
			// 				}
			// 			]
			// 		}
			// 	]
			// }
		]
	}
}

const getters={
	projList:state=>{
		state.nginxConf.projList
		return state.nginxConf.projList
	}
}

const mutations = {
	setIsNginxInstalled(state, bool) {
		state.isNginxInstalled = bool
	},
	setIsNginxRunning(state, bool) {
		state.isNginxRunning = bool
	},
	setProjList(state,list){
		state.nginxConf.projList=list
	},
	setAddProjList(state,name){
		let id
		if(state.nginxConf.projList.length==0){
			id=10000000
		}else{
			id=Math.max.apply(Math,state.nginxConf.projList.map(item=>item.id))
			id++
		}
		state.nginxConf.projList.unshift({
			id,
			name:name,
			switch:true,
			list:[]
		})
	}
}

const actions = {
	// async actionAppInit({
	// 	commit
	// }) {
	// 	let res
	// 	if (env.isWin()) {
	// 		await _fs.mkdir({
	// 			path: appApi.localPath
	// 		})
	// 	}
	// },
	async checkNginxIsInstalled({
		commit
	},bool) {
		commit('setIsNginxInstalled', bool)
	},
	async checkNginxIsRunning({
		commit
	}, bool) {
		commit('setIsNginxRunning', bool)
	},
	updateProjList({
		commit
	},list){
		commit('setProjList',list)
	},
	addProj({
		commit,
	},name){
		commit('setAddProjList',name)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}