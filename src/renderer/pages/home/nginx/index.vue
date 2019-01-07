<template>
	<div>
		<header-top></header-top>
		<div class="row">
			<input-check-port v-model="port"></input-check-port>
		</div>
	</div>
</template>

<script>
import InputCheckPort from '_c/InputCheckPort'

import HeaderTop from './header'

export default {
	name: 'nginx',
	components: {
		InputCheckPort,
		HeaderTop
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
