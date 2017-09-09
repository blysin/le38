<template>
    <div id="submit">
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <div id='mask' style='display: none;' class='mask' @click='hideMask'></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'Detail',params:{productId:product.productId}}"></router-link>
            <h1 class="mui-title">提交订单</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="addressWrap">
                <div class="deliverymode">配送方式</div>
                <div class="deliveryChoice">
                    <ul>
                        <li v-bind:class="isExpress?'selected':''" @click='isExpress = true'>快递领取</li>
                        <li v-bind:class="isExpress?'':'selected'" @click='isExpress = false'>到店领取</li>
                    </ul>
                </div>
                <div class="submitaddressWrap" v-show='isExpress'>
                    <div class="order-address submit-order-add" v-show='address.addrId'>
                        <a href="javascript:void(0)" @click='selectAddress'>
                                <span class="name">{{address.receiverName}}</span>
                                <span class="phone">{{address.receiverTel}}</span>
                                <address>{{address.cityName +' '+address.countyName+' '+address.provinceName+' '+address.receiverAddr}}</address>
                            </a>
                    </div>
                    <a class="no-address" href="javascript:void(0)" v-show='!address.addrId' @click='addAddress'><i></i>暂无收货地址，请添加</a>
                </div>
                <div class="submitaddressWrap" v-show='!isExpress'>
                    <p class="orderSince">您将获得一个提货码，到店提货时，需向店员出示提货码进行提货。</p>
                </div>
            </div>
            <div class="orderList">
                <ul>
                    <li>
                        <div class="t">
                            <p>订单商品</p>
                        </div>
                        <div class="itemsWrap">
                            <div class="items">
                                <div class="img" v-bind:style="'background-image: url('+picUrl+');'"></div>
                                <div class="info">
                                    <h3>{{product.productName}}</h3>
                                    <p class="specifications" v-for='(sku,sIndex) in product.skuKeys'>{{sku.keyName}}：{{sku.skuValues[skuIndexs[sIndex]].skuValueName}}</p>
                                    <p class="price"><span>x{{product.buyNum}}</span><em>￥{{product.defaultPrice | money}}</em></p>
                                </div>
                            </div>
                        </div>
                        <p class="ft">共{{product.buyNum}}件商品，合计：<span class="public-color">￥{{totalAmt | money}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="expresstext" v-show='isExpress'><span>中通（{{address.expressFee || 0  | money}}元）</span>
                <p>快递公司（邮费）</p>
            </div>
            <div class="restform">
                <ul>
                    <li>
                        <div class="hd">买家留言:</div>
                        <div class="bd">
                            <div class="info">
                                <div class="input-wrap">
                                    <input v-model='remark' type="text" placeholder="选填：对本次交易的说明">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="fbbwrap">
                <div class="ftbtnbar">
                    <div class="content-wrap">
                        <div class="content-wrap-in content-cartwrap-in">
                            <div class="r">合计：<span class="public-color">¥{{totalAmtWithExpress | money}}</span></div>
                        </div>
                    </div>
                    <div class="button-wrap">
                        <a href="javascript:void(0)" class="button" :class="((!isExpress || address.addrId) && product.productStatusCd === 1 && (!isExpress || product.buyNum <= product.stockNum))?'':'disabled'" @click='toPay($event)'>结算</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹框选择商品，应该写成组件 -->
        <transition name="slide-fade">
            <div id="methodpayment1" v-show='isShowMask' class="actionsheet-spec" style="display:block">
                <div class="close" @click='hideMask'></div>
                <div class="prod-info">
                    <div class="tit">付款详情</div>
                </div>
                <ul class="tbviewlist">
                    <li @click='payment'>
                        <a href="javascript:void(0)" class="itemlink">
                            <div class="r public-color">￥{{totalAmtWithExpress | money}}</div>
                            <div class="c">微信支付</div>
                        </a>
                    </li>
                </ul>
                <div class="fbbwrap nofixed">
                    <div class="ftbtnbar">
                        <div class="button-wrap button-wrap-expand">
                            <a href="javascript:void(0)" class="button btn-buy" @click='hideMask'>取消</a>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'


export default {
    name: 'submit',
    data() {
        return {
            isExpress: true,
            address: {},
            remark: '',
            isShowMask: false,
            isLoading: true
        }
    },
    methods: {
        addAddress() {
            router.push({
                name: 'EditAddress'
            })
        },
        selectAddress() {
            router.push({
                name: 'Address'
            })
        },
        hideMask() {
            $("div[class='xucun_content']").hide();
            $('#mask').hide()
            this.isShowMask = false;
            $(document).unbind("touchmove");
        },
        coverDiv() {
            var procbg = $('#mask')[0] //首先创建一个div
            procbg.style.background = "#000000";
            procbg.style.width = "100%";
            procbg.style.height = "100%";
            procbg.style.position = "fixed";
            procbg.style.top = "0";
            procbg.style.left = "0";
            procbg.style.zIndex = "500";
            procbg.style.opacity = "0.8";
            procbg.style.filter = "Alpha(opacity=70)";
            $('#mask').show();


            // $(document).bind("touchmove", function(e) {
            //     e.preventDefault();
            // });
        },
        toPay($event) {
            if (this.isExpress) {
                if (this.product.buyNum > this.product.stockNum) {
                    mui.alert('该商品库存不足，只能到店领取');
                    return false;
                }
            }
            if ($($event.currentTarget).hasClass('disabled')) {
                // mui.toast('不能支付')
            } else {
                // mui.toast('可以支付')
                this.isShowMask = true;
                this.coverDiv();
            }

        },
        payment() {
            this.hideMask();
            this.isLoading = true;
            var params = {
                buyNum: this.product.buyNum,
                productId: this.product.productId,
                remark: this.remark
            }
            if (this.isExpress) {
                params.addrId = this.address.addrId
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

            // console.log(JSON.stringify(params))

            this.$http.post('m/account/orderheader/spaToPay', params).then(res => {
                // console.log(res)
                this.isLoading = false;
                if (res.status === 201) {
                    var appId = res.body.result.appId;
                    var getWxOpenIdUrl = res.body.result.getWxOpenIdUrl;
                    var state = res.body.result.orderNumber;
                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + getWxOpenIdUrl + "&response_type=code&scope=snsapi_base&state=" + state + "#wechat_redirect"

                }
            }, res => {
                this.isLoading = false;

                if (res.status !== 500) {
                    mui.alert(res.body.error)
                } else {
                    mui.alert('系统出错，请稍候再试')
                }
            })
        }
    },
    filters: {

    },
    computed: {
        product() {
            return this.$store.state.productToSubmit;
        },
        skuIndexs() {
            return this.$store.state.skuToSubmit;
        },
        picUrl() {
            var picUrls = this.product.picUrls ? this.product.picUrls.split(";;") : '';
            return picUrls[0];
        },
        totalAmt() {
            return this.product.buyNum * this.product.defaultPrice
        },
        totalAmtWithExpress() {
            if (this.isExpress && this.address.expressFee) {
                // return this.address.expressFee ? this.totalAmt : this.totalAmt + this.address.expressFee
                return this.totalAmt + this.address.expressFee
            } else {
                return this.totalAmt
            }
        }
    },
    mounted: function() {

    },
    created: function() {
        this.$http.get('m/account/userAddress/spa/getAddress', {
            params: {
                addrId: this.$route.query.addrId
            }
        }).then(
            res => {
                if (res) {
                    console.log(res)
                    if (res.body) this.address = res.body;

                }
                this.isLoading = false;
            },
            res => {
                if (res) {
                    if (res.status == 401) {
                        location.href = '/m/login?successUrl=' + encodeURIComponent(window.location.href);
                    }
                }
                this.isLoading = false;
            })
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

</style>
</style>
