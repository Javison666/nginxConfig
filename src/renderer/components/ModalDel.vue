<template>
    <md-dialog-confirm
        :md-active.sync="active"
        :md-title="title"
        :md-content="content"
        md-confirm-text="确认"
        md-cancel-text="取消"
        @md-confirm="onConfirm"
    />
</template>
<script>
export default {
    data:()=>({
        active:false,
        title:'',
        content:'',
        successFn:null
    }),
    mounted(){
        this.$modal.del = this;
    },
    methods:{
        action({
            title,
            content
        }){
            this.title=title?title:'删除？'
            this.content=content?content:'该操作无法撤销，请谨慎操作！'
            this.active = true;
            return new Promise(resolve => {
                this.successFn = () => {
                    resolve(true);
                };
            });
        },
        onConfirm(){
            this.successFn()
        }
    }
}
</script>
