<template>
    <div class=box>
        <p>
            <span>开发者：</span>
            <span>会做药的Coder（drugCoder）</span>
        </p>
        <p>
            <span>意见请发送邮件至hzez1110@163.com</span>
        </p>
        <!-- <p>
            <span>计算机名称：</span>
            <span>{{this.$process.env.COMPUTERNAME}}</span>
        </p>
        <p>
            <span>操作系统：</span>
            <span>{{this.$process.platform}}</span>
        </p>
        <p>
            <span>LOCALAPPDATA:</span>
            <span>{{this.$process.env.LOCALAPPDATA}}</span>
        </p>
        <p>
            <span>OS:</span>
            <span>{{this.$process.env.OS}}</span>
        </p>
        <p>
            <span>PROCESSOR_ARCHITECTURE:</span>
            <span>{{this.$process.env.PROCESSOR_ARCHITECTURE}}</span>
        </p>
        <p>
            <span>PROCESSOR_IDENTIFIER:</span>
            <span>{{this.$process.env.PROCESSOR_IDENTIFIER}}</span>
        </p> -->
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
    }
}
</script>
<style lang="less" scoped>
.box{
    padding:20px 40px;
}
</style>

