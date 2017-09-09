<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerInbox'}"></router-link>
            <h1 class="mui-title">详情</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="article-det">
                <div class="artcle-det-tit">
                    <h3>{{msg.msgTitle}}</h3>
                    <p>作者：{{msg.msgAuthor}}<span>{{msg.createTime | dateformat}}</span></p>
                </div>
                <div class="article-main">
                    <img :src="msg.coverImageUrl">
                    <p v-html='msg.msgContent'></p>
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
    name: 'MsgDetail',
    data() {
        return {
            isLoading: true,
            msg:{}
        }
    },
    computed: {

    },
    methods: {

    },
    filters: {

    },
    mounted: function() {
        console.log()
        var _id = this.$route.params.siteMsgId;
        this.$http.get('m/partner/inbox/'+_id).then(res => {
            this.msg = res.body;
            this.isLoading = false;
        }, res => {
            this.isLoading = false;
            if (res.status !== 401 && res.status !== 406) {
                mui.alert('网络错误');
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
