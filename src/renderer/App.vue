<template>
	<div id="app">
		<div class="page-container">
			<md-app md-waterfall
			    md-mode="fixed">
				<md-app-drawer md-permanent="full">
					<md-toolbar class="md-transparent"
					    md-elevation="0">
						<img width="80%"
						    style="display:inline-block;margin:auto;"
						    :src="`file:///${staticPath}/img/icon/icon.ico`" />
						<!-- <p style="text-align:center;width:100%;padding:0!important;margin:0;">EASY-TOOL</p> -->
					</md-toolbar>
					<md-list class="menu-list">
						<router-link to="/nginx"
						    class="menu-list-item"
						    active-class="menu-list-item-active"
						    tag="div">
							<md-list-item>
								<md-icon>wrap_text</md-icon>
								<span class="md-list-item-text">NGINX</span>
							</md-list-item>
						</router-link>
						<router-link to="/port"
						    class="menu-list-item"
						    active-class="menu-list-item-active"
						    tag="div">
							<md-list-item>
								<md-icon>show_chart</md-icon>
								<span class="md-list-item-text">PORT</span>
							</md-list-item>
						</router-link>
						<router-link to="/ntfs"
						    v-show="$env.ifMac"
						    class="menu-list-item"
						    active-class="menu-list-item-active"
						    tag="div">
							<md-list-item>
								<md-icon>usb</md-icon>
								<span class="md-list-item-text">NTFS</span>
							</md-list-item>
						</router-link>
						<router-link to="/system"
						    class="menu-list-item"
						    active-class="menu-list-item-active"
						    tag="div">
							<md-list-item>
								<md-icon>public</md-icon>
								<span class="md-list-item-text">INFO</span>
							</md-list-item>
						</router-link>
					</md-list>
				</md-app-drawer>
				<md-app-content>
					<transition name="slide-right">
						<router-view></router-view>
					</transition>
				</md-app-content>
			</md-app>
		</div>
		<!-- <header  style="-webkit-app-region: drag"></header> -->
		<modal-del></modal-del>
	</div>
</template>

<script>
import { setTimeout } from 'timers';
import ModalDel from '_c/ModalDel'
export default {
	components: {
		ModalDel
	},
	data() {
		return {
			staticPath: __static,
			icons: ['dashboard', 'home', 'event']
		}
	},
	mounted() {
		if (this.$env.isWin()) {
			this.$fs.mkdir({
				path: this.$appApi.localPath
			})
		}
		// this.$store.dispatch('nginx/actionAppInit')
	},
	methods: {
	}
}
</script>
<style lang="less" scoped>
#app,
.page-container {
    width: 100%;
    height: 100%;
}
/* CSS */
.header {
    height: 30px;
    background: #eaeaea;
}

.md-app {
    height: 100%;
    border: 1px solid rgba(#000, 0.12);
}
.md-drawer {
    padding-top: 10px !important;
    width: 120px !important;
    max-width: calc(100vw - 125px);
    border-right: 1px solid #eaeaea;
}
.menu-list {
    padding-top: 30px !important;
    .menu-list-item {
        transition: all 0.2s;
        &:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    }
    .menu-list-item-active {
        .md-icon-font {
            color: #448aff;
        }
        background: rgba(0, 0, 0, 0.1);
        color: #448aff;
        &:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    }
}
.menu-list-item {
    cursor: pointer;
}
</style>
<style lang="less">
.md-app-content {
	padding: 0 !important;
	overflow: hidden;
	border-left:0 !important;
}
.md-list-item-content > .md-icon:first-child {
    margin-right: 10px !important;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
	
  will-change: transform;
  transition: all 200ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(0, 10%, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(0, -10%, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(0, -10%, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(0, 10%, 0);
}
</style>
