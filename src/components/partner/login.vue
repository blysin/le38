<template>
    <div>
        <div class="mui-content">
            <div class="loginform">
                <ul>
                    <li>
                        <div class="input-wrap">
                            <input type="text" v-model='loginName' placeholder="请输入账号"><span @click='loginName=""' class="delete" :class='loginName?"cls":""'></span></div>
                    </li>
                    <li>
                        <div class="input-wrap">
                            <input type="password" v-model='pwd' placeholder="请输入密码"><span @click='pwd=""' class="delete" :class='pwd?"cls":""'></span></div>
                    </li>
                </ul>
            </div>
            <div class="btnbar">
                <button class="mui-btn mui-btn-block mui-btn-primary" :class='validate?"":"mui-disabled"' @click='login'>登录</button>
            </div>
        </div>
        <!--错误提示-->
        <div class="error-prompt">
            <div class="topbar"></div>
            <div class="con">
                <h3>温馨提示</h3>
                <p>{{errorMsg}}</p>
            </div>
            <div class="fbar">
                <a class="mui-btn mui-btn-block mui-btn-primary promptSure" @click='errorPrompthide'>确定</a>
            </div>
        </div>
    </div>
</template>
<script>
// import $ from 'n-zepto'
import mui from 'mui'
import router from '@/router'
// import CryptoJS from ''

export default {
    name: 'Login',
    data() {
        return {
            Mask: {},
            loginName: '',
            pwd: '',
            errorMsg: ''
        }
    },
    computed: {
        validate() {
            if (this.loginName.length >= 1 && this.pwd.length > 3) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        login() {
            if (!this.validate) {
                this.errorMsg = '请输入账号和密码';
                this.errorPromptshow();
                return false;
            }
            // console.log()
            this.$http.post('m/login/partner', {
                loginName: this.loginName,
                password: this.pwd
            }).then(res => {
                if (res.status === 202) {
                    mui.toast('登录成功');
                    router.push({
                        name: 'PartnerCenter'
                    })
                }
            }, res => {
                if (res.status === 401) {
                    this.errorMsg = res.body.error;
                    this.errorPromptshow();
                } else {
                    mui.alert('网络错误，请稍后再试')
                }
            });

        },
        errorPromptshow() {
            this.Mask.show().animate({ opacity: 1 }, {
                duration: 80,
                complete: function() {
                    $(".error-prompt").css({
                        display: "block"
                    }).animate({
                        opacity: 1
                    }, {
                        duration: 200,
                        easing: "ease-in-out"
                    });
                }
            });
        },
        errorPrompthide() {
            var em = this;
            $(".error-prompt").animate({
                opacity: 0
            }, {
                duration: 200,
                easing: "ease-in-out",
                complete: function() {
                    $(".error-prompt").hide();
                    em.Mask.animate({ opacity: 0 }, {
                        duration: 80,
                        complete: function() {
                            em.Mask.hide();
                        }
                    });
                }
            });
        }
    },
    filters: {

    },
    mounted: function() {
        if(this.$route.query.s === 'block'){
            this.errorMsg = '该用户已被冻结，请重新登录！';
            this.errorPromptshow();
        }
    },
    beforeDestroy() {
        $('#page').removeClass('login blogo');
    },
    created: function() {
        var loadjs = require('loadjs');

        loadjs([
            '../../../static/mobile/js/zepto.js'
        ]);
        this.Mask = $("<div style='display: none;' class='mask'></div>").appendTo(document.body);

        $('#page').addClass('login blogo');
    },
    components: {

    }
}

</script>
<style type="text/css" scoped="" lang="scss">
.cls{
    display: inline; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);
}

</style>
