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
                    <ul>
                        <li>
                            <a class="itemlink" href="set_password.html">
                                <div class="c">设置提现密码</div>
                            </a>
                        </li>
                        <li>
                            <a class="itemlink" href="set_password.html">
                                <div class="c">修改提现密码</div>
                            </a>
                        </li>
                        <li>
                            <a class="itemlink" href="set_password.html">
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
