<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerWithdraw'}"></router-link>
            <h1 class="mui-title">历史提现记录</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="wallettop mb10">
                <p><em>累积提现 (元)</em></p>
                <h3>{{totalAmt | money}}</h3>
            </div>
            <div class="wrap">
                <div class="recordList">
                    <ul>
                        <li v-for='w in list'>
                            <div class="r">-{{w.withdrawalAmt}}</div>
                            <div class="l">{{w.withdrawalTypeCd==2?'银行提现':'微信提现'}}</div>
                            <p>{{w.applyTime | dateformat}}</p>
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
    name: 'WithdrawHistory',
    data() {
        return {
            isLoading: false,
            totalAmt: 0,
            list: [{
                applyTime: 0,
                withdrawalAmt: 0,
                withdrawalDetailId: 0,
                withdrawalTypeCd: 0
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
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadDownFn: function(me) {
                    vm.page++;
                    vm.$http.get('m/partner/withdraw?pageIndex=' + vm.page + '&limit=' + vm.size).then(
                        res => {
                            if (res) {
                                console.log(res)
                                var length = res.body.length;
                                if (length > 0) {
                                    vm.list = vm.list.concat(res.body);
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
        this.$http.get('m/partner/withdrawTotal').then(res => {
            if (res.body) {
                this.totalAmt = res.body;
            }
        });
        this.list.splice(0, 1);
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
