<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerSafe'}"></router-link>
            <h1 class="mui-title">安全中心</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="restform">
                <ul>
                    <li>
                        <div class="hd w4">输入密码</div>
                        <div class="bd">
                            <div class="info">
                                <div class="input-wrap">
                                    <input type="password" v-model='pwd1' :placeholder="'请输入'+msg+'纯数字密码'"><span class="delete"></span></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="hd">重复输入密码</div>
                        <div class="bd">
                            <div class="info">
                                <div class="input-wrap">
                                    <input type="password" v-model='pwd2' placeholder="请再次输入新密码"><span class="delete"></span></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="hd w6">验证码</div>
                        <div class="bd">
                            <div class="info">
                                <div class="input-wrap">
                                    <input type="number" v-model='verifyCode' placeholder="请输入验证码"><span class="delete"></span></div>
                                <div class="code"><img :src="randomImage" @click='changeRandomImage'></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btnbar">
                <button class="mui-btn mui-btn-block mui-btn-primary" @click='submit' :class='isValidate?"":"mui-disabled"'>修改</button>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'


export default {
    name: 'ModifyPwd',
    data() {
        return {
            isLoading: false,
            pwd1: '',
            pwd2: '',
            reg: /^\d{6}$/,
            msg: '6位',
            randomImage: '',
            verifyCode: ''
        }
    },
    computed: {
        isValidate() {
            return this.pwd1 === this.pwd2 && this.reg.test(this.pwd1) && this.reg.test(this.pwd2) && /^\d{5}$/.test(this.verifyCode)
        },
        isWithdraw() {
            return this.$store.state.data === 'withdraw';
        },
        successUrl(){
            return this.$store.state.successUrl ;
        }

    },
    methods: {
        changeRandomImage() {
            this.randomImage = '/randomCaptcha?t=' + new Date().getTime()
        },
        submit() {
            if (!this.isValidate) return false;
            //loginPassword  withdrawPassword
            var params = {
                pwd1: CryptoJS.SHA1(this.pwd1).toString(),
                pwd2: CryptoJS.SHA1(this.pwd2).toString(),
                verifyCode: this.verifyCode,
                isWithdraw: this.isWithdraw
            }
            console.log(JSON.stringify(params))

            this.$http.patch('m/partner/modifyPwd', params).then(res => {
                if (res.status === 201) {
                    mui.toast('修改成功');
                    if(this.successUrl){
                        router.push({ name: this.successUrl })
                        this.$store.commit('resetSuccessUrl')
                    }else{
                        router.push({ name: 'PartnerCenter' })
                    }
                } else {
                    mui.alert('修改失败');
                }
            }, res => {
                if (res.status === 422) {
                    mui.alert(res.body.error);
                } else if (res.status === 401) {
                    router.push({ name: 'Login' })
                } else {
                    mui.alert('网络出错，请稍候再试');
                }
            })
        }
    },
    filters: {

    },
    mounted: function() {
        if (this.isWithdraw) {
            //支付密码
        } else {
            //登录密码
            this.msg = '不少于6位的';
            this.reg = /^\d{6,}$/
        }
    },
    created: function() {
        var loadjs = require('loadjs');
        //            '../../../static/mobile/js/zepto.js',
        loadjs([

            '../../../static/mobile/js/sha1.js'
        ]);
        this.changeRandomImage();
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
