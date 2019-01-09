<template>
    <div>
        <md-toolbar>
            <h6 class="md-title" style="flex: 5;font-size:18px;">
                <span>项目列表 - PROJECT LIST</span>
                <md-icon class="md-primary">play_circle_filled</md-icon>
                <md-icon class="md-primary">power_settings_new</md-icon>
            </h6>
            <md-button v-show="!$store.state.local.isNginxInstalled" @click="installNginx">
                <md-icon class="md-primary">file_download</md-icon>
                <span>请安装nginx</span>
            </md-button>
            <span @click="active = true">
                <md-icon class="md-primary">playlist_add</md-icon>
            </span>
        </md-toolbar>
        <md-dialog-prompt
            :md-active.sync="active"
            v-model="value"
            md-title="请输入项目名称"
            md-input-maxlength="30"
            md-input-placeholder="Type your project's name..."
            md-confirm-text="Done"
        />
    </div>
</template>
<script>
import { runNginx, installNginx, isNginxRunning } from "@/service/lib/nginx";

export default {
    name: "headerTop",
    data: () => ({
        active: false,
        value: null
    }),
    methods: {
        installNginx,
        async isNginxRunning() {
            runNginx();
            console.log(await isNginxRunning());
        }
    }
};
</script>

