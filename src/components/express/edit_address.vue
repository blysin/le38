<template>
    <div>
        <div id="page" v-cloak="">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-icon mui-icon-left-nav" href="javascript:history.back(-1)"></a>
                <h1 class="mui-title">收货地址</h1>
                <a class="mui-icon"></a>
            </header>
            <div class="mui-content">
                <ul class="tbviewlist">
                    <li class="input-wrap">
                        <div class="hd">收货人</div>
                        <div class="bd">
                            <input type="text" id="receiverName" placeholder="填写收件人姓名" v-model="receiverName" />
                        </div>
                        <span class="delete"></span>
                    </li>
                    <li class="input-wrap">
                        <div class="hd">联系电话</div>
                        <div class="bd">
                            <input id="receiverTel" type="number" v-model="receiverTel" placeholder="填写收件人手机号码" />
                        </div>
                        <span class="delete"></span>
                    </li>
                    <li>
                        <div class="hd">选择地址</div>
                        <div class="bd">
                            <input type="hidden" id="province" name="province" v-model="receiverProvinceId" />
                            <input type="hidden" id="city" name="city" v-model="receiverCityId" />
                            <input type="hidden" id="county" name="county" v-model="receiverCountyId" />
                            <input id="showCityPicker" v-model="combineAddr" type="text" placeholder="省-市-区/县">
                        </div>
                    </li>
                    <li>
                        <div class="hd">详细地址</div>
                        <div class="bd">
                            <textarea id="receiverAddr" placeholder="详细地址（街道/门牌号）" v-model="receiverAddr"></textarea>
                        </div>
                    </li>
                </ul>
                <div class="tbviewlist">
                    <ul>
                        <li>
                            <a href="javascript:void(0);" @click="isDefaultAddr= (isDefaultAddr == 0?1:0)">
                                <div class="r">
                                    <div class="mui-switch mui-switch-mini" v-bind:class="{'mui-active':isDefaultAddr == 1 ? true:false}" id="isDefault">
                                        <div class="mui-switch-handle"></div>
                                    </div>
                                </div>
                                <div class="c">设置默认地址</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="btnbar">
                    <a class="mui-btn mui-btn-block mui-btn-primary" href="javascript:void(0);" id="saveBtn" @click="save">保存</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'n-zepto'
// import mui1 from '../../../static/mobile/js/mui.min.js'
import router from '@/router'

export default {
    name: 'editAddress',
    data() {
        return {
            addrId: '',
            receiverName: '',
            receiverTel: '',
            receiverProvinceId: '',
            receiverCityId: '',
            receiverCountyId: '',
            combineAddr: '',
            receiverAddr: '',
            isDefaultAddr: 0
        }
    },
    methods: {
        save: function() {
            var receiverAddr = $("#receiverAddr").val();

            if (!this.receiverName) {
                mui.toast('请输入收货人!');
                return false;
            }
            if (!this.receiverTel) {
                mui.toast('请输入联系方式!');
                return false;
            }
            if (!(/^1[34578]\d{9}$/.test(this.receiverTel))) {
                mui.toast("请输入正确联系方式");
                return false;
            }
            var province = $("#province").val();
            var city = $("#city").val();
            var county = $("#county").val() ? $("#county").val() : '';

            if (province == null || province == '') {
                mui.toast("请选择省份!");
                return false;
            }
            if (city == null || city == '') {
                mui.toast("请选择市!");
                return false;
            }

            if (!receiverAddr) {
                mui.toast('请输入详细地址!');
                return false;
            }
            if ($("#isDefault").hasClass("mui-active")) {
                this.isDefaultAddr = 1;
            }

            var params = {
                addrId: this.addrId,
                receiverName: this.receiverName,
                receiverTel: this.receiverTel,
                receiverProvinceId: province,
                receiverCityId: city,
                receiverCountyId: county,
                receiverAddr: this.receiverAddr,
                isDefault: this.isDefaultAddr
            }

            console.log(params)
            this.$http.post('m/account/userAddress/updateAddress', {
                addrId: this.addrId,
                receiverName: this.receiverName,
                receiverTel: this.receiverTel,
                receiverProvinceId: province,
                receiverCityId: city,
                receiverCountyId: county,
                receiverAddr: this.receiverAddr,
                isDefault: this.isDefaultAddr
            }).then(res => {
                console.log(res)
                if (res.body.result == 'success') {
                    mui.toast('提交成功');
                    router.push({
                        name: 'Address'
                    })
                }
            })
        }
    },
    filters: {

    },
    computed: {
        addressToEdit() {
            return this.$store.state.addressToEdit;
        }
    },
    mounted: function() {

        var loadjs = require('loadjs');
        var em = this;
        loadjs([
            '../../../static/mobile/js/mui.min.js',
            '../../../static/mobile/css/mui/mui.picker.css',
            '../../../static/mobile/css/mui/mui.poppicker.css',
            '../../../static/mobile/js/mui/mui.picker.js',
            '../../../static/mobile/js/mui/mui.poppicker.js',
            '../../../static/mobile/js/mui/city.data-1.js'
        ]);

        // loadjs.ready('initPickup', {
        //     success: function() { /* foo.js & bar.js loaded */

        //     },
        //     error: function(depsNotFound) { /* foobar bundle load failed */ }
        // });
        //
        setTimeout(function(){
            mui.init();
                mui.ready(function() {
                    var cityPicker = new mui.PopPicker({
                        layer: 3
                    });
                    cityPicker.setData(cityData3);
                    var showCityPickerButton = document.getElementById('showCityPicker');
                    showCityPickerButton.addEventListener('tap', function(event) {
                        var obj = this;
                        var province = document.getElementById('province');
                        var city = document.getElementById('city');
                        var county = document.getElementById('county');
                        var items2 = '';

                        cityPicker.show(function(items) {
                            items2 = (items[2] || {}).text ? "-" + (items[2] || {}).text : '';
                            obj.value = (items[0] || {}).text + " - " + (items[1] || {}).text + items2;
                            em.combineAddr = obj.value;
                            em.receiverCountyId = (items[2] || {}).value ? (items[2] || {}).value : '';
                            em.receiverProvinceId = (items[0] || {}).value;
                            em.receiverCityId = (items[1] || {}).value;
                        });
                    }, false);
                })
        },1000);

        if(this.addressToEdit && this.addressToEdit.addrId){
            this.addrId = this.addressToEdit.addrId;
            this.receiverName = this.addressToEdit.receiverName;
            this.receiverTel = this.addressToEdit.receiverTel;
            this.receiverProvinceId = this.addressToEdit.receiverProvinceId || '';
            this.receiverCityId = this.addressToEdit.receiverCityId || '';
            this.receiverCountyId = this.addressToEdit.receiverCountyId || '';
            this.receiverAddr = this.addressToEdit.receiverAddr;
            this.isDefaultAddr = this.addressToEdit.isDefaultAddr;
            this.combineAddr = this.addressToEdit.receiverProvinceName + '-' + this.addressToEdit.receiverCityName + '-' + this.addressToEdit.countyName;
            this.$store.commit('emptyAddressToEdit')
        }


    },
    created: function() {


    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
