<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <router-view></router-view>
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
        $('#page').hide()
        this.$http.get('m/login/partner/isLogin').then(res => {
            if (!res.body) {
                router.push({ name: 'Login' })
            } else {
                $('#page').show()
            }

            this.isLoading = false;
        }, res => { router.push({ name: 'Login' }) })
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
