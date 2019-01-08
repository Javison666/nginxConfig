<template>
    <div class="proj-list">
        <md-list>
            <div class="fix-top"></div>
            <md-list-item
                v-for="(item,index) in projList"
                class="list-item"
                @click.stop
                :key="index"
            >
                <md-icon style="flex: 1">input</md-icon>
                <router-link to="/nginx-proj/123" style="flex: 5">
                    <span style="flex: 4;">{{item.name}}</span>
                </router-link>
                <span style="flex: 1" @click.stop>
                    <md-switch v-model="item.switch" class="md-primary" style="cursor:pointer;"></md-switch>
                </span>
                <span style="flex: 1">
                    <span @click="delActive=true">
                        <md-icon>delete</md-icon>
                    </span>
                </span>
            </md-list-item>
        </md-list>
        <md-dialog-confirm
            :md-active.sync="delActive"
            md-title="删除项目?"
            md-content="该操作无法撤销，请谨慎操作！"
            md-confirm-text="确认"
            md-cancel-text="取消"
        />
    </div>
</template>
<script>
export default {
    data() {
        return {
            delActive: false,
            projList: [
                {
                    name: "云管理",
                    switch: true
                },
                {
                    name: "云管理",
                    switch: true
                },
                {
                    name: "云管理",
                    switch: true
                },
                {
                    name: "云管理",
                    switch: true
                },
                {
                    name: "云管理",
                    switch: true
                },
                {
                    name: "云管理",
                    switch: true
                },
                {
                    name: "云管理",
                    switch: true
                },
                {
                    name: "云管理",
                    switch: true
                },
                {
                    name: "云管理",
                    switch: true
                }
            ]
        };
    }
};
</script>
<style lang="less" scoped>
.md-list-text-container {
    text-align: left;
}
.md-double-line {
    position: relative;
}
.md-list {
    padding-top: 80px;
}
.fix-top {
    height: 70px;
    width: calc(100% - 20px);
    position: fixed;
    z-index: 9;
    top: 0;
    left: 1px;
    background: #fff;
}
.list-item {
    width: 90%;
    margin: auto;
    border-top: 1px solid #eaeaea;
    &:nth-child(2) {
        border-top: 0;
    }
}
</style>
<style lang="less">
</style>