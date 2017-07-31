<template>
    <div id="submit">
        <div id="page">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-icon mui-icon-left-nav" href="javascript:history.back(-1)"></a>
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
                                        <p class="price"><span>x{{product.buyNum}}</span><em>￥{{product.defaultPrice}}</em></p>
                                    </div>
                                </div>
                                <!-- <div class="items">
                                    <div class="img" style="background-image: url(../images/pic.jpg);"></div>
                                    <div class="info">
                                        <h3>耐克正品 2013新款FREE 5.0赤足系列男子跑步鞋 536840-003 YK</h3>
                                        <p class="specifications">50ML</p>
                                        <p class="price"><span>x1</span><em>￥1290.00</em></p>
                                    </div>
                                </div> -->
                            </div>
                            <p class="ft">共{{product.buyNum}}件商品，合计：<span class="public-color">￥{{totalAmt | money}}</span></p>
                        </li>
                    </ul>
                </div>
                <div class="expresstext" v-show='isExpress'><span>中通（{{address.expressFee || 0}}元）</span>
                    <p>快递公司（邮费）</p>
                </div>
                <div class="restform">
                    <ul>
                        <li>
                            <div class="hd">买家留言:</div>
                            <div class="bd">
                                <div class="info">
                                    <div class="input-wrap">
                                        <input type="text" placeholder="选填：对本次交易的说明">
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
                            <a href="javascript:void(0)" class="button" id="paymentBtn">结算</a>
                        </div>
                    </div>
                </div>
            </div>
            <!--付款-->
            <div id="methodpayment" class="actionsheet-spec">
                <div class="close"></div>
                <div class="prod-info">
                    <div class="tit">付款详情</div>
                </div>
                <ul class="tbviewlist">
                    <li>
                        <a href="javascript:void(0)" class="itemlink">
                            <div class="r public-color">￥{{totalAmtWithExpress | money}}</div>
                            <div class="c">微信支付</div>
                        </a>
                    </li>
                </ul>
                <div class="fbbwrap nofixed">
                    <div class="ftbtnbar">
                        <div class="button-wrap button-wrap-expand">
                            <a href="javascript:void(0)" class="button btn-buy">取消</a>
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


export default {
    name: 'submit',
    data() {
        return {
            isExpress: true,
            address: {}
        }
    },
    methods: {
        addAddress() {
            router.push({
                name:'EditAddress'
            })
        },
        selectAddress() {
            router.push({
                name: 'Address'
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
            var picUrls = this.product.picUrls.split(";;")
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
        this.$http.get('m/account/userAddress/spa/getAddress').then(
            res => {
                if (res) {
                    console.log(res)
                    if (res.body) this.address = res.body;
                }
            },
            res => {
                if (res) {
                    if (res.status == 401) {
                        location.href = '/m/login?successUrl=' + encodeURIComponent(window.location.href);
                        console.log(1231)
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
