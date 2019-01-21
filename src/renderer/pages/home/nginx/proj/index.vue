<template>
    <div>
        <div class="header-top">
            <md-toolbar :md-fixed="true">
                <div style="position:absolute;left:0;top:0;width:150px;line-height:62px;">
                    <router-link to="/nginx"
                        style="display:inline-block;">
                        <md-icon>navigate_before</md-icon>
                    </router-link>
                    <router-link to="/nginx"
                        style="display:inline-block;vertical-align:middle;">
                        <h3 class="md-title">
                            <span>nginx</span>
                        </h3>
                    </router-link>
                    <switch-nginx style="margin-left:10px;position:relative;top:1px;"></switch-nginx>
                </div>

                <h3 class="md-title"
                    style="flex: 8;text-align:center;">
                    <span>{{proj.name}}</span>
                </h3>
                <span style="position:absolute;right:16px;top;10px;">
                    <md-button @click.prevent="addItem"
                        class="md-fab md-mini"
                        style="float:right;">
                        <md-icon>add</md-icon>
                    </md-button>
                </span>
            </md-toolbar>
        </div>
        <div class="item-list">
            <md-list style="padding-top:16px;">
                <md-list-item md-expand
                    v-for="(item,index) in proj.list"
                    class="list-item"
                    @click.stop
                    :key="index">
                    <div style="display:flex;"
                        class="item-row">
                        <span style="flex: 1;text-align:right;"
                            @click.stop>
                            <!-- <md-switch :value="!item.runSwitch"
                                @change="switchItem(item)"
                                class="md-primary"
                                style="cursor:pointer;"></md-switch> -->
                        </span>
                        <span style="flex: 4;">{{item.name}}</span>
                        <span style="flex: 2;">PORT ：{{item.serverPort}}</span>
                        <span style="flex: 1;text-align:center;"
                            @click.stop="$electron.shell.openExternal('http://'+$env.getIP()+':'+item.serverPort)">
                            <md-icon style="color:#02dc50">launch</md-icon>
                        </span>
                        <!-- <span style="flex: 1;text-align:center;">
                            <md-icon>file_copy</md-icon>
                        </span> -->
                        <div style="flex: 1;text-align:center;"
                            @click.stop>
                            <span @click.stop="delItem(item)">
                                <md-icon style="color:#ff3333">remove_circle</md-icon>
                            </span>
                        </div>
                    </div>

                    <md-list slot="md-expand">
                        <md-list-item class="md-inset"
                            v-for="(loc,index2) in item.locationList"
                            :key="index2">
                            <span>Location：{{loc.apiPath}}</span>
                            <span v-show="loc.apiType=='api'">转向：{{loc.proxyTo}}</span>
                            <span v-show="loc.apiType=='html'">转向：{{loc.htmlPath}}</span>
                            <span @click.prevent="delApi(item,index2)">
                                <md-icon>clear</md-icon>
                            </span>
                        </md-list-item>
                        <md-list-item class="md-inset">
                            <div style="display:inline-block;margin:auto;"
                                @click.prevent="addApi(item)">
                                <md-icon>note_add</md-icon>
                                <span>添加拦截</span>
                            </div>
                        </md-list-item>
                    </md-list>
                </md-list-item>
            </md-list>
        </div>
        <md-empty-state v-show="proj.list.length==0"
            style="padding-top:120px;"
            md-icon="devices_other"
            md-label="创建项目的第一个代理"
            md-description="Create your first project">
            <md-button class="md-primary md-raised"
                @click="addItem">创建</md-button>
        </md-empty-state>
        <modal-nginx-add-item></modal-nginx-add-item>
        <modal-nginx-add-api></modal-nginx-add-api>
    </div>
</template>

<script>
import ModalNginxAddItem from "_c/ModalNginxAddItem";
import ModalNginxAddApi from "_c/ModalNginxAddApi";
import SwitchNginx from '_c/SwitchNginx'
import {
    updateNginxConf
} from '_slib/nginx'
import { setTimeout } from 'timers';
export default {
    components: {
        ModalNginxAddItem,
        ModalNginxAddApi,
        SwitchNginx
    },
    data() {
        return {};
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            vm.init()
        });
    },
    computed: {
        proj() {
            updateNginxConf()
            return this.$store.getters["nginx/itemListFromProjId"](
                this.$route.params.id
            );
        }
    },
    methods: {
        init() {
            updateNginxConf()
        },
        async addItem() {
            await this.$modal.nginxAddItem.action({
                projId: this.$route.params.id
            });
        },
        async delItem(item) {
            await this.$modal.del.action({
                title: '删除该条目'
            })
            this.$store.dispatch("nginx/delItem", {
                projId: this.$route.params.id,
                itemId: item.id
            });
            this.$forceUpdate();
        },
        async addApi(item) {
            await this.$modal.nginxAddApi.action({
                projId: this.$route.params.id,
                itemId: item.id
            });
            this.$forceUpdate();
        },
        async delApi(item, index) {
            await this.$modal.del.action({
                title: '删除该拦截'
            })
            this.$store.dispatch("nginx/delApi", {
                projId: this.$route.params.id,
                itemId: item.id,
                delIndex: index
            });
            this.$forceUpdate();
        },
        switchItem(item){
            let i=JSON.parse(JSON.stringify(item))
            i.runSwitch=!i.runSwitch
        }
    }
};
</script>
<style lang="less" scoped>
.header-top {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;
    width: calc(100%);
    // overflow: hidden;
}
.item-list {
    position: absolute;
    top: 52px;
    bottom: 0;
    left: 1px;
    right: 0;
    overflow: auto;
}
.item-row {
    width: calc(100% - 48px);
    line-height: 52px;
}
.md-inset {
    span {
        text-align: left;
    }
}
</style>
