<template>
    <div id="detail">
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-icon mui-icon-left-nav" href='javascript:history.back(-1)'></a> -->
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'Category'}"></router-link>
            <h1 class="mui-title">商品详情</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="swiper-container picslider">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for='pic in picUrls'>
                        <div class="pic"><img v-bind:data-src="pic" class="swiper-lazy"></div>
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <div class="sku-detail-top">
                <div class="sku-intro">
                    <h1 class="sku-name">{{product.productName}}</h1>
                    <p class="sku-custom-info"><em>销量：{{product.productSaleCnt||0}}</em><span v-show='isShowTagPrice'>￥{{product.tagPrice | money}}</span></p>
                </div>
                <div class="sku-price">
                    <div class="price-real">
                        ￥<strong>{{product.defaultPrice | money}}</strong>
                    </div>
                </div>
            </div>
            <div class="review-item" v-show='product.reviewNum >0'>
                <h3>用户评价（{{product.reviewNum}}）</h3>
                <ul>
                    <li v-for='review in product.reviewList'>
                        <div class="hd">
                            <p class="l"><span class="header" v-bind:style="'background-image: url('+review.headPortraitUrl+');'"></span>{{review.reviewerName | loginName}}</p>
                            <em class="r"><span v-bind:class="'review-star review-star-'+review.productMatchScore"><b></b></span></em>
                        </div>
                        <p class="time">{{review.reviewTime | dateformat}}</p>
                        <p class="reviewtext">{{review.reviewContent}}</p>
                    </li>
                    <li class="last">
                        <router-link class="btn" :to="{ name: 'Reviews', params: { productId: product.productId }}">查看全部评价</router-link>
                    </li>
                </ul>
            </div>
            <div class="sku-detail-content">
                <div class="h3">图文详情</div>
                <div class="iconinfo" v-if='!product.productDetailDesc'>
                    <div class="ico ico-info"></div>
                    <strong>暂无图片详情</strong>
                </div>
                <div id="J_DetailContent" v-if="product.productDetailDesc" v-html='product.productDetailDesc'>
                </div>
            </div>
            <div class="fbbwrap-total">
                <div class="ftbtnbar" style="display: none;">
                    <div class="button-wrap button-wrap-expand">
                        <a href="javascript:void(0)" class="button disabled">商品已售罄</a>
                    </div>
                </div>
                <div class="ftbtnbar">
                    <div class="button-l">
                        <a @click='toCartPage' id="J_ShopCart">
                            <i class="iconfont">&#xe7ce</i>
                            <span>购物车</span>
                            <em v-show='cartItemCount>0'>{{cartItemCount}}</em>
                        </a>
                    </div>
                    <div class="button-wrap button-wrap-expand">
                        <a class="button addtocart" :class='product.productStatusCd===1?"":"disabled"' id="J_BtnCart" @click='toCart'>加入购物车</a>
                        <a class="button" :class='product.productStatusCd===1?"":"disabled"' id="J_BtnBuy" @click='toBuy'>立即购买</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹框选择商品，应该写成组件 -->
        <transition name="slide-fade">
            <div v-show="isShowMask" id="J_ASSpec" class="actionsheet-spec" style="display:block;z-index:1000">
                <div class="close" @click="hideMask()"></div>
                <div class="prod-info">
                    <div class="pic"><img v-bind:src="picUrls[0]" alt="" /></div>
                    <div class="name">{{product.productName}}</div>
                    <div class="price"><span class="price-real">￥<em>{{product.defaultPrice | money}}</em></span></div>
                </div>
                <div class="spec-list">
                    <div class="spec-item" v-for='(sku,sIndex) in product.skuKeys'>
                        <h3>{{sku.keyName}}</h3>
                        <div class="prop-list">
                            <ul>
                                <li @click='choseSku(sIndex,vIndex)' v-bind:class="(skuIndexs[sIndex] == vIndex)?'active':''" v-for='(value,vIndex) in sku.skuValues'>{{value.skuValueName}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="spec-item">
                        <h3>数量</h3>
                        <div class="number-widget">
                            <div class="number-minus" v-bind:class='buyNum==1?"disabled":""' @click='buyNum==1?"":buyNum--'></div>
                            <input class="number-text" type="number" v-bind:value='buyNum' readonly="readonly">
                            <div class="number-plus" @click='buyNum++'></div>
                        </div>
                    </div>
                </div>
                <div class="fbbwrap nofixed">
                    <div class="ftbtnbar">
                        <div class="button-wrap button-wrap-expand">
                            <a href="javascript:void(0)" class="button btn-buy" @click='isCart?submitCart():submitBuy()'>确定</a>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
// import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'

import Swiper from '../../../static/mobile/js/swiper.min'
import '../util/cookies'


export default {
    name: 'detail',
    data() {
        return {
            swiper: {},
            product: {
                tagPrice: 0,
                defaultPrice: 0
            },
            picUrls: [],
            isShowMask: false,
            skuIndexs: [0, 0, 0, 0, 0],
            buyNum: 1,
            isCart: false,
            cartItemCount: 0,
            isLoading: true,
            logined: true,
            mask: {},
            isShowTagPrice: false
        }
    },
    methods: {
        toCartPage() {
            if (this.logined) {
                router.push({ name: 'CartItem' })
            } else {
                location.href = '/m/login?successUrl=' + encodeURIComponent(window.location.href);
            }
        },
        resetBuyData() {
            this.buyNum = 1;
            this.skuIndexs = [0, 0, 0, 0, 0]
        },
        countCartItem() {
            this.$http.get('m/account/spaCartitem/count').then(
                res => {
                    if (res) {
                        this.cartItemCount = res.body
                    }
                }, res => {
                    this.logined = res.status !== 401;
                })
        },
        choseSku(_skuIndex, _valueIndex) {
            this.skuIndexs.splice(_skuIndex, 1, _valueIndex);
        },
        toBuy() {
            if (this.product.productStatusCd !== 1) {
                return false;
            }
            this.resetBuyData();
            this.mask.show();
            this.isShowMask = true;
            this.isCart = false;
        },
        toCart() {
            if (this.product.productStatusCd !== 1) {
                return false;
            }
            this.resetBuyData();
            this.mask.show();
            this.isShowMask = true;
            this.isCart = true;
        },
        isLogin() {
            this.$http.get('m/login/isLogin').then(
                res => {
                    console.log(res.body)
                    this.logined = res.body;
                    if (!res.body) {
                        mui.confirm('', '您还未注册，请先注册', ['确定', '取消'], function(e) {
                            if (e.index === 0) {
                                location.href = '/m/login?successUrl=' + encodeURIComponent(window.location.href);
                            }
                        })
                    }
                })
        },
        submitBuy() {
            // alert('确定购买')
            this.isShowMask = false;
            this.hideMask();
            this.isLogin();
            if (!this.logined) return false;
            // this.product.buyNum = this.buyNum;
            // this.$store.commit('submitOrder', this.product);
            // this.$store.commit('selectSku', this.skuIndexs);


            var productId = this.$route.params.productId;

            var skus = [];
            var skukeys = this.product.skuKeys;
            var skuStr;
            if (skukeys) {
                for (var i = 0; i < skukeys.length; i++) {
                    var sku = {
                        "skuValues": skukeys[i].skuValues[this.skuIndexs[i]].id,
                        "id": skukeys[i].id
                    }
                    skus.push(sku);
                }
                if (skus.length > 0) skuStr = JSON.stringify(skus);
            }

            console.log(skuStr)
            // return false;

            this.$http.get('m/products/detail', {
                params: {
                    skuStr: skuStr,
                    productId:productId
                }
            }).then(
                res => {
                    if (res) {
                        setCookie('productId', res.body.productId, 1);
                        setCookie('buyNum', this.buyNum, 1);
                        router.push({
                            name: 'Submit'
                        })
                    }
                })



        },
        submitCart() {
            this.isShowMask = false;
            this.hideMask();
            this.isLogin();
            if (!this.logined) return false;
            var params = {
                productId: this.product.productId,
                buyNum: this.buyNum
            }
            var skus = [];
            var skukeys = this.product.skuKeys;
            if (skukeys) {
                for (var i = 0; i < skukeys.length; i++) {
                    var sku = {
                        "skuValues": skukeys[i].skuValues[this.skuIndexs[i]].id,
                        "id": skukeys[i].id
                    }
                    skus.push(sku);
                }
                if (skus.length > 0) params.skus = JSON.stringify(skus);
            }


            // console.log('购物车')
            this.isLoading = true;
            this.$http.post('m/account/spaCartitem', params).then(
                res => {
                    this.isLoading = false;
                    // console.log(res)
                    if (res.status === 201) {
                        this.cartItemCount = res.body.result;
                        /*购物车动画*/
                        var start = $("#J_BtnCart").offset(),
                            end = $("#J_ShopCart").offset(),
                            winH = $(window).height() - 30,
                            sX = start.left + start.width / 2 - 15,
                            sY = winH + start.height / 2 - 15,
                            eX = end.left + end.width / 2 - 15,
                            eY = end.top + end.height / 2 - 15;
                        var throwItem = $('<div class="throwInItem"></div>').css({
                            top: sY,
                            left: sX,
                            "-webkit-transform-origin": ((eX - sX) / 2 + 15) + "px 0"
                        }).appendTo(document.body);
                        throwItem.animate({
                            rotate: "-200deg"
                        }, {
                            duration: 800,
                            easing: "ease-out",
                            complete: function() {
                                throwItem.remove();
                                mui.toast('已添加到购物车', true);
                            }
                        });
                    }
                },
                res => {
                    this.isLoading = false;
                    if (res.status !== 500) {
                        mui.alert(res.body.error)
                    } else {
                        mui.alert('系统出错，请稍候再试')
                    }
                })
        },
        hideMask() {
            this.mask.close();
        },

    },
    computed: {

    },
    filters: {
        loginName(name) {
            return name.substring(0, 1) + "***" + name.substring(name.length - 1);
        }
    },
    mounted() {
        this.swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationType: 'fraction',
            loop: true,
            preloadImages: false,
            lazyLoading: true,
        });

        this.$http.get('m/products/' + this.$route.params.productId).then(
            res => {
                if (res) {
                    // console.log(res.body)
                    this.product = res.body;
                    //格式化小数，特么过滤器竟然用不了
                    this.isShowTagPrice = this.product.isShowTagPrice || false;
                    if (res.body.picUrls) {
                        this.picUrls = res.body.picUrls.split(";;");
                        //加载结束后初始化图片插件
                        this.$nextTick(function() {
                            this.swiper.init()
                            this.isLoading = false;
                        });
                    }
                }
            })

        this.countCartItem();
        var em = this;
        this.mask = mui.createMask(function() {
            em.isShowMask = false
        });
    },
    created() {
        this.$store.commit('emptyProductToSubmit');
        var loadjs = require('loadjs');

        loadjs([
            '../../../static/mobile/js/zepto.js'
        ]);
    },
    beforeDestroy() {
        this.mask.close();
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">
/* 可以设置不同的进入和离开动画 */


/* 设置持续时间和动画函数 */

.slide-fade-enter-active {
    transition: all .5s ease;
}

.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(300px);
    opacity: 1;
}

.actionsheet-spec {
    top: auto;
    bottom: 0;
}

.number-widget .number-plus {
    right: 0;
    color: #444;
}

.number-widget .number-minus {
    left: 0;
    color: #444;
}

.number-widget .number-minus.disabled {
    color: #dddddd;
}

</style>
