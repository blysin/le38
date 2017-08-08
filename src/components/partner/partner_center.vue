<template>
    <div>
        <div class="mui-content">
            <div class="storetopbar">
                <router-link :to="{name:'PartnerData'}">
                    <p class="info partner">城市合伙人</p>
                </router-link>
            </div>
            <div class="partnerNavigation">
                <ul>
                    <li><a href="partner_wallet.html"><i class="ico ico_mcwallet"></i><p>我的钱包</p></a></li>
                    <li><a href="shop.html"><i class="ico ico_mcshop"></i><p>我的店铺</p></a></li>
                    <li><a href="partner.html"><i class="ico ico_mcitypartner"></i><p>城市合伙人</p></a></li>
                    <li><a href="safe.html"><i class="ico ico_mcsecurity"></i><p>安全中心</p></a></li>
                    <li><a href="inbox.html"><i class="ico ico_mcInbox"></i><p>收件箱</p></a></li>
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
