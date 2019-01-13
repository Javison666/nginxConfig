<template>
    <div>
        <div class="header-top">
            <md-toolbar :md-fixed="true">
                <router-link to="/nginx">
                    <md-icon>navigate_before</md-icon>
                </router-link>
                <router-link to="/nginx" style="flex: 1">
                    <h3 class="md-title">
                        <span>项目列表</span>
                    </h3>
                </router-link>
                <h3 class="md-title" style="flex: 1;text-align:center;">
                    <span>{{proj.name}}</span>
                </h3>
                <span style="flex: 1;">
                    <md-button @click.prevent="addItem" class="md-fab md-mini" style="float:right;">
                        <md-icon>add</md-icon>
                    </md-button>
                </span>
            </md-toolbar>
        </div>
        <div class="item-list">
            <md-list>
                <div class="fix-top"></div>
                <md-list-item
                    md-expand
                    v-for="(item,index) in proj.list"
                    class="list-item"
                    @click.stop
                    :key="index"
                >
                    <span style="flex: 1" @click.stop>
                        <md-switch :value="item.switch" class="md-primary" style="cursor:pointer;"></md-switch>
                    </span>
                    <span style="flex: 3;">{{item.name}}</span>
                    <span style="flex: 2;">端口：{{item.serverPort}}</span>
                    <span style="flex: 1">
                        <md-icon>file_copy</md-icon>
                    </span>
                    <div style="flex: 1" @click.stop>
                        <span @click.stop="delItem">
                            <md-icon>remove_circle</md-icon>
                        </span>
                    </div>
                    <md-list slot="md-expand">
                        <md-list-item
                            class="md-inset"
                            v-for="(loc,index2) in item.locationList"
                            :key="index2"
                        >
                            <span>拦截地址头：{{loc.apiPath}}</span>
                            <span v-show="loc.apiType=='api'">拦截转向：{{loc.proxyTo}}</span>
                            <span v-show="loc.apiType=='html'">拦截转向：{{loc.htmlPath}}</span>
                            <span @click.prevent="delApi(item,index2)">
                                <md-icon>clear</md-icon>
                            </span>
                        </md-list-item>
                        <md-list-item class="md-inset">
                            <div
                                style="display:inline-block;margin:auto;"
                                @click.prevent="addApi(item)"
                            >
                                <md-icon>note_add</md-icon>
                                <span>添加拦截</span>
                            </div>
                        </md-list-item>
                    </md-list>
                </md-list-item>
            </md-list>
        </div>
        <modal-nginx-add-item></modal-nginx-add-item>
        <modal-nginx-add-api></modal-nginx-add-api>
    </div>
</template>

<script>
import ModalNginxAddItem from "_c/ModalNginxAddItem";
import ModalNginxAddApi from "_c/ModalNginxAddApi";
export default {
    components: {
        ModalNginxAddItem,
        ModalNginxAddApi
    },
    data() {
        return {};
    },
    beforeRouteEnter: (to, from, next) => {
        next();
    },
    computed: {
        proj() {
            return this.$store.getters["nginx/itemListFromProjId"](
                this.$route.params.id
            );
        }
    },
    methods: {
        async addItem() {
            await this.$modal.nginxAddItem.action({
                projId: this.$route.params.id
            });
        },
        async delItem(item) {
            await this.$modal.del.action({
                title:'删除该条目'
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
                title:'删除该拦截'
            })
            this.$store.dispatch("nginx/delApi", {
                projId: this.$route.params.id,
                itemId: item.id,
                delIndex: index
            });
            this.$forceUpdate();
        }
    }
};
</script>
<style lang="less" scoped>
.header-top {
    position: fixed;
    top: 0px;
    left: 1px;
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
</style>
