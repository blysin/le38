<template>
    <div id="detail">
        <div id="page">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-icon mui-icon-left-nav" href='javascript:history.back(-1)'></a>
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
                        <p class="sku-custom-info"><em>已售{{product.productSaleCnt}}</em><span>￥{{product.tagPrice}}</span></p>
                    </div>
                    <div class="sku-price">
                        <div class="price-real">
                            ￥<strong>{{product.defaultPrice}}</strong>
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
                            <a href="shop_cart.html" id="J_ShopCart">
                        <i class="iconfont">&#xe7ce</i>
                        <span>购物车</span>
                        <em>10</em>
                    </a>
                        </div>
                        <div class="button-wrap button-wrap-expand">
                            <a class="button addtocart" id="J_BtnCart">加入购物车</a>
                            <a class="button" id="J_BtnBuy">立即购买</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="J_ASSpec" class="actionsheet-spec">
                <div class="close"></div>
                <div class="prod-info">
                    <div class="pic"><img src="images/goodspic.jpg" alt="" /></div>
                    <div class="name">产品名称产品名称产品名称产品产品名称产品名称产品名称产品产品名称产品名称产品名称产品</div>
                    <div class="price"><span class="price-real">￥<em>399.00</em></span></div>
                </div>
                <div class="spec-list">
                    <div class="spec-item">
                        <h3>容量</h3>
                        <div class="prop-list">
                            <ul>
                                <li class="active">30ML</li>
                                <li class="">50ML</li>
                                <li class="disabled">70ML</li>
                                <li class="disabled">100ML</li>
                            </ul>
                        </div>
                    </div>
                    <div class="spec-item">
                        <h3>数量</h3>
                        <div class="number-widget">
                            <div class="number-minus disabled"></div>
                            <input class="number-text" type="number" value="1" readonly="readonly">
                            <div class="number-plus disabled"></div>
                        </div>
                    </div>
                </div>
                <div class="fbbwrap nofixed">
                    <div class="ftbtnbar">
                        <div class="button-wrap button-wrap-expand">
                            <a href="javascript:void(0)" class="button btn-buy">确定</a>
                        </div>
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
import Swiper from '../../../static/mobile/js/swiper.min'

// var swiper;
export default {
    name: 'detail',
    data() {
        return {
            swiper: {},
            product: {},
            picUrls: []
        }
    },
    methods: {

    },
    computed: {

    },
    filters: {
        loginName(name) {
            return name.substring(0, 1) + "***" + name.substring(name.length - 1);
        }
    },
    mounted: function() {
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
                    console.log(res.body)
                    this.product = res.body;
                    //格式化小数，特么过滤器竟然用不了
                    this.product.defaultPrice = this.product.defaultPrice.toFixed(2);
                    this.product.tagPrice = this.product.tagPrice.toFixed(2);
                    if (res.body.picUrls) {
                        this.picUrls = res.body.picUrls.split(";;");
                        //加载结束后初始化图片插件
                        this.$nextTick(function() {
                            this.swiper.init()
                        });
                    }
                }
            })
    },
    created: function() {

    },
    components: {

    }
}

$(function() {

})

</script>
<style type="text/css" scoped="" lang="scss">


</style>
