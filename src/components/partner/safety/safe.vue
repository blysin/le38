<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerCenter'}"></router-link>
            <h1 class="mui-title">安全中心</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="borderbox">
                <div class="tbviewlist">
                    <ul v-show='!isLoading'>
                        <li>
                            <a class="itemlink" href="javascript:void(0)" @click='withdraw'>
                                <div class="c">{{withdrawPwdFlag?'修改':'设置'}}提现密码</div>
                            </a>
                        </li>
                        <li>
                            <a class="itemlink" href="javascript:void(0)" @click='login'>
                                <div class="c">修改登密码</div>
                            </a>
                        </li>
                    </ul>
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
    name: 'Safe',
    data() {
        return {
            isLoading: true,
            withdrawPwdFlag: false
        }
    },
    computed: {

    },
    methods: {
        withdraw() {
            this.$store.commit('setData', 'withdraw');
            router.push({name:'PartnerCheckPhone'})
        },
        login() {
            this.$store.commit('setData', 'login');
            router.push({name:'PartnerCheckPhone'})
        }
    },
    filters: {

    },
    mounted: function() {

    },
    created: function() {
        this.$http.get('m/partner/checkWithdrawPwd').then(res => {
            this.withdrawPwdFlag = res.body;
            this.isLoading = false;
        }, res => {
            this.isLoading = false;
            if (res.status !== 401) {
                mui.alert('网络错误');
            } else {
                router.push({ name: 'Login' })
            }
        })
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
