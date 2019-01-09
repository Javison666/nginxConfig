import _fs from '../../utils/fs'
import appApi from '../../api/app'

const state = {
	isNginxInstalled:false
}

const mutations = {
	setIsNginxInstalled(state,bool){
		state.isNginxInstalled=bool
	}
}

const actions = {
	async actionAppInit({
		commit
	}){
		let res
		await _fs.mkdir({
			path: this.$appApi.localPath
		})
		res =await _fs.isExist({
			path: appApi.localPath + '/nginx'
		})
		commit('setIsNginxInstalled',res)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}