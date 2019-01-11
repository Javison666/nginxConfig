<template>
	<div class=box>
		<div class="row">
			<input-check-port v-model="port"></input-check-port>
		</div>
		<!-- <md-button class="md-fab md-mini md-primary"
		    @click="runNginx">
			运行
		</md-button> -->
	</div>
</template>

<script>
import InputCheckPort from '_c/InputCheckPort'
import path from 'path'

export default {
	name: 'nginx',
	components: {
		InputCheckPort,
	},
	data() {
		return {
			port: '',

		}
	},
	mounted() {
	},
	methods: {
		open(link) {
			this.$electron.shell.openExternal(link)
		},
		runNginx() {
			console.log(process)
			// this.$exec.once({
			// 	cmd: 'easynginx.exe',
			// 	path: 'F:\\app\\electron\\nginxConfig\\static\\easy-nginx'
			// })
		}
	}
}
</script>

<style lang="less" scoped>
.box{
	padding:20px 40px;
}
.row {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
