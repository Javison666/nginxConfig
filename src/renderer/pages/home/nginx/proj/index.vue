<template>
    <div>
        <div class="header-top">
            <md-toolbar class="md-primary" :md-fixed="true">
                <router-link to="/nginx">
                    <md-icon>navigate_before</md-icon>
                </router-link>
                <router-link to="/nginx" style="flex: 1">
                    <h3 class="md-title">
                        <span>项目列表</span>
                    </h3>
                </router-link>
                <h3 class="md-title" style="flex: 1;text-align:center;">
                    <span>云管理</span>
                </h3>
                <span style="flex: 1;">
                    <md-button 
                        @click.prevent="addItem"
                        class="md-fab md-mini" 
                        style="float:right;">
                        <md-icon>add</md-icon>
                    </md-button>
                </span>
            </md-toolbar>
        </div>
        <div class="item-list">
            <md-list>
                <div class="fix-top"></div>
                <md-list-item
                    v-for="(item,index) in itemList"
                    class="list-item"
                    @click.stop
                    :key="index"
                >
                    <md-icon style="flex: 1">input</md-icon>
                    <router-link to="/nginx-proj/123" style="flex: 5">
                        <span style="flex: 4;">{{item.name}}</span>
                    </router-link>
                    <span style="flex: 1" @click.stop>
                        <md-switch :value="item.switch" class="md-primary" style="cursor:pointer;"></md-switch>
                    </span>
                    <span style="flex: 1">
                        <span>
                            <md-icon>delete</md-icon>
                        </span>
                    </span>
                </md-list-item>
            </md-list>
        </div>
        <modal-nginx-add-item></modal-nginx-add-item>
    </div>
</template>

<script>
import ModalNginxAddItem from '_c/ModalNginxAddItem'
export default {
    components:{
ModalNginxAddItem
    },
    data() {
        return {
        //     itemList: [
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         },
        //         {
        //             name: "云管理",
        //             switch: true
        //         }
        //     ]
        };
    },
    beforeRouteEnter: (to, from, next) => {
        next()
    },
    computed:{
        itemList(){
            return this.$store.getters['nginx/itemListFromProjId'](this.$route.params.id)
        }
    },
    methods:{
        async addItem(){
            await this.$modal.nginxAddItem.action()
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
    overflow: hidden;
}
.item-list{
    position: absolute;
    top:52px;
    bottom:0;
    left:0;
    right:0;
    overflow: auto;
}
</style>
