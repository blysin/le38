<template>
    <div id="address">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav" href='javascript:history.back(-1)'></a>
            <h1 class="mui-title" @click='setDefaultAddress'>收货地址</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <ul class="addresslist">
                <li v-for="(receiveAddress,index) in  userReceiveAddressManageList">
                    <div class="addr-item" @click="chooseAddr(receiveAddress.addrId)">
                        <input type="hidden" class="addrId" v-bind:value="receiveAddress.addrId" />
                        <span class="name">{{receiveAddress.receiverName}}</span>
                        <span class="phone">{{receiveAddress.receiverTel}}</span>
                        <p>
                            <span>{{receiveAddress.receiverProvinceName}}</span><span>{{receiveAddress.receiverCityName}}</span><span>{{receiveAddress.countyName}}</span>
                        </p>
                        <p>{{receiveAddress.receiverAddr}}</p>
                    </div>
                    <div class="edit-wrap">
                        <!-- <label v-if="receiveAddress.isDefaultAddr==1">
                                <input type="radio" name="rdo_addr" id="pay_1" checked="checked" /> 默认地址
                            </label> -->
                        <label>
                            <input type="radio" name="rdo_addr" :checked="receiveAddress.isDefaultAddr==1?'checked':''" readonly="readonly" @change='setDefaultAddress($event,receiveAddress.addrId)' /> 设为默认
                        </label>
                        <!-- <label><input name="rdo_addr" type="radio" value="" @change='setDefaultAddress' />设为默认</label> -->
                        <div class="edit-bar">
                            <a href="javascript:void(0)" @click="edit(index)"><i
                                class="ico ico-edit"></i>编辑</a>
                            <a href="javascript:void(0)" @click="deleteAddr(receiveAddress.addrId,index)"><i
                                class="ico ico-delete"></i>删除</a>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="fbbwrap">
                <div class="ftbtnbar">
                    <div class="button-wrap button-wrap-expand">
                        <a href="javascript:void(0)" @click='addAddress' class="button">新增收货地址</a>
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
    name: 'address',
    data() {
        return {
            userReceiveAddressManageList: []
        }
    },
    methods: {
        //设置默认
        setDefaultAddress(event, addrId) {
            if ($(event.currentTarget).attr('checked')) {
                return false;
            }
            this.$http.get('m/account/userAddress/setDefaultAddress', {
                params: { 'addrId': addrId }
            })
        },
        //选择地址
        chooseAddr: function(addrId) {
            var name = this.successUrl || "Submit";

            router.push({
                name: name,
                query: {
                    'addrId': addrId
                }
            })
        },
        //删除
        deleteAddr: function(addrId, _index) {
            var vm = this;
            var btnArray = ['否', '是'];
            var subFlag = false;
            mui.confirm('', '删除该地址？', btnArray, function(e) {
                if (e.index == 1) {
                    if (subFlag) return false;
                    subFlag = true;
                    vm.$http.post('m/account/userAddress/deleteAddress', { addrId: addrId }).then(
                        res => {
                            if (res.body.result && res.body.result == 'success') {
                                mui.toast("删除成功");
                                vm.userReceiveAddressManageList.splice(_index, 1);
                            } else {
                                mui.toast("删除失败，请稍后再试");
                            }
                            subFlag = true;
                        },
                        res => {
                            mui.toast("网络异常，请稍后再试");
                        })
                }
            });
        },
        edit: function(index) {
            this.$store.commit("editAddress", this.userReceiveAddressManageList[index]);
            router.push({
                name: 'EditAddress'
            })
        },
        addAddress() {
            router.push({
                name: 'EditAddress'
            })
        }
    },
    filters: {

    },
    computed: {
        successUrl() {
            return this.$store.state.successUrl;
        }
    },
    mounted: function() {
        this.$http.get('m/account/userAddress/findListByLimit').then(
            res => {
                // console.log(res)
                if (res.body.userReceiveAddressManageList) {
                    this.userReceiveAddressManageList = res.body.userReceiveAddressManageList;
                }
            })
    },
    created: function() {

    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
