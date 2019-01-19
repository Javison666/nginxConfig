import _fs from '../../utils/fs'
import {
	getNginxConf
} from '../../service/lib/nginxConf'

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
			// 	runSwitch:false,
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
			// 			runSwitch:false,
			// 			// 拦截列表
			// 			locationList:[
			// 				{
			// 					// 拦截api地址
			// 					apiPath:'',
			// 					// 拦截指向类型，'api'->proxyTo,'html'->htmlPath
			// 					apiType:'',
			// 					// html代理地址
			// 					proxyTo:'',
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
	},
	itemListFromProjId:state=>id=>{
		for(let i in state.nginxConf.projList){
			if(state.nginxConf.projList[i].id==id){
				return state.nginxConf.projList[i]
			}
		}
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
			runSwitch:true,
			list:[]
		})
	},
	setSwitchProj(state,proj){
		for(let i in state.nginxConf.projList){
			if(state.nginxConf.projList[i].id==proj.id){
				state.nginxConf.projList[i].runSwitch=!state.nginxConf.projList[i].runSwitch
				break
			}
		}
	},
	setDelProj(state,proj){
		for(let i in state.nginxConf.projList){
			if(state.nginxConf.projList[i].id==proj.id){
				state.nginxConf.projList.splice(i,1)
				break
			}
		}
	},
	setAddItem(state,obj){
		for(let i in state.nginxConf.projList){
			if(state.nginxConf.projList[i].id==obj.projId){
				obj.item.id=new Date().getTime()
				state.nginxConf.projList[i].list.push(obj.item)
				break
			}
		}
	},
	setDelItem(state,obj){
		for(let i in state.nginxConf.projList){
			if(state.nginxConf.projList[i].id==obj.projId){
				for(let j in state.nginxConf.projList[i].list){
					if(state.nginxConf.projList[i].list[j].id==obj.itemId){
						state.nginxConf.projList[i].list.splice(j,1)
						break
					}
				}
				break
			}
		}
	},
	setAddApi(state,obj){
		for(let i in state.nginxConf.projList){
			if(state.nginxConf.projList[i].id==obj.projId){
				for(let j in state.nginxConf.projList[i].list){
					if(state.nginxConf.projList[i].list[j].id==obj.itemId){
						state.nginxConf.projList[i].list[j].locationList===undefined?state.nginxConf.projList[i].list[j].locationList=[]:''
						state.nginxConf.projList[i].list[j].locationList.push(obj.location)
						break
					}
				}
				break
			}
		}
	},
	setDelApi(state,obj){
		for(let i in state.nginxConf.projList){
			if(state.nginxConf.projList[i].id==obj.projId){
				for(let j in state.nginxConf.projList[i].list){
					if(state.nginxConf.projList[i].list[j].id==obj.itemId){
						state.nginxConf.projList[i].list[j].locationList.splice(obj.delIndex,1)
						break
					}
				}
				break
			}
		}
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
	},
	// 项目开关
	switchProj({
		commit,
	},proj){
		commit('setSwitchProj',proj)
	},
	delProj({
		commit,
	},proj){
		commit('setDelProj',proj)
	},
	addItem({
		commit
	},obj){
		commit('setAddItem',obj)
	},
	delItem({
		commit
	},obj){
		commit('setDelItem',obj)
	},
	addApi({
		commit
	},obj){
		commit('setAddApi',obj)
	},
	delApi({
		commit
	},obj){
		commit('setDelApi',obj)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}