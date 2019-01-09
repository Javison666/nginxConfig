<template>
    <div>
        <p>
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
        </p>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        console.log(process)
        console.log(navigator.userAgent)
    }
}
</script>
