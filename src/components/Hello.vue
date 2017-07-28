<template>
    <div class="hello">
    <div id='mask' style='display: none;' class='mask' @click='hideMask'></div>
        <div class='nav'>
            <h1 @click='test'>{{ msg }}</h1>
        </div>
        <div class='nav'>
            <button @click='toCategory'>category</button>
        </div>
        <button @click="showaaa()">
            Toggle render
        </button>
        <transition name="slide-fade">
            <div v-show="show" id="J_ASSpec" class="actionsheet-spec" style="display:block">
                <div class="close" @click="showaaa()"></div>
                <div class="prod-info">
                    <div class="pic"><img src="images/goodspic.jpg" alt="" /></div>
                    <div class="name">产品名称产品名称产品名称产品产品名称产品名称产品名称产品产品名称产品名称产品名称产品</div>
                    <div class="price"><span class="price-real">￥<em>399.00</em></span></div>
                </div>
                <div class="spec-list">
                    <div class="spec-item">
                        <h3>容量</h3>
                        <div class="prop-list">
                            <ul>
                                <li class="active">30ML</li>
                                <li class="">50ML</li>
                                <li class="disabled">70ML</li>
                                <li class="disabled">100ML</li>
                            </ul>
                        </div>
                    </div>
                    <div class="spec-item">
                        <h3>数量</h3>
                        <div class="number-widget">
                            <div class="number-minus disabled"></div>
                            <input class="number-text" type="number" value="1" readonly="readonly">
                            <div class="number-plus disabled"></div>
                        </div>
                    </div>
                </div>
                <div class="fbbwrap nofixed">
                    <div class="ftbtnbar">
                        <div class="button-wrap button-wrap-expand">
                            <a href="javascript:void(0)" class="button btn-buy">确定</a>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import router from '@/router'
import $ from 'n-zepto'

export default {
    name: 'hello',
    data() {
        return {
            msg: '这是首页，稍候再进行修改',
            show: false,
            size:'300px'
        }
    },
    methods: {
        toCategory() {
            router.push({
                name: 'Category'
            });
        },
        test() {
            console.log($('.nav').html())
        },
        showaaa() {
            this.show = !this.show;
            $(".actionsheet-spec").show();
            if(this.show){
                this.coverDiv();
            }else{
                this.hideMask()
            }
        },
        hideMask(){
            $("div[class='xucun_content']").hide();
            var body = document.getElementsByTagName("body");
            $('#mask').hide()
            this.show = false;

            $(document).unbind("touchmove");
        },
        coverDiv(){
            var procbg = $('#mask')[0] //首先创建一个div
            procbg.style.background = "#000000";
            procbg.style.width = "100%";
            procbg.style.height = "100%";
            procbg.style.position = "fixed";
            procbg.style.top = "0";
            procbg.style.left = "0";
            procbg.style.zIndex = "500";
            procbg.style.opacity = "0.6";
            procbg.style.filter = "Alpha(opacity=70)";
            $('#mask').show();


            $(document).bind("touchmove",function(e){
                e.preventDefault();
            });
        },
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped="" lang="scss">
.actionsheet-spec {
    top: auto;
    bottom: 0;
}

.hello .nav {
    display: block;
    text-align: center;
    margin-top: 50px
}




/* 可以设置不同的进入和离开动画 */


/* 设置持续时间和动画函数 */

.slide-fade-enter-active {
    transition: all .1s ease;
}

.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
{
    transform: translateY(292px);
    opacity: 1;
}

</style>
