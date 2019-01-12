<template>
    <md-dialog
        :md-active="active"
        v-model="value"
        md-confirm-text="Done"
        @md-confirm="onConfirm"
        @md-cancel="active=false"
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
                    <md-input v-model="name"></md-input>
                    <span class="md-helper-text"></span>
                </md-field>
                <!-- <md-field class="row">
                    <label>html代理地址：</label>
                    <md-input v-model="name"></md-input>
                    <span class="md-helper-text">
                        例：127.0.0.1:8000
                    </span>
                </md-field>-->
            </div>
            <div class="right">
                <!-- <md-field class="row" style="opacity:0;">
                    <label>nginx服务名称：</label>
                    <md-input v-model="serverName"></md-input>
                    <span class="md-helper-text">非必填</span>
                </md-field> -->
                <md-field class="row">
                    <label>nginx服务名称：</label>
                    <md-input v-model="serverName"></md-input>
                    <span class="md-helper-text">非必填</span>
                </md-field>
                <!-- <md-field class="row">
                    <label>html代理地址：</label>
                    <md-input v-model="name"></md-input>
                    <span class="md-helper-text">
                        例：127.0.0.1:8000
                    </span>
                </md-field>
                <md-field class="row">
                    <label>html静态地址：</label>
                    <md-input v-model="name"></md-input>
                    <span class="md-helper-text">
                        例：C:\user\web
                    </span>
                </md-field>-->
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
            active: true,
            value: "",
            successFn: null,
            name: "",
            runSwitch: true,
            serverPort: "",
            serverName: ""
        };
    },
    mounted() {
        this.$modal.nginxAddItem = this;
    },
    methods: {
        async action() {
            this.value = "";
            this.active = true;
            return new Promise(resolve => {
                this.successFn = () => {
                    resolve(true);
                };
            });
        },
        onConfirm() {
            if (this.value.trim() === "") {
                this.$toast.error("请输入项目名称", "错误", {
                    position: "topRight"
                });
                return (this.active = true);
            }
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
