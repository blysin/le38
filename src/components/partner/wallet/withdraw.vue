<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerWallet'}"></router-link>
            <h1 class="mui-title">提现</h1>
            <router-link :to="{name:'PartnerWithdrawHistory'}" class="mui-icon"><span>历史</span></router-link>
            <!-- <router-link :to="{name:'WithdrawSuccess'}" class="mui-icon"><span>测试</span></router-link> -->
        </header>
        <div class="mui-content">
            <div class="prompt-text alignleft">提现需要收取0.6%税点</div>
            <div class="withdrawalsWrap mb10">
                <div class="restform">
                    <ul>
                        <li>
                            <div class="hd">提现金额</div>
                            <div class="bd">
                                <div class="info">
                                    <div class="input-wrap">
                                        <input type="number" v-model='withdrawAmt' placeholder="请输入您要的提现金额">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <p class="canbe">可提金额：<i>{{partner.cityPartnerBalance | money}}</i>元</p>
                <div class="tbviewlist" v-show='!isLoading && !partner.withdrawPwdFlag'>
                    <ul>
                        <li>
                            <a class="itemlink" @click='selectBank'>
                                <div class="r">{{bankName}}</div>
                                <div class="c">提现银行</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="restform" v-show='!isLoading && !partner.withdrawPwdFlag'>
                    <ul>
                        <li>
                            <div class="hd w2">卡号</div>
                            <div class="bd">
                                <div class="info">
                                    <div class="input-wrap">
                                        <input v-model='bankNum' type="number" placeholder="请输入卡号">
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="hd w2">姓名</div>
                            <div class="bd">
                                <div class="info">
                                    <div class="input-wrap">
                                        <input v-model='bankUserName' type="text" placeholder="请输入银行卡绑定的真实姓名">
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="hd w2">手机</div>
                            <div class="bd">
                                <div class="info">
                                    <div class="input-wrap">
                                        <input v-model='phone' type="number" placeholder="请输入银行卡绑定手机号">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="borderbox">
                <p class="title colorblack">提现密码</p>
                <div class="orderinfo" v-show="!isLoading && partner.withdrawPwdFlag">
                    <p>您还未设置提现密码，为保障账户资金安全，
                        <br>请先<a href="javascript:void(0)" @click='setPwd'>设置提现密码</a>！</p>
                </div>
                <div class="orderinfo textcenter" v-show='!isLoading && !partner.withdrawPwdFlag'>
                    <p>请输入提现密码进行验证！</p>
                    <div class="pwd-box">
                        <input type="tel" maxlength="6" class="pwd-input" id="pwd-input">
                        <div class="fake-box">
                            <input type="password" readonly="">
                            <input type="password" readonly="">
                            <input type="password" readonly="">
                            <input type="password" readonly="">
                            <input type="password" readonly="">
                            <input type="password" readonly="">
                        </div>
                    </div>
                    <div class="clear" @click='clearPwd()'>清空密码</div>
                </div>
            </div>
            <div class="btnbar mlr10">
                <button class="mui-btn mui-btn-block mui-btn-primary" :class='(isFullData && validateFlag)?"":"mui-disabled"' @click='submit'>提交申请</button>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'


export default {
    name: 'withdraw',
    data() {
        return {
            isLoading: true,
            withdrawAmt: '',
            validateFlag: false,
            partner: {
                cityPartnerBalance: 0,
                withdrawPwdFlag: true
            },
            bankName: '请选择银行',
            bankNum: '',
            bankUserName: '',
            phone: ''
        }
    },
    computed: {
        isFullData() {
            return this.withdrawAmt >= 1 && this.withdrawAmt <= this.partner.cityPartnerBalance && this.bankName !== '请选择银行' && this.bankNum.length > 3 && this.bankUserName.length >= 2 && /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone);
        }
    },
    watch: {
        withdrawAmt(n, o) {
            if (n > this.partner.cityPartnerBalance) {
                mui.toast('可提现金额为' + this.partner.cityPartnerBalance);
                this.withdrawAmt = ''
            }
            this.clearPwd();
        }
    },
    methods: {
        // test() {
        //     router.push({
        //         name: 'WithdrawSuccess',
        //         query: {
        //             withdrawalAmt: this.withdrawalAmt,
        //             openingAccountNo: this.bankNum.substring(this.bankNum.length-4)
        //         }
        //     })
        // },
        selectBank() {
            var params = {
                withdrawalAmt: this.withdrawAmt,
                openingAccountName: this.bankUserName,
                openingAccountNo: this.bankNum,
                reservedPhone: this.phone
            }

            this.$store.commit('setParams', params);

            router.push({ name: 'PartnerWithdrawBanks' })
        },
        setPwd() {
            this.$store.commit('setSuccessUrl', "PartnerWithdraw");
            this.$store.commit('setData', "withdraw");
            router.push({ name: 'PartnerCheckPhone' })
        },
        clearPwd() {
            $("#pwd-input").val('');
            $('input[type="password"]').val('');
            this.validateFlag = false;
        },
        submit() {
            if (!this.validateFlag) return false;
            if (this.withdrawAmt < 1) {
                mui.toast('最小提现金额为1元');
                return false;
            }
            // console.log(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))
            if (!this.isFullData) {
                mui.toast('请输入完整资料');
                return false;
            }

            var params = {
                withdrawalAmt: this.withdrawAmt,
                openingBankName: this.bankName,
                openingAccountName: this.bankUserName,
                openingAccountNo: this.bankNum,
                reservedPhone: this.phone
            }
            // console.log(JSON.stringify(params));
            this.$http.post('m/partner/withdraw', JSON.stringify(params)).then(res => {
                if (res.status === 201) {
                    // mui.alert('提现申请成功，请等待审核', function() {
                    //     router.push({ name: 'PartnerWallet' })
                    // })
                    router.push({
                        name: 'WithdrawSuccess',
                        query: {
                            withdrawalAmt: params.withdrawalAmt,
                            openingAccountNo: params.openingAccountNo.substring(params.openingAccountNo.length-4),
                            openingBankName:params.openingBankName
                        }
                    })
                }
            }, res => {
                if (res.status === 401) {
                    router.push({ name: 'Login' })
                } else if (res.status === 422) {
                    mui.alert(res.body.error);
                } else {
                    if (res.status !== 406) {
                        this.isLoading = false;
                        mui.alert('网络出错，请稍候再试');
                    }
                }
            })
        }
    },
    filters: {

    },
    mounted: function() {
        var em = this;
        var $input = $(".fake-box input");
        $("#pwd-input").on("input", function() {
            var pwd = $(this).val().trim();
            for (var i = 0, len = pwd.length; i < len; i++) {
                $input.eq("" + i + "").val(pwd[i]);
            }
            $input.each(function() {
                var index = $(this).index();
                if (index >= len) {
                    $(this).val("");
                }
            });
            if (len == 6) {
                //执行其他操作
                // mui.alert($("#pwd-input").val())
                // em.clearPwd()
                if (em.withdrawAmt < 1) {
                    mui.toast('最小提现金额为1元');
                    return false;
                }

                if (!em.isFullData) {
                    mui.toast('请输入完整资料');
                    em.clearPwd();
                    return false;
                }
                em.$http.post('m/partner/checkWithdrawPwd', { withdrawPassword: $("#pwd-input").val() }).then(res => {
                    if (res.body) {
                        em.validateFlag = true;
                    } else {
                        mui.toast('提现密码错误');
                        em.clearPwd();
                    }
                })
            }
        });
        this.$http.get('m/partner/data').then(res => {
            this.partner = res.body;
            if (!this.partner.cityPartnerBalance) {
                this.partner.cityPartnerBalance = 0;
            }

            var params = this.$store.state.params;
            if (params) {
                if (params.withdrawalAmt) this.withdrawAmt = params.withdrawalAmt;
                if (params.openingAccountName) this.bankUserName = params.openingAccountName;
                if (params.openingAccountNo) this.bankNum = params.openingAccountNo;
                if (params.reservedPhone) this.phone = params.reservedPhone;
                this.$store.commit('setParams', {});
            }

            this.isLoading = false;
        }, res => {
            if (res.status === 401) {
                router.push({ name: 'Login' })
            } else {
                if (res.status !== 406) {
                    this.isLoading = false;
                    mui.alert('网络出错，请稍候再试');
                }
            }
        })
    },
    created: function() {
        var data = this.$store.state.data;
        if (data) {
            if (data.indexOf('bank:') == 0) {
                this.bankName = this.$store.state.data.substring(5);
                this.$store.commit('setData', '');
            }
        }
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
