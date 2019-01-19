<template>
    <md-dialog
        :md-active="active"
        md-confirm-text="Done"
        @md-confirm="onConfirm"
        @md-cancel="active=false"
        style="width:400px"
        class="box"
    >
        <h6 class="md-title" style="flex: 5;font-size:18px;margin:0;padding-bottom:10px;">新建拦截</h6>
        <div class="md-content">
            <div class="left">
                <md-field class="row">
                    <label>拦截地址：</label>
                    <md-input v-model="apiPath"></md-input>
                    <span class="md-helper-text">例：/api</span>
                </md-field>
            </div>
            <div class="right">
                <md-field>
                    <md-select v-model="apiType" placeholder="选择指向类型">
                        <md-option value="api">指向服务地址</md-option>
                        <md-option value="html">指向静态目录</md-option>
                    </md-select>
                </md-field>
            </div>
        </div>
        <div style="width:96%;margin:auto;">
            <md-field class="row" v-show="apiType=='api'">
                <label>服务地址：</label>
                <md-input v-model="proxyTo"></md-input>
                <span class="md-helper-text">例：http://127.0.0.1:8000</span>
            </md-field>
            <md-field class="row" v-show="apiType=='html'">
                <label>静态目录地址：</label>
                <md-input v-model="htmlPath"></md-input>
                <span class="md-helper-text">C:\user\web</span>
            </md-field>
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
            projId: "",
            itemId: "",
            apiPath: "",
            apiType: "",
            proxyTo: "",
            htmlPath: ""
        };
    },
    mounted() {
        this.$modal.nginxAddApi = this;
    },
    methods: {
        async action({ projId, itemId }) {
            this.itemId = itemId;
            this.projId = projId;
            this.apiType = "";
            this.apiPath="/"
            this.proxyTo=""
            this.htmlPath=""
            this.active = true;
            return new Promise(resolve => {
                this.successFn = () => {
                    resolve(true);
                };
            });
        },
        onConfirm() {
            if (this.apiPath.trim() === "") {
                this.$toast.error("请输入项目名称", "错误", {
                    position: "topRight"
                });
                return (this.active = true);
            }
            if (this.apiType.trim() === "") {
                this.$toast.error("请输入nginx服务端口", "错误", {
                    position: "topRight"
                });
                return (this.active = true);
            }
            this.$store.dispatch("nginx/addApi", {
                projId: this.projId,
                itemId:this.itemId,
                location:{
                    apiPath:this.apiPath,
                    apiType:this.apiType,
                    proxyTo:this.proxyTo,
                    htmlPath:this.htmlPath.replace(/\\/,'/')
                }
            });
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
