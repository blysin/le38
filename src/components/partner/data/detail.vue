<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerCenter'}"></router-link>
            <h1 class="mui-title">门店资料</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="borderbox">
                <div class="tbviewlist">
                    <ul>
                        <li>
                            <a href="javascript:void(0);">
                                <div class="r">{{cityPartner.cityPartnerNumber}}</div>
                                <div class="c">城市合伙人编号</div>
                            </a>
                        </li>
                        <li>
                            <a class="" href="javascript:void(0);">
                                <div class="r">{{cityPartner.cityPartnerName}}</div>
                                <div class="c">用户名</div>
                            </a>
                        </li>
                        <li>
                            <router-link class="itemlink" :to="{name:'EditName'}">
                                <div class="r">{{cityPartner.contacts}}</div>
                                <div class="c">联系人</div>
                            </router-link>
                        </li>
                        <li>
                            <router-link class="itemlink" :to="{name:'EditPhone'}">
                                <div class="r">{{cityPartner.telephone}}</div>
                                <div class="c">联系方式</div>
                            </router-link>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <div class="r">{{cityPartner.areaName}}</div>
                                <div class="c">地区</div>
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
            isLoading: false,
            cityPartner:{}
        }
    },
    computed: {

    },
    methods: {
        logout() {
            this.$http.get('m/login/partner/logout').then(res => {
                if (res.status === 202) {
                    mui.toast('退出成功');
                    router.push({
                        name: 'Login'
                    })
                }
            }, res => {
                mui.alert('网络错误，请稍候重试')
            })
        }
    },
    filters: {

    },
    mounted: function() {

    },
    created: function() {
        $('#page').hide();

        this.$http.get('m/partner/data').then(res => {
            if (res.body) {
               this.cityPartner = res.body;
               this.$store.commit('setCityPartner',this.cityPartner);
            }
            $('#page').show()
            this.isLoading = false;

        }, res => {
            if(res.status === 401){
                router.push({ name: 'Login' });
            }
        })
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
