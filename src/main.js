// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueResource from 'vue-resource'
import { formatDate } from '@/components/util/dateformat'
// import Zepto from '../static/mobile/js/zepto.js'


Vue.config.productionTip = false
Vue.use(VueResource)

/**
 * 全局过滤器
 */
Vue.filter('dateformat', function (time) {
    var date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
})

Vue.filter('phone', function (phone) {
    if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)){
       return phone.substring(0,3)+'****'+phone.substring(phone.length-4);
    }else{
      return phone;
    }

})

Vue.filter('money', function(val) {
    val = val.toString().replace(/\$|\,/g,'');
    if(isNaN(val)) {
      val = "0";
    }
    let sign = (val == (val = Math.abs(val)));
    val = Math.floor(val*100+0.50000000001);
    let cents = val%100;
    val = Math.floor(val/100).toString();
    if(cents<10) {
       cents = "0" + cents
    }
    for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
        val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
    }

    return (((sign)?'':'-') + val + '.' + cents);
})

/**
 * 环境变量，判断当前是否处于开发模式
 */
const env = process.env.NODE_ENV
const isProduction = env === 'production'


window.apiUrlPrefix = isProduction ? '/' : '/api' // 这里决定是否使用代理，解决跨域问题
/**
 * 资源通讯
 */
Vue.http.options.emulateJSON = true //全局配置vue.resource数据格式
Vue.http.options.root= window.apiUrlPrefix

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
