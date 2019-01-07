<template>
	<div>
		<md-toolbar>
			<h3 class="md-title" style="flex: 1">
				<span>项目列表 - PROJECT LIST</span>
			</h3>
			<md-button class="md-fab md-mini md-primary">
				<md-icon>add</md-icon>
			</md-button>
		</md-toolbar>
		<div class="row">
			<input-check-port v-model="port"></input-check-port>
		</div>
	</div>
</template>

<script>
import InputCheckPort from '_c/InputCheckPort'

export default {
	name: 'nginx',
	components: {
		InputCheckPort
	},
	data() {
		return {
			port: ''
		}
	},
	mounted() {
	},
	methods: {
		open(link) {
			this.$electron.shell.openExternal(link)
		}
	}
}
</script>

<style lang="less" scoped>
.row {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
