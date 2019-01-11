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
                <router-link :to="`/nginx-proj/${item.id}`" style="flex: 5">
                    <span style="flex: 4;">{{item.name}}</span>
                </router-link>
                <span style="flex: 1" @click.stop>
                    <md-switch :value="item.switch" @change="switchProj(item)" class="md-primary" style="cursor:pointer;"></md-switch>
                </span>
                <span style="flex: 1">
                    <span @click="delProj(item)">
                        <md-icon>delete</md-icon>
                    </span>
                </span>
            </md-list-item>
        </md-list>
        <md-empty-state
            v-show="projList.length==0"
            md-icon="devices_other"
            md-label="创建你的第一个项目"
            md-description="Create your first project"
        >
            <md-button class="md-primary md-raised" @click="addProj">创建</md-button>
        </md-empty-state>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            delActive: false
        };
    },
    computed: {
        ...mapGetters({
            projList: "nginx/projList"
        })
    },
    mounted() {
        // this.$store.dispatch('nginx/updateProjList',[])
    },
    methods: {
        addProj() {
            this.$modal.nginxAddproj.action();
        },
        switchProj(item){
            this.$store.dispatch('nginx/switchProj',item)
        },
        async delProj(item){
            await this.$modal.del.action({
                title:'删除项目'
            })
            this.$store.dispatch('nginx/delProj',item)
        }
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
.list-item {
    width: calc(100% - 12px);
    margin: auto;
    border-top: 1px solid #eaeaea;
    &:nth-child(2) {
        border-top: 0;
    }
}
</style>
<style lang="less">
</style>