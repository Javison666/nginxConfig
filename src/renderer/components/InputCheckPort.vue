<template>
    <md-field class=row>
        <label>{{lable}}</label>
        <md-input v-model="currentValue"></md-input>
        <span class="md-helper-text"></span>
    </md-field>
</template>
<script>
import { isPortUsable } from '@/utils/port'
export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    data(){
        return {
            currentValue:''
        }
    },
    props: {
        lable: {
            default: '端口'
        },
        value: [String, Number]
    },
    watch: {
        value(newValue) {
            this.currentValue = newValue
        },
        currentValue(){
            this.checkPort()
            this.$emit('change', this.currentValue)
        }
    },
    methods: {
        async checkPort() {
            let res = await isPortUsable(this.port)
            if (res) {
                console.log('端口可用')
            } else {
                console.log('端口被占用')
            }
        }
    }
}
</script>
