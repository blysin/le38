<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav" href="javascript:history.back(-1)"></a>
            <h1 class="mui-title">选择银行</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <ul class="tbviewlist bank-list">
                <li v-for="b in bankList"><a href="javascript:void(0);" @click='select(b.bankName)' class="itemlink"><i class="ico"><img :src="b.picUrl" alt=""></i>{{b.bankName}}</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'


export default {
    name: 'SelectBank',
    data() {
        return {
            isLoading: true,
            bankList:[]
        }
    },
    computed: {

    },
    methods: {
        select(name){
            this.$store.commit('setData',"bank:"+name);
            router.push({name:'PartnerWithdraw'})
        }
    },
    filters: {

    },
    mounted: function() {

    },
    created: function() {
        this.$http.get('m/partner/banks').then(res => {
            this.bankList = res.body;
            this.isLoading = false;
        }, res => {
            if (res.status === 401) {
                router.push({ name: 'Login' })
            } else {
                this.isLoading = false;
                mui.alert('网络出错，请稍候再试');
            }
        })
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
