<template>
    <md-dialog-prompt
        :md-active="active"
        v-model="value"
        :md-backdrop="false"
        md-title="请输入项目名称"
        md-input-maxlength="30"
        md-input-placeholder="Type your project's name..."
        md-confirm-text="Done"
        @md-confirm="onConfirm"
        @md-cancel="active=false"
        style="width:554px"
    />
</template>
<script>
import { setTimeout } from "timers";
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            active: false,
            value: "",
            successFn: null
        };
    },
    computed:{
        ...mapGetters({
            projList: "nginx/projList"
        })
    },
    mounted() {
        this.$modal.nginxAddproj = this;
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
                return this.active = true;
            }
            console.log(this.projList)
            for (let index in this.projList) {
                console.log(this.projList[index])
                if (this.projList[index].name == this.value) {
                    this.$toast.error("项目名称已存在", "错误", {
                        position: "topRight"
                    });
                    return this.active = true;
                }
            }
            this.$store.dispatch("nginx/addProj", this.value);
            this.active = false;
            this.successFn();
        }
    }
};
</script>
