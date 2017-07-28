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
                        <div class="swiper-slide">
                            <div class="pic"><img data-src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=10775950,699238504&fm=200&gp=0.jpg" class="swiper-lazy"></div>
                            <div class="swiper-lazy-preloader"></div>
                        </div>
                        <div class="swiper-slide">
                            <div class="pic"><img data-src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=10775950,699238504&fm=200&gp=0.jpg" class="swiper-lazy"></div>
                            <div class="swiper-lazy-preloader"></div>
                        </div>
                        <div class="swiper-slide">
                            <div class="pic"><img data-src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=10775950,699238504&fm=200&gp=0.jpg" class="swiper-lazy"></div>
                            <div class="swiper-lazy-preloader"></div>
                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                </div>
                <div class="sku-detail-top">
                    <div class="sku-intro">
                        <h1 class="sku-name">商品名称商品名称商品名称商品名称商品名称商品名称</h1>
                        <p class="sku-custom-info"><em>已售23686</em><span>￥1396.00</span></p>
                    </div>
                    <div class="sku-price">
                        <div class="price-real">
                            ￥<strong>636.00</strong>
                        </div>
                    </div>
                </div>
                <div class="review-item">
                    <h3>用户评价（80）</h3>
                    <ul>
                        <li>
                            <div class="hd">
                                <p class="l"><span class="header" style="background-image: url(images/userhead.jpg);"></span>m***y</p>
                                <em class="r"><span class="review-star review-star-4"><b></b></span></em>
                            </div>
                            <p class="time">2017-04-12 13:35:25</p>
                            <p class="reviewtext">趁活动买来送亲戚的，包装的很好，买的多但是一瓶也没碎，都是正品。</p>
                        </li>
                        <li>
                            <div class="hd">
                                <p class="l"><span class="header" style="background-image: url(images/userhead.jpg);"></span>m***y</p>
                                <em class="r"><span class="review-star review-star-4"><b></b></span></em>
                            </div>
                            <p class="time">2017-04-12 13:35:25</p>
                            <p class="reviewtext">趁活动买来送亲戚的，包装的很好，买的多但是一瓶也没碎，都是正品。</p>
                        </li>
                        <li class="last"><a class="btn" href="review_list.html">查看全部评价</a></li>
                    </ul>
                </div>
                <div class="sku-detail-content">
                    <div class="h3">图文详情</div>
                    <div class="iconinfo">
                        <div class="ico ico-info"></div>
                        <strong>暂无图片详情</strong>
                    </div>
                    <div id="J_DetailContent">
                        <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=10775950,699238504&fm=200&gp=0.jpg">
                        <img src="http://img04.taobaocdn.com/imgextra/i4/1708919206/TB2bwFaaFXXXXbfXXXXXXXXXXXX_%21%211708919206.jpg">
                        <img src="http://img04.taobaocdn.com/imgextra/i4/1708919206/TB2ZnhcaFXXXXXEXXXXXXXXXXXX_%21%211708919206.jpg">
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


export default {
    name: 'detail',
    data() {
        return {
            swiper:{}
        }
    },
    methods: {

    },
    filters: {

    },
    mounted: function() {
        console.log('detail'+this.$route.params.productId);
        //图片插件
        this.swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationType : 'fraction',
            loop : true,
            preloadImages: false,
            lazyLoading : true,
        });
    },
    created: function() {

    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
