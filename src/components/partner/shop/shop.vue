<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerCenter'}"></router-link>
            <h1 class="mui-title">我的店铺</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="storetopbar">
                <p class="info">店铺数量：{{stores.length}}</p>
            </div>
            <div class="iconinfo" v-show='!isLoading && stores.length==0'>
                <i class="ico ico-info"></i>
                <strong>你还没有店铺，要努力哦！</strong>
            </div>
            <div class="wrap" v-show='!isLoading && stores.length>0'>
                <div class="partner-list">
                    <ul>
                        <!---->
                        <li v-for='s in stores'>
                            <div class="t"><span>{{s.totalAmt || '0'}}</span>
                                <p>{{s.storeName}}</p>
                            </div>
                            <div class="b"><span>本月营业额</span>
                                <p>申请时间:{{s.createTime | dateformat}}</p>
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
            stores: []
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
        this.$http.get('m/partner/stores').then(res => {
            this.stores = res.body;
            this.isLoading = false;
        }, res => {
            if (res.status === 401) {
                router.push({ name: 'Login' })
            } else {
                if (res.status !== 406) {
                    this.isLoading = false;
                    mui.alert('网络出错，请稍候再试');
                }
            }
        })
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
