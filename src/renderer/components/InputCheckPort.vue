<template>
    <md-field class="row">
        <label>{{lable}}</label>
        <md-input v-model="currentValue"></md-input>
        <span class="md-helper-text">{{currentValue===''?'':isUsableTxt}}</span>
    </md-field>
</template>
<script>
import { isPortUsable } from "@/utils/port";
export default {
    model: {
        prop: "value",
        event: "change"
    },
    data() {
        return {
            currentValue: "",
            isUsable: false
        };
    },
    computed: {
        isUsableTxt() {
            if (this.isUsable === null) {
                return "非法";
            }
            if (this.isUsable) {
                return "可用";
            } else {
                return "已被占用";
            }
        }
    },
    props: {
        lable: {
            default: "端口"
        },
        value: [String, Number]
    },
    watch: {
        value(newValue) {
            this.currentValue = newValue;
        },
        currentValue() {
            this.checkPort();
            this.$emit("change", this.currentValue);
        }
    },
    methods: {
        async checkPort() {
            if (
                !/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(
                    this.currentValue
                )
            ) {
                return this.isUsable = null;
            }
            let res = await isPortUsable(this.currentValue);
            if (res) {
                this.isUsable = true;
                console.log("端口可用");
            } else {
                this.isUsable = false;
                console.log("端口被占用");
            }
        }
    }
};
</script>
