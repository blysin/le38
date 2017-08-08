<template>
    <div>
<header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav" href="javascript:history.back(-1)"></a>
        <h1 class="mui-title">门店资料</h1>
        <a class="mui-icon"></a>
    </header>
    <div class="mui-content">
        <div class="borderbox">
            <div class="tbviewlist">
                <ul>
                    <li>
                        <a href="javascript:void(0);">
                            <div class="r">001</div>
                            <div class="c">门店编号</div>
                        </a>
                    </li>
                    <li>
                        <a class="itemlink" href="store_data_edit.html">
                            <div class="r">妍姿直营店</div>
                            <div class="c">门店名称</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);">
                            <div class="r">001</div>
                            <div class="c">用户名</div>
                        </a>
                    </li>
                    <li>
                        <a class="itemlink" href="store_data_edit.html">
                            <div class="r">妍姿直营店</div>
                            <div class="c">联系人</div>
                        </a>
                    </li>
                    <li>
                        <a class="itemlink" href="store_data_edit.html">
                            <div class="r">13906047475</div>
                            <div class="c">联系方式</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);">
                            <div class="r">001</div>
                            <div class="c">地区</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);">
                            <div class="r">001</div>
                            <div class="c">地址</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <a class="exit" href="javascript:void(0);" @click='logout'>退出登录</a>
    </div>
    </div>
</template>
<script>
import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'


export default {
    name: 'PartnerData',
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {
        logout(){
            this.$http.get('m/login/partner/logout').then(res=>{
                if(res.status === 202){
                    mui.toast('退出成功');
                    router.push({
                        name:'Login'
                    })
                }
            },res=>{
                mui.alert('网络错误，请稍候重试')
            })
        }
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
