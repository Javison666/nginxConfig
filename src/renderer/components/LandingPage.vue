<template>
	<div>
		<input type=text
		    autofocus
		    v-model="port" />
		<!-- <v-flex xs12
		    sm6
		    md3>
			<v-text-field label="Regular"
			    v-model="port"></v-text-field>
		</v-flex> -->
		<a href=#
		    @click.prevent="checkPort">测试端口</a>

	</div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'
import { isPortUsable } from '../utils/port'

export default {
	name: 'landing-page',
	components: { SystemInformation },
	data() {
		return {
			port: ''
		}
	},
	watch: {
		port() {
			this.checkPort()
		}
	},
	mounted() {
	},
	methods: {
		open(link) {
			this.$electron.shell.openExternal(link)
		},
		async checkPort() {
			let res = await isPortUsable(this.port)
			if (res) {
				console.log('端口可用')
			} else {
				console.log('端口被占用')
			}
		}
	}
}
</script>

<style>
</style>
