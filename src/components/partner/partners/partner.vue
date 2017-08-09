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
                <p class="info partner">城市合伙人数量：2</p>
            </div>
            <div class="iconinfo">
                <i class="ico ico-info"></i>
                <strong>你还没有城市合伙人，要努力哦！</strong>
            </div>
            <div class="wrap">
                <div class="partner-list">
                    <ul>
                        <!---->
                    <li>
                        <div class="t"><span>10</span><p>180****1234</p></div>
                        <div class="b"><span>本月营业额</span><p>申请时间:2017-04-24 15:53</p></div>
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
