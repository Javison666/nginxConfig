<template>
	<div id="app">
		<v-app>
			<v-navigation-drawer app
			    fixed
			    clipped>
				<v-list>
					<v-list-tile v-for="i in 3"
					    :to="{path: '/page' + i}">
						<v-list-tile-action>
							<v-icon>{{ icons[i-1] }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>Page {{ i }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>
			<v-toolbar app
			    fixed
			    clipped-left>
				<v-menu :nudge-width="-100">
					<v-toolbar-title slot="activator">
						Toolbar
					</v-toolbar-title>
					<v-list>
						<v-list-tile :to="'/page1'">
							Settings
						</v-list-tile>
						<v-list-tile :to="'/page2'">
							<v-list-tile-title v-text="'Account'"></v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>
			</v-toolbar>
			<v-content>
				<v-container fluid>
					<v-fade-transition mode="out-in">
						<router-view></router-view>
					</v-fade-transition>
				</v-container>
			</v-content>
		</v-app>
		<router-view></router-view>
		<!-- <header  style="-webkit-app-region: drag"></header> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			icons: ['dashboard', 'home', 'event']
		}
	}
}
</script>

<style>
/* CSS */
header {
    height: 30px;
    background: #eaeaea;
}
</style>
