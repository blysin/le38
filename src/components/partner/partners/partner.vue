<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerCenter'}"></router-link>
            <h1 class="mui-title">我的城市合伙人</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="storetopbar">
                <p class="info partner">城市合伙人数量：{{partners.length}}</p>
            </div>
            <div class="iconinfo" v-show="!isLoading && partners.length == 0">
                <i class="ico ico-info"></i>
                <strong>你还没有城市合伙人，要努力哦！</strong>
            </div>
            <div class="wrap" v-show="!isLoading && partners.length > 0">
                <div class="partner-list">
                    <ul>
                        <li v-for='p in partners'>
                            <div class="t"><span>{{p.totalAmt || 0}}</span>
                                <p>{{p.telephone | phone}}</p>
                            </div>
                            <div class="b"><span>本月营业额</span>
                                <p>申请时间:{{p.createTime | dateformat}}</p>
                            </div>
                        </li>
                    </ul>
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
    name: 'Shop',
    data() {
        return {
            isLoading: true,
            partners:[]
        }
    },
    computed: {

    },
    methods: {

    },
    filters: {

    },
    mounted: function() {

    },
    created: function() {
        this.$http.get('m/partner/partners').then(res => {
            this.partners = res.body;
            this.isLoading = false;
        }, res => {
            if (res.status === 401) {
                router.push({ name: 'Login' })
            } else {
                this.isLoading = false;
                mui.alert('网络出错，请稍候再试');
            }
        })
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
