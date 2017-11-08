<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <div class="successcashWrap">
            <ul>
                <li class="first">
                    <div class="hd">
                        <i class="ico_dg"></i>
                    </div>
                    <div class="bd">
                        <h3>提现申请已提交，等待银行处理</h3>
                        <p>{{openingBankName}}({{no}})</p>
                        <p>{{amt | money}}元</p>
                    </div>
                </li>
                <li>
                    <div class="hd">
                        <i class="ico_hb"></i>
                    </div>
                    <div class="bd">
                        <h3>预计24小时之内到账</h3>
                    </div>
                </li>
            </ul>
        </div>
        <div class="btnbar aligncenter">
            <router-link :to="{name:'PartnerWithdraw'}" class="mui-btn mui-btn-block mui-btn-primary w100"><span>继续提现</span></router-link>
            <router-link :to="{name:'PartnerIndex'}" class="mui-btn mui-btn-block mui-btn-primary w100"><span>返回首页</span></router-link>
        </div>
    </div>
</template>
<script>
import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'


export default {
    name: 'products',
    data() {
        return {
            isLoading: false,
            amt: 0,
            no: 0,
            openingBankName: ''
        }
    },
    computed: {

    },
    methods: {

    },
    filters: {

    },
    mounted() {
        var _amt = this.$route.query.withdrawalAmt;
        var _no = this.$route.query.openingAccountNo;
        var _openingBankName = this.$route.query.openingBankName;
        if (_amt && _no && _openingBankName) {
            this.amt = _amt;
            this.no = _no;
            this.openingBankName = _openingBankName;
        } else {
            console.log('数据不全');
            router.push({name: 'PartnerIndex'})
        }
    },
    created() {

    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
