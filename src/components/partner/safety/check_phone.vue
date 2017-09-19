<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav" href="javascript:history.back(-1)"></a>
            <h1 class="mui-title">{{isWithdraw?'提现密码修改':'登录密码修改'}}</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <p class="inputNum">已绑定城市合伙人联系方式： {{phone | phone}}</p>
            <div class="restform">
                <ul>
                    <li>
                        <div class="hd w5">验证码</div>
                        <div class="bd">
                            <div class="info">
                                <div class="input-wrap">
                                    <input type="number" v-model='verifyCode' placeholder="请输入验证码"><span class="delete"></span></div>
                                <div class="code"><img :src="randomImage" @click='changeRandomImage'></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="hd">短信验证码</div>
                        <div class="bd">
                            <div class="info">
                                <div class="input-wrap">
                                    <input type="number" v-model='smsCode' placeholder="请输入短信验证码"><span class="delete"></span></div>
                                <div class="toobtain" :class='timer===0?"":"disabled"' @click='sendSms'>{{msg}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btnbar">
                <a class="mui-btn mui-btn-block mui-btn-primary" :class='smsCode.length==6?"":"mui-disabled"' @click='validateSmsCode'>下一步</a>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'


export default {
    name: 'CheckPhone',
    data() {
        return {
            isLoading: true,
            phone: '',
            randomImage: '',
            verifyCode: '',
            timer: 0,
            msg: '发送验证码',
            smsCode: ''
        }
    },
    watch: {
        timer(nVal, oVal) {
            if (nVal === 0) { //倒计时已经走完
                this.msg = '发送验证码'
            } else {
                this.msg = '重新获取' + nVal + 's';
                var em = this;
                setTimeout(function() {
                    em.timer--;
                }, 1000);
            }

        }
    },
    computed: {
        isWithdraw() {
            return this.$store.state.data === 'withdraw';
        }
    },
    methods: {
        validateSmsCode() {
            if (this.smsCode.length !== 6) return false;
            this.$http.get('m/partner/checkVerifyCode', {
                params: {
                    msgCode: this.smsCode
                }
            }).then(res => {
                if (res.body) {
                    router.push({
                        name: 'PartnerModifyPwd'
                    })
                } else {
                    mui.alert('短信验证码错误');
                }
            })
        },
        changeRandomImage() {
            this.randomImage = '/randomCaptcha?t=' + new Date().getTime()
        },
        sendSms() {
            if (this.timer > 0) return false;
            if (this.verifyCode.length != 5) {
                mui.toast('验证码有误');
                return false;
            }
            this.$http.get('m/partner/checkVerifyCode', {
                params: {
                    verifyCode: this.verifyCode,
                    phone: this.phone
                }
            }).then(res => {
                if (res.body) {
                    this.timer = 60;
                } else {
                    mui.alert('验证码错误');
                }
            })
        }
    },
    filters: {

    },
    mounted: function() {

    },
    created: function() {
        this.$http.get('m/partner/data').then(res => {
            if (res.body) {
                this.phone = res.body.telephone;
            }
            this.isLoading = false;

        }, res => {
            if (res.status === 401) {
                router.push({ name: 'Login' });
            }
            this.isLoading = false;
        })
        this.changeRandomImage();
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
