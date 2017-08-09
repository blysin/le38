<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerCenter'}"></router-link>
            <h1 class="mui-title">安全中心</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <p class="inputNum">已绑定门店联系方式： 151****5667</p>
            <div class="restform">
                <ul>
                    <li>
                        <div class="hd w5">验证码</div>
                        <div class="bd">
                            <div class="info">
                                <div class="input-wrap">
                                    <input type="number" placeholder="请输入验证码"><span class="delete"></span></div>
                                <div class="code"><img src=""></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="hd">短信验证码</div>
                        <div class="bd">
                            <div class="info">
                                <div class="input-wrap">
                                    <input type="number" placeholder="请输入短信验证码"><span class="delete"></span></div>
                                <div class="toobtain disabled">重新获取58s</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btnbar">
                <a class="mui-btn mui-btn-block mui-btn-primary" href="set_password2.html">下一步</a>
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
            isLoading: false
        }
    },
    computed: {

    },
    methods: {

    },
    filters: {

    },
    mounted: function() {

    },
    created: function() {

    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
