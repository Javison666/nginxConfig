<template>
    <div>
        <md-toolbar>
            <h6 class="md-title"
                style="flex: 5;font-size:18px;">
                <span>项目列表 - PROJECT LIST</span>
                <switch-nginx></switch-nginx>
            </h6>
            <md-button v-show="!$store.state.nginx.isNginxInstalled"
                @click="installNginx">
                <md-icon class="md-primary">file_download</md-icon>
                <span>请安装nginx</span>
                {{$store.state.nginx.isNginxInstalled}}
            </md-button>
            <span @click="$modal.nginxAddproj.action()" style="cursor:pointer;">
                <md-icon class="md-primary">playlist_add</md-icon>
            </span>
        </md-toolbar>
    </div>
</template>
<script>
import { 
    installNginx, 
} from "_slib/nginx";
import SwitchNginx from '_c/SwitchNginx'
import { setTimeout } from 'timers';

export default {
    name: "headerTop",
    components:{
        SwitchNginx
    },
    methods: {
        installNginx
    }
};
</script>

