<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerCenter'}"></router-link>
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
                                    <input type="number" placeholder="请输入6位数字新密码"><span class="delete"></span></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="hd">重复输入密码</div>
                        <div class="bd">
                            <div class="info">
                                <div class="input-wrap">
                                    <input type="number" placeholder="请再次输入6位数字新密码"><span class="delete"></span></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="hd w6">验证码</div>
                        <div class="bd">
                            <div class="info">
                                <div class="input-wrap">
                                    <input type="number" placeholder="请输入验证码"><span class="delete"></span></div>
                                <div class="code"><img src=""></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btnbar">
                <button class="mui-btn mui-btn-block mui-btn-primary">修改</button>
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
