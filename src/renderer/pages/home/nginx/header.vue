<template>
    <div>
        <md-toolbar>
            <h6 class="md-title"
                style="flex: 5;font-size:18px;">
                <span>项目列表 - PROJECT LIST</span>
                <span 
                    @click="runNginx"
                    v-show="$store.state.nginx.isNginxInstalled && !$store.state.nginx.isNginxRunning">
                    <!-- 运行nginx -->
                    <md-icon class="md-primary cr"
                        >play_circle_filled</md-icon>
                </span>
                <span 
                    @click="stopNginx"
                    v-show="$store.state.nginx.isNginxInstalled && $store.state.nginx.isNginxRunning">
                    <md-icon class="md-primary"
                        >power_settings_new</md-icon>
                </span>

            </h6>
            <md-button v-show="!$store.state.nginx.isNginxInstalled"
                @click="installNginx">
                <md-icon class="md-primary">file_download</md-icon>
                <span>请安装nginx</span>
            </md-button>
            <span @click="active = true">
                <md-icon class="md-primary">playlist_add</md-icon>
            </span>
        </md-toolbar>
        <md-dialog-prompt :md-active.sync="active"
            v-model="value"
            md-title="请输入项目名称"
            md-input-maxlength="30"
            md-input-placeholder="Type your project's name..."
            md-confirm-text="Done" />
    </div>
</template>
<script>
import { 
    runNginx, 
    installNginx, 
    isNginxRunning,
    stopNginx 
} from "_slib/nginx";
import { setTimeout } from 'timers';

export default {
    name: "headerTop",
    data: () => ({
        active: false,
        value: null
    }),
    methods: {
        installNginx,
        async stopNginx(){
            await stopNginx()
            this.$store.dispatch('nginx/checkNginxIsRunning',await isNginxRunning())
        },
        async runNginx() {
            let res
            res=await runNginx()
            // 等待0.4s
            await this.$time.waitingSec(0.4)
            this.$store.dispatch('nginx/checkNginxIsRunning',await isNginxRunning())
        }
    }
};
</script>

