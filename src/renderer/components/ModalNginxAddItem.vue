<template>
    <md-dialog
        :md-active="active"
        md-confirm-text="Done"
        @md-confirm="onConfirm"
        @md-cancel="active=false"
        style="width:400px"
        class="box"
    >
        <h6 class="md-title" style="flex: 5;font-size:18px;margin:0;padding-bottom:10px;">新建条目</h6>
        <md-field class="row" style="width:96%;margin:auto;">
            <label>条目名称：</label>
            <md-input v-model="name"></md-input>
            <span class="md-helper-text"></span>
        </md-field>
        <div class="md-content">
            <div class="left">
                <md-field class="row">
                    <label>nginx服务端口：</label>
                    <md-input v-model.trim="serverPort"></md-input>
                    <span class="md-helper-text">例：8080</span>
                </md-field>
            </div>
            <div class="right">
                <md-field class="row">
                    <label>nginx服务名称：</label>
                    <md-input v-model.trim="serverName"></md-input>
                    <span class="md-helper-text">非必填</span>
                </md-field>
            </div>
        </div>
        <md-dialog-actions>
            <md-button class="md-primary" @click="active = false">取消</md-button>
            <md-button class="md-primary" @click="onConfirm">保存</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>
<script>
import { setTimeout } from "timers";
export default {
    data() {
        return {
            active: false,
            successFn: null,
            projId:'',
            name: "",
            serverPort: "",
            serverName: ""
        };
    },
    mounted() {
        this.$modal.nginxAddItem = this;
    },
    methods: {
        async action({
            projId
        }) {
            this.projId=projId
            this.value = "";
            this.active = true;
            return new Promise(resolve => {
                this.successFn = () => {
                    resolve(true);
                };
            });
        },
        onConfirm() {
            if (this.name === "") {
                this.$toast.error("请输入项目名称", "错误", {
                    position: "topRight"
                });
                return (this.active = true);
            }
            if (this.serverPort === "") {
                this.$toast.error("请输入nginx服务端口", "错误", {
                    position: "topRight"
                });
                return (this.active = true);
            }
            this.$store.dispatch('nginx/addItem',{
                projId:this.projId,
                item:{
                    name: this.name,
                    serverPort: this.serverPort,
                    serverName: this.serverName,
                    locationList:[],
                    runSwitch:true
                }
            })
            this.active = false;
            this.successFn();
        }
    }
};
</script>
<style lang="less" scoped>
.box {
    padding: 20px;
    overflow: auto;
    width: 60%;
    .md-content {
        overflow: hidden;
    }
    .left,
    .right {
        width: 50%;
        float: left;
        padding: 2%;
    }
}
</style>
