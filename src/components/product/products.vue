<template>
    <div id="products">
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav" href="javascript:history.back(-1)"></a>
            <h1 class="mui-title">搜索结果</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="wrap">
                <div class="prd-list-grid">
                    <ul>
                        <li v-for='pro in productList'>
                            <a href="javascript:void(0)" @click='toDetail(pro.productId)'>
                                <div class="pic"><img v-bind:src="pro.defaultPicUrl" alt="" /></div>
                                <div class="intro">
                                    <p class="name">{{pro.productName}}</p>
                                    <!-- <p class="specification">50ML</p> -->
                                    <div class="price">
                                        <p class="price-real">¥<em>{{pro.defaultPrice}}</em></p>
                                        <p class="price-origin">¥<em>{{pro.tagPrice}}</em></p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mui from 'mui'
import router from '@/router'
import { dropload } from 'dropload'
import $ from 'n-zepto'

export default {
    name: 'products',
    // props:['categoryId','keywords'],
    data() {
        return {
            productList: [],
            page: -1,
            size: 6,
            isLoading:true
        }
    },
    methods: {
        toDetail(id) {
            // console.log(id);
            router.push({
                name: 'Detail',
                params: {
                    productId: id
                }
            });
        },
        jsonData() {
            this.isLoading = true
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
                    vm.$http.get('m/products/list/' + vm.$route.query.categoryId + '?page=' + vm.page + '&size=' + vm.size + "&keyWords=" + vm.$route.query.keywords).then(
                        res => {
                            if (res) {
                                // console.log(res)
                                var length = res.body.length;
                                if (length > 0) {
                                    vm.productList = vm.productList.concat(res.body);
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
                                vm.isLoading = false;
                            }
                        })

                }
            });
        }

    },
    filters: {

    },
    mounted: function() {
        // console.log(this.$route.query.categoryId)
        this.jsonData();
    },
    created: function() {

    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
