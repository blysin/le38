<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <div class="mui-content">
            <div class="storetopbar">
                <router-link :to="{name:'PartnerData'}">
                    <p class="info partner">城市合伙人</p>
                </router-link>
            </div>
            <div class="partnerNavigation">
                <ul>
                    <li><router-link :to="{name:'PartnerWallet'}"><i class="ico ico_mcwallet"></i><p>我的钱包</p></router-link></li>
                    <li><router-link :to="{name:'PartnerShop'}"><i class="ico ico_mcshop"></i><p>我的店铺</p></router-link></li>
                    <li><router-link :to="{name:'PartnerList'}"><i class="ico ico_mcitypartner"></i><p>城市合伙人</p></router-link></li>
                    <li><router-link :to="{name:'PartnerSafe'}"><i class="ico ico_mcsecurity"></i><p>安全中心</p></router-link></li>
                    <li><router-link :to="{name:'PartnerInbox'}"><i class="ico ico_mcInbox"></i><p>收件箱</p></router-link></li>
                    <li><a href="javascript:void(0)" class="disabled"><i class="ico ico_mcexpect"></i><p>敬请期待</p></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'



export default {
    name: 'PartnerCenter',
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
<style type="text/css" scoped lang="scss">


</style>
