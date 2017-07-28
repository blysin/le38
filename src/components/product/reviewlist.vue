<template>
    <div id="reviewlist
">
        <div id="page">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-icon mui-icon-left-nav" href="javascript:history.back(-1)"></a>
                <h1 class="mui-title">商品评价</h1>
                <a class="mui-icon"></a>
            </header>
            <div class="mui-content">
                <div class="borderbox">
                    <div class="reviewtop">
                        <ul class="procomment">
                            <li>
                                <div class="fl"><span v-bind:class="'review-starbig review-starbig-'+Math.ceil(reviewList[0].avgScore)"><b></b></span><i>{{reviewList[0].avgScore?reviewList[0].avgScore.toFixed(1):'5'}}</i></div>
                                <div class="fr">{{total}}人评价</div>
                            </li>
                        </ul>
                        <ul class="return-type">
                            <li v-bind:class="level==-1?'selected':''" @click='change(-1)'>全部</li>
                            <li v-bind:class="level==1?'selected':''" @click='change(1)'>好评</li>
                            <li v-bind:class="level==2?'selected':''" @click='change(2)'>中评</li>
                            <li v-bind:class="level==3?'selected':''" @click='change(3)'>差评</li>
                        </ul>
                    </div>
                </div>
                <div class="wrap">
                    <div class="review-item">
                        <ul>
                            <li v-for='review in reviewList'>
                                <div class="hd">
                                    <p class="l"><span class="header" v-bind:style="'background-image: url('+review.headPortraitUrl+');'"></span>{{review.reviewerName | loginName}}</p>
                                    <em class="r"><span v-bind:class="'review-star review-star-'+review.productMatchScore"><b></b></span></em>
                                </div>
                                <p class="time">{{review.reviewTime | dateformat}}</p>
                                <p class="reviewtext">{{review.reviewContent}}</p>
                            </li>
                        </ul>
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
import { dropload } from 'dropload'

export default {
    name: 'reviewlist',
    data() {
        return {
            page: -1,
            size: 6,
            level: -1,
            reviewList: [],
            total: 0
        }
    },
    methods: {
        change(_level) {
            this.level = _level;
            this.page = -1;
            this.reviewList = [];
            $('.dropload-down').remove();
            this.$nextTick(function() {
                this.jsonData()
            });
        },
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
                    vm.$http.get('m/review/' + vm.$route.params.productId + '?page=' + vm.page + '&size=' + vm.size + '&level=' + vm.level).then(
                        res => {
                            if (res) {
                                // console.log(res)
                                var length = res.body.data.length;
                                if (length > 0) {
                                    vm.reviewList = vm.reviewList.concat(res.body.data);
                                    if(vm.total == 0)vm.total = res.body.total;
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
        loginName(name) {
            return name.substring(0, 1) + "***" + name.substring(name.length - 1);
        },
    },
    mounted: function() {
        this.jsonData();
        console.log(Math.ceil(2.22))
    },
    created: function() {

    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
