<template>
    <div>
        <div class="scloading" v-show='isLoading'><span class="mui-spinner"></span></div>
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav" :to="{name:'PartnerCenter'}"></router-link>
            <h1 class="mui-title">收件箱</h1>
            <a class="mui-icon"></a>
        </header>
        <div class="mui-content">
            <div class="inboxlist">
                <ul>
                    <li>
                        <div class="time"><span>04-21 17:44</span></div>
                        <div class="itmes">
                            <div class="hd">
                                <a href="article_detail.html">
                                    <div class="img" style="background-image: url(../images/videoimg.jpg);"></div>
                                    <p>视频标题视频标题视频标题视频标题视频标题…</p>
                                </a>
                            </div>
                            <div class="bd">
                                <div class="edit-bar"><a href="#" class="deletesingle"><i class="ico ico-delete"></i>删除</a></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="time"><span>04-21 17:44</span></div>
                        <div class="itmes">
                            <div class="hd">
                                <a href="article_detail.html">
                                    <div class="img" style="background-image: url(../images/videoimg.jpg);"></div>
                                    <p>视频标题视频标题视频标题视频标题视频标题…</p>
                                </a>
                            </div>
                            <div class="bd">
                                <div class="edit-bar"><a href="#" class="deletesingle"><i class="ico ico-delete"></i>删除</a></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="fbbwrap">
                <div class="ftbtnbar">
                    <div class="button-wrap button-wrap-expand">
                        <a href="javascript:void(0)" class="button whiteBtn" id="deleteall">全部删除</a>
                    </div>
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
    name: 'products',
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
