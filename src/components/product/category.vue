<template>
    <div id="category">
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav" href="javascript:history.back(-1)"></a>
            <h1 class="mui-title partner">商品分类</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="shelves-search">
                <div class="category-search">
                    <input type="text" placeholder="搜索您想要的商品" v-model='keywords' @change="search()">
                    <button @click='search()'>搜索</button>
                </div>
            </div>
            <div class="listWrap">
                <div class="categorynav">
                    <div class="mui-scroll-wrapper">
                        <div class="mui-scroll">
                            <div class="nav">
                                <ul>
                                    <li :class="index==currentIndex?'active':''" v-for='(cat,index) in categorys'><a href="javascript:void(0)" @click="changeId(cat.categoryId,index)">{{cat.categoryName}}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="procucts">
                    <div class="mui-scroll-wrapper">
                        <div class="mui-scroll">
                            <div class="procucts-list">
                                <ul>
                                    <li v-for='pro in productList'>
                                        <a href="javascript:void(0)" @click='toDetail(pro.productId)'>
                                            <div class="pic"><img v-bind:src="pro.defaultPicUrl" alt="" /></div>
                                            <div class="intro">
                                                <p class="name">{{pro.productName}}</p>
                                                <div class="price">
                                                    <p class="price-real">¥<em>{{pro.defaultPrice | money}}</em></p>
                                                    <p class="price-origin" v-show='pro.isShowTagPrice'>¥<em>{{pro.tagPrice}}</em></p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="globalMenu">
                <div class="gbt-wrap">
                    <ul>
                        <li>
                            <a href="/m">
                                <span class="gbt-ico ico-home"></span>
                                <span class="gbt-text">首页</span>
                            </a>
                        </li>
                        <li class="current">
                            <a href="javascript:void(0);">
                                <span class="gbt-ico ico-classify"></span>
                                <span class="gbt-text">分类</span>
                            </a>
                        </li>
                        <li>
                            <a href="/m/message">
                                <span class="gbt-ico ico-message"><!-- <em></em> --></span>
                                <span class="gbt-text">消息</span>
                            </a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' @click='toCartItem'>
                                <span class="gbt-ico ico-cart"></span>
                                <span class="gbt-text">购物车</span>
                            </a>
                        </li>
                        <li>
                            <a href="/m/account">
                                <span class="gbt-ico ico-center"></span>
                                <span class="gbt-text">我的</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'n-zepto'
// import mui from 'mui'
import router from '@/router'
import { dropload } from 'dropload'

export default {
    name: 'category',
    props: [],
    data() {
        return {
            categorys: [],
            keywords: '',
            isLoading: true,
            currentId: 0,
            currentIndex: 0,
            productList: [],
            page: -1,
            size: 6,
            mask: {}
        }
    },
    watch: {
        currentId(nVal, oVal) {
            // console.log(nVal + "   " + oVal)
            this.initProductList();
            this.jsonData();

        }
    },
    methods: {
        toCartItem() {
            this.$http.get('m/login/isLogin').then(
                res => {
                    // console.log(res.body)
                    this.logined = res.body;
                    if (!res.body) {
                        location.href = '/m/login?successUrl=' + encodeURIComponent(window.location.href);
                    } else {
                        router.push({ name: 'CartItem' })
                    }
                })

        },
        initProductList() {
            this.page = -1;
            this.productList = [];
            $('.procucts .mui-scroll').css("transform", "translate3d(0px, 0px, 0px)")
        },
        changeId(id, index) {
            this.currentId = id;
            this.currentIndex = index;
        },
        totalList() {
            var target = event.target;
            var obj = $(target).closest(".acitem");
            if (obj.hasClass("ac-toggled")) {
                $(".acitem").addClass("ac-toggled");
                obj.removeClass("ac-toggled");
            } else {
                obj.addClass("ac-toggled");
            }
        },
        toList(categoryId) {
            router.push({
                name: 'Products',
                query: {
                    categoryId: categoryId,
                    keywords: ''
                }
            });
        },
        search() {
            router.push({
                path: 'products',
                query: {
                    categoryId: -1,
                    keywords: this.keywords,
                    brandId: -1
                }
            });
        },
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
                    domNoData: '<div class="dropload-noData">无更多数据</div>'
                },
                loadDownFn: function(me) {
                    vm.page++;
                    vm.$http.get('m/products/list/' + vm.currentId + '?page=' + vm.page + '&size=' + vm.size).then(
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
                                }, 10);
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
        this.mask = mui.createMask();
    },
    created: function() {
        //判断dropload插件是否生效，如果失效了则刷新页面重新加载
        $('#page').hide()
        if (!$('.wrap').dropload) {
            location.reload();
        } else {
            $('#page').show()
        }

        var loadjs = require('loadjs');
        var em = this;
        // loadjs([
        //     '../../../static/mobile/js/mui.min.js'
        // ]);

        setTimeout(function() {
            mui.init();
            mui.ready(function() {
                mui('.categorynav .mui-scroll-wrapper').scroll({
                    indicators: false //滚动条
                });
                mui('.procucts .mui-scroll-wrapper').scroll({
                    bounce: false //回弹
                });
            })

        }, 200);

        em.$http.get('m/products/categorys').then(
                res => {
                    // console.log(res.body)
                    if (res) {
                        em.categorys = res.body;
                        em.isLoading = false;
                        if (res.body.length > 0) {
                            em.currentId = res.body[0].categoryId
                        }
                    }
                })
    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
