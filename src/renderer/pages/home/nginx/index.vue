<template>
	<div class=box>
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
div.box{
	height: 100%;
	position: relative;
	overflow: hidden;
}
.header-top {
    position: fixed;
    z-index: 10;
	width: calc(100%);
	left:0;
	top:0;
}
.proj-list {
	position: absolute;
	top:52px;
	bottom:0;
	left:0;
	right:0;
	overflow: auto;
}
</style>
