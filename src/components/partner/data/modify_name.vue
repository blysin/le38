<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav" href='javascript:history.back(-1)'></a>
            <h1 class="mui-title">门店资料</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="mui-content">
                <div class="restform">
                    <ul>
                        <li>
                            <div class="hd">联系人</div>
                            <div class="bd">
                                <div class="info">
                                    <div class="input-wrap">
                                        <input type="text" v-model='cityPartner.contacts' placeholder="请输入联系人名称">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="btnbar">
                    <button class="mui-btn mui-btn-block mui-btn-primary" :class='cityPartner.contacts?"":"mui-disabled"' @click='submit'>保存</button>
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
    name: 'EditName',
    data() {
        return {
            isLoading: false
        }
    },
    computed: {
        cityPartner(){
            return this.$store.state.cityPartner;
        }
    },
    methods: {
        submit(){
            if(!this.cityPartner.contacts){
                mui.toast('请输入联系人名称');
                return false;
            }
            this.$http.patch('m/partner/data',JSON.stringify(this.cityPartner)).then(res=>{
                if(res.status === 201){
                    mui.toast('修改成功')
                    router.push({name:'CityPartnerDetail'})
                }else{
                    mui.toast('修改失败');
                }
            },res=>{
                mui.alert('网络出错，请稍后再试');
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
