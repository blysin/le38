<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerCenter'}"></router-link>
            <h1 class="mui-title">我的钱包</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="wallettop mb10">
                <p><em>当前剩余金额(元)</em></p>
                <h3 class="fz-32 mb10">260</h3>
                <p class="color-gray fz-12">每个月末结算该月分润</p>
                <a class="btn" href="withdrawals.html">提现</a>
            </div>
            <div class="wrap">
                <div class="partner-list">
                    <ul>
                        <!----><li>
                        <h3>No.1234567890</h3>
                        <div class="t"><span>300</span><p>门店名称门店名称门店名称</p></div>
                        <div class="b"><span>产生分润</span><p>开店时间:2017-04-24 15:53</p></div>
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
    name: 'Wallet',
    data() {
        return {
            isLoading: false
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

    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
