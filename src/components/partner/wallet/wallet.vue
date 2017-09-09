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
                <h3 class="fz-32 mb10">{{balance | money}}</h3>
                <p class="color-gray fz-12">每个月末结算该月分润</p>
                <router-link :to='{name:"PartnerWithdraw"}' class="btn">提现</router-link>
            </div>
            <div class="wrap">
                <div class="partner-list">
                    <ul>
                        <li v-for='rebate in rebateList'>
                            <h3>{{rebate.rebateTypeCd ==6?'门店':'合伙人'}}编号：{{rebate.sourceNumber}}</h3>
                            <div class="t"><span>{{rebate.rebateAmt | money}}</span>
                                <p>{{rebate.sourceName | phone}}</p>
                            </div>
                            <div class="b"><span>{{rebate.remark}}</span>
                                <p>{{rebate.rebateTypeCd ==6?'开店':'创建'}}时间:{{rebate.sourceCreateTime | dateformat}}</p>
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
import { dropload } from 'dropload'

export default {
    name: 'Wallet',
    data() {
        return {
            isLoading: false,
            balance: '',
            rebateList: [{
                rebateAmt: '',
                rebateTypeCd: '',
                sourceName: '',
                sourceCreateTime: ''
            }],
            page: -1,
            size: 8
        }
    },
    computed: {

    },
    methods: {
        jsonData() {
            var vm = this;
            $('.wrap').dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">无更多数据</div>'
                },
                loadDownFn: function(me) {
                    vm.page++;
                    vm.$http.get('m/partner/rebates?pageIndex=' + vm.page + '&limit=' + vm.size).then(
                        res => {
                            if (res) {
                                console.log(res)
                                var length = res.body.length;
                                if (length > 0) {
                                    vm.rebateList = vm.rebateList.concat(res.body);
                                    if (length < vm.size) { //如果当前结果小于size，表示已经没用多余的数据了
                                        me.lock();
                                        me.noData();
                                    }
                                } else {
                                    me.lock();
                                    me.noData();
                                }
                                setTimeout(function() {
                                    me.resetload();
                                }, 1000);
                            }
                        })

                }
            });
        }
    },
    filters: {

    },
    mounted: function() {
        this.$http.get('m/partner/data').then(res => {
            this.balance = res.body.cityPartnerBalance;
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
        this.rebateList.splice(0, 1);
        this.jsonData();
    },
    created: function() {
        //判断dropload插件是否生效，如果失效了则刷新页面重新加载
        $('#page').hide()
        if (!$('.wrap').dropload) {
            location.reload();
        } else {
            $('#page').show()
        }
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
