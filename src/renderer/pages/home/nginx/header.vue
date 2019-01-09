<template>
    <div>
        <md-toolbar>
            <h6 class="md-title"
                style="flex: 1">
                <span>项目列表 - PROJECT LIST</span>
            </h6>
            <md-button v-show="!$store.state.local.isNginxInstalled"
                @click="installNginx">
                <md-icon>file_download</md-icon>
                <span>nginx安装</span>
            </md-button>
            <md-button class="md-fab md-mini md-primary"
                @click="isNginxRunning">
                <md-icon>playlist_add</md-icon>
            </md-button>
            <md-button class="md-fab md-mini md-primary"
                @click="active = true">
                <md-icon>playlist_add</md-icon>
            </md-button>
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
    isNginxRunning
} from '@/service/lib/local'

export default {
    name: 'headerTop',
    data: () => ({
        active: false,
        value: null
    }),
    methods: {
        installNginx,
        async isNginxRunning(){
            runNginx()
            console.log(await isNginxRunning())
        }
    }
}
</script>

