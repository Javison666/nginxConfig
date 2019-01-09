<template>
	<div>
		<header-top class=header-top></header-top>
		<proj-list class="proj-list md-scrollbar"></proj-list>
	</div>
</template>

<script>
import InputCheckPort from '_c/InputCheckPort'

import HeaderTop from './header'
import ProjList from './projList'

export default {
	name: 'nginx',
	components: {
		HeaderTop,
		ProjList
	},
	data() {
		return {
			isInstalled:false
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.checkNginxExist()
		})
	},
	methods: {
		open(link) {
			this.$electron.shell.openExternal(link)
		},
		async checkNginxExist(){
			this.isInstalled=await this.$fs.isExist({
				path:process.env.LOCALAPPDATA+'/jj-easy-tool'
			})
			// console.log(this.isInstalled)
		}
	}
}
</script>

<style lang="less" scoped>
.row {
    margin-top: 20px;
    margin-bottom: 20px;
}
.header-top {
    position: fixed;
    z-index: 10;
    width: calc(100% - 32px);
}
.proj-list {
    // height: calc(100vh - 70px);
}
</style>
