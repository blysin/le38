// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource)

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
