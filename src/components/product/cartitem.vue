<template>
    <div id="cartItem">
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'Category'}"></router-link>
            <h1 class="mui-title">购物车</h1>
            <a class="mui-icon" id="J_EditBtn"><span @click='isEditing = !isEditing'>{{isEditing?'完成':'编辑'}}</span></a>
        </header>
        <div class="mui-content">
            <div class="iconinfo" v-show="!isLoading && itemList.length == 0">
                <i class="ico ico-shopcart"></i>
                <strong>购物车还空着</strong>
                <p>去选几件中意的商品吧</p>
                <div class="btnbar">
                    <router-link :to="{name:'Category'}" class="mui-btn mui-btn-block mui-btn-primary">去购物</router-link>
                </div>
            </div>
            <div class="cart-list">
                <ul>
                    <li v-for='(item,index) in itemList'>
                        <label>
                            <input type="checkbox" @click='selectItem(index)' v-model='item.selectedFlag'>
                        </label>
                        <div class="pic">
                            <router-link :to="{name:'Detail',params:{productId:item.masterProductId}}"><img :src="item.productPicUrl" alt=""></router-link>
                        </div>
                        <div class="intro">
                            <h3 class="name">{{item.productName}}</h3>
                            <p class="specifications" v-for='sku in item.skuKeys'>{{sku.keyName}}：{{sku.skuValues[0].skuValueName}}</p>
                            <div class="price">
                                <div class="number-widget">
                                    <div class="number-minus" :class='item.quantity<=1?"disabled":""' @click='decNum(index)'></div>
                                    <input class="number-text" type="number" v-model="item.quantity" @change='changeNum(index)'>
                                    <div class="number-plus" @click='incNum(index)'></div>
                                </div>
                                <div class="price-real">￥<span>{{item.currentPrice | money}}</span></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="fbbwrap-total">
                <div class="ftbtnbar">
                    <div class="content-wrap">
                        <div class="content-wrap-in">
                            <div class="l">
                                <label for="cb1">
                                    <input id="cb1" type="checkbox" v-model='isAllSelect' @click='selectAllItem' /> 全选
                                </label>
                            </div>
                            <div class="r">
                                <div class="main-info" v-show='!isEditing'>合计：<span>￥<em>{{totalAmt | money}}</em></span></div>
                            </div>
                        </div>
                    </div>
                    <div class="button-wrap cash-buttons">
                        <a id="J_ButtonCash" class="button" :class='selectNum >0?"":"button-wrap-disabled"' href="javascript:void(0)" @click='submit()' v-show='!isEditing'>立即结算</a>
                        <a id="J_ButtonDel" class="button" :class='selectNum >0?"":"button-wrap-disabled"' @click='deleteAll()' href="javascript:void(0)" v-show='isEditing'>删除</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
    </div>
</template>
<script>
import $ from 'n-zepto'
// import mui from 'mui'
import router from '@/router'


export default {
    name: 'cartItem',
    data() {
        return {
            itemList: [],
            isEditing: false,
            isChange: true,
            isAllSelect: false,
            isLoading: true
        }
    },
    computed: {
        selectNum() {
            var i = 0;
            for (var j = 0, len = this.itemList.length; j < len; j++) {
                if (this.itemList[j].selectedFlag) {
                    i++;
                }
            }
            return i;
        },
        totalAmt() {
            var i = 0;
            for (var j = 0, len = this.itemList.length; j < len; j++) {
                var item = this.itemList[j];
                if (item.selectedFlag) {
                    i += item.quantity * item.currentPrice;
                }
            }
            return i;
        }
    },
    methods: {
        changeNum(index){
            // console.log(this.itemList[index].quantity)
            if(!/^[1-9]+\d*$/.test(this.itemList[index].quantity)){
                mui.toast('数字不合法！');
                this.initData();
            }else{
                var item = this.itemList[index];
                this.updateItem(index,item.cartItemId,true,item.quantity);//直接设置选中
            }
        },
        submit() {
            if (this.selectNum > 0) {
                this.$store.commit('setParams',{cartItemCount:this.selectNum});
                router.push({
                    name: 'SubmitCart'
                })
            }
        },
        deleteAll() {
            if (this.selectNum > 0) {
                var em = this;
                mui.confirm('', '确认要删除所选商品吗？', ['确定', '取消'], function(e) {
                    if (e.index == 0) {
                        em.isLoading = true;
                        em.$http.delete('m/account/spaCartitem/all').then(res => {
                            mui.toast('已删除所选商品');
                            em.initData();
                        }, res => {
                            em.isLoading = false;
                            mui.toast('系统出错，请稍候再试')
                        })
                    }

                })
            }

        },
        updateItem(index, id, selectedFlag, quantity) {
            this.isLoading = true;
            var params = {
                cartItemId: id,
                selectedFlag: selectedFlag,
                quantity: quantity
            }
            this.$http.patch('m/account/spaCartitem', JSON.stringify(params)).then(res => {
                this.isLoading = false;
                this.itemList[index].selectedFlag = res.body.result.selectedFlag;
                this.itemList[index].quantity = res.body.result.quantity;

                if (this.selectNum == this.itemList.length) {
                    this.isAllSelect = true;
                } else {
                    this.isAllSelect = false;
                }
            }, res => {
                console.log(res)
                this.isLoading = false;
                if (res.body.error) mui.alert(res.body.error)
            })
        },
        decNum(index) {
            var q = this.itemList[index].quantity;
            if (q > 1) {
                var item = this.itemList[index];
                this.updateItem(index, item.cartItemId, item.selectedFlag, item.quantity - 1);
            }
        },
        incNum(index) {
            // this.itemList[index].quantity += 1;
            var item = this.itemList[index];
            this.updateItem(index, item.cartItemId, item.selectedFlag, item.quantity + 1);
        },
        selectItem(index) { //由于页面复选框有严重的bug，所以只能用setTimeout来延迟触发
            if (this.isChange) {
                this.isChange = false;

                var em = this;
                setTimeout(function() {
                    //没用同步，有bug隐患
                    var item = em.itemList[index];
                    var falg = item.selectedFlag;
                    em.updateItem(index, item.cartItemId, item.selectedFlag);
                    em.isChange = true;
                }, 100);
            }
        },
        selectAllItem() {
            if (this.isChange && this.itemList.length > 0) {
                this.isChange = false;
                this.isLoading = true;
                var em = this;
                setTimeout(function() { //由于页面复选框有严重的bug，所以只能用setTimeout来延迟触发
                    var a = 0;
                    for (var i = 0; i < em.itemList.length; i++) {
                        // console.log(em.itemList[i].selectedFlag)
                        if (em.itemList[i].selectedFlag) {
                            a++;
                        }
                    }
                    var isAll = a !== em.itemList.length; //只有所有item都没选中，才能取消全选
                    var params = {
                        selectAllFlag: isAll
                    }
                    em.$http.patch('m/account/spaCartitem/all', JSON.stringify(params)).then(res => {
                        em.isAllSelect = isAll;
                        for (var i = 0; i < em.itemList.length; i++) {
                            em.itemList[i].selectedFlag = isAll;
                        }
                        em.isChange = true;
                        em.isLoading = false;
                    }, res => {
                        em.isChange = true;
                        em.isLoading = false;
                        if (res.status !== 500) {
                            mui.alert(res.body.error)
                        } else {
                            mui.alert('系统出错，请稍候再试')
                        }
                    })
                }, 100);
            }
        },
        initData() {
            this.$http.get('m/account/spaCartitem').then(res => {
                var a = 0;
                for (var i = 0; i < res.body.length; i++) {
                    if (res.body[i].selectedFlag) {
                        a++;
                    }
                }
                this.isAllSelect = a === res.body.length;

                this.itemList = res.body;
                this.isLoading = false;
                if (res.body.length == 0) {
                    this.isAllSelect = false;
                }
            }, res => {
                if (res.status === 401) {
                    mui.alert('请先登录', function() {
                        location.href = '/m/login?successUrl=' + encodeURIComponent(window.location.href);
                    })
                }
            })
        }

    },
    filters: {

    },
    mounted: function() {
        this.initData();
    },
    created: function() {
        // location.reload();
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">

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
