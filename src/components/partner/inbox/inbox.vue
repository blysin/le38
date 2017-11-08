<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerCenter'}"></router-link>
            <h1 class="mui-title">我的收件箱</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="inboxlist">
                <ul>
                    <li v-for='(msg,index) in msgList'>
                        <div class="time"><span>{{msg.createTime | dateformat}}</span></div>
                        <div class="itmes">
                            <div class="hd">
                                <a href="javascript:void(0)" @click='toDetail(msg.siteMsgId)'>
                                    <div class="img" :style="'background-image: url('+msg.coverImageUrl+');'"></div>
                                    <p>{{msg.msgTitle}}</p>
                                </a>
                            </div>
                            <div class="bd">
                                <div class="edit-bar"><a href="javascript:void(0)" class="deletesingle" @click='deleteMsg(msg.siteMsgId,index)'><i class="ico ico-delete"></i>删除</a></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="fbbwrap">
                <div class="ftbtnbar">
                    <div class="button-wrap button-wrap-expand">
                        <a href="javascript:void(0)" class="button whiteBtn" @click='deleteAll'>全部删除</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'


export default {
    name: 'products',
    data() {
        return {
            isLoading: true,
            msgList: []
        }
    },
    computed: {

    },
    methods: {
        toDetail(id) {
            router.push({
                name: 'PartnerInboxDetail',
                params: {
                    siteMsgId: id
                }
            })
        },
        deleteMsg(id, index) {
            this.$http.delete('m/partner/inbox/' + id).then(res => {
                this.msgList.splice(index, 1);
                mui.toast('删除成功')
            }, res => {
                if (res.status !== 401 && res.status !== 406) {
                    mui.alert('操作失败，请稍候再试');
                }
            })
        },
        deleteAll() {
            if (this.msgList.length == 0) {
                mui.toast('收件箱为空');
                return false;
            }
            this.$http.delete('m/partner/inbox').then(res => {
                this.msgList = [];
                mui.toast('删除成功')
            }, res => {
                if (res.status !== 401 && res.status !== 406) {
                    mui.alert('操作失败，请稍候再试');
                }
            })
        }
    },
    filters: {

    },
    mounted: function() {
        this.$http.get('m/partner/inbox').then(res => {
            this.msgList = res.body;
            this.isLoading = false;
        }, res => {
            this.isLoading = false;
            if (res.status !== 401) {
                if (res.status === 406)
                    mui.alert('网络错误');
            } else {
                router.push({ name: 'Login' })
            }
        })
    },
    created: function() {

    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
