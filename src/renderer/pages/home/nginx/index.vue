<template>
	<div class=box>
		<header-top class=header-top></header-top>
		<proj-list class="proj-list md-scrollbar"></proj-list>
		<modal-nginx-add-proj></modal-nginx-add-proj>
	</div>
</template>

<script>
import InputCheckPort from '_c/InputCheckPort'
import ModalNginxAddProj from '_c/ModalNginxAddProj'


import HeaderTop from './header'
import ProjList from './projList'

import {
	isNginxRunning
} from '_slib/nginx'

export default {
	name: 'nginx',
	components: {
		HeaderTop,
		ProjList,
		ModalNginxAddProj,
		
	},
	data() {
		return {
			isInstalled: false
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.checkNginx()
		})
	},
	methods: {
		open(link) {
			this.$electron.shell.openExternal(link)
		},
		async checkNginx() {
			// 确定nginx是否被安装
			let res
			if (this.$env.ifWin) {
				res = await this.$fs.isExist({
					path: this.$appApi.localPath + '/nginx/easy-nginx/easynginx.exe'
				})
			}
			if (this.$env.ifMac) {
				res = await this.$exec.info({
					cmd:'nginx -v'
				})
				if(res.data.indexOf('version')>-1){
					res=true
				}else{
					res=false
				}
			}
			this.$store.dispatch('nginx/checkNginxIsInstalled', res)
			// 确定nginx是否正在运行
			res = await isNginxRunning()
			this.$store.dispatch('nginx/checkNginxIsRunning', res)
		}
	}
}
</script>

<style lang="less" scoped>
div.box {
    height: 100%;
    position: relative;
    overflow: hidden;
}
.header-top {
    position: fixed;
    z-index: 10;
    width: calc(100%);
    left: 0;
    top: 0;
}
.proj-list {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
}
</style>
