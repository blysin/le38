<template>
    <div id="category">

            <header class="mui-bar mui-bar-nav">
                <a class="mui-icon mui-icon-left-nav" href="javascript:history.back(-1)"></a>
                <h1 class="mui-title">商品分类</h1>
                <a class="mui-icon"></a>
            </header>
            <div class="mui-content">
                <div class="shelves-search">
                    <div class="category-search">
                        <input type="text" placeholder="搜索您想要的商品" v-model='keywords' @change="search()">
                        <button @click='search()'>搜索</button>
                    </div>
                </div>
                <div class="accordianlist">
                    <div class="actop" @click='toList(-1)'><span>全部商品</span></div>
                </div>
                <div v-for='cat in categorys' class="accordianlist">
                    <div class="actop"><span @click='toList(cat.categoryId)'>{{cat.categoryName}}</span></div>
                    <div class="acitem ac-toggled" v-for='second in cat.list'>
                        <div class="actit">
                            <div class="con"><a href="javascript:void(0)" @click='toList(second.categoryId)'>{{second.categoryName}}</a></div>
                            <div class="ac-toggle-btn" @click='totalList'></div>
                        </div>
                        <div class="accon" v-if='second.list && second.list.length > 0'>
                            <ul class="prd-catlist">
                                <li v-for="third in second.list"><a href="javascript:void(0)" @click='toList(third.categoryId)'>{{third.categoryName}}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="globalMenu">
                    <div class="gbt-wrap">
                        <ul>
                            <li>
                                <a href="javascript:void(0);">
                                <span class="gbt-ico ico-home"></span>
                                <span class="gbt-text">首页</span>
                            </a>
                            </li>
                            <li class="current">
                                <a href="javascript:void(0);">
                                <span class="gbt-ico ico-classify"></span>
                                <span class="gbt-text">分类</span>
                            </a>
                            </li>
                            <li>
                                <a href="my_index.html">
                                <span class="gbt-ico ico-center"></span>
                                <span class="gbt-text">我的</span>
                            </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);">
                                <span class="gbt-ico ico-cart"></span>
                                <span class="gbt-text">购物车</span>
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
    name: 'category',
    props: [],
    data() {
        return {
            categorys: [],
            keywords: ''
        }
    },
    methods: {
        totalList() {
            var target = event.target;
            var obj = $(target).closest(".acitem");
            if (obj.hasClass("ac-toggled")) {
                $(".acitem").addClass("ac-toggled");
                obj.removeClass("ac-toggled");
            } else {
                obj.addClass("ac-toggled");
            }
        },
        toList(categoryId) {
            router.push({
                name: 'Products',
                query: {
                    categoryId: categoryId,
                    keywords: ''
                }
            });
        },
        search() {
            router.push({
                path: 'products',
                query: {
                    categoryId: -1,
                    keywords: this.keywords
                }
            });
        }
    },
    filters: {

    },
    mounted: function() {

    },
    created: function() {
        this.$http.get('m/products/categorys').then(
            res => {
                if (res) {
                    this.categorys = res.body;
                }
            })
    }
}

</script>
<style type="text/css" scoped="" lang="scss">


</style>
