<template>
    <div style="display:inline-block;">
        <span @click="runNginx"
            v-show="$store.state.nginx.isNginxInstalled && !$store.state.nginx.isNginxRunning">
            <!-- 运行nginx -->
            <md-icon style="color:#02dc50;">play_circle_filled</md-icon>
        </span>
        <span @click="stopNginx"
            v-show="$store.state.nginx.isNginxInstalled && $store.state.nginx.isNginxRunning">
            <md-icon style="color:#ff3333;">power_settings_new</md-icon>
        </span>
    </div>
</template>
<script>
import { 
    runNginx, 
    isNginxRunning,
    stopNginx 
} from "_slib/nginx";
import { setTimeout } from 'timers';
export default {
    methods:{
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
}
</script>
