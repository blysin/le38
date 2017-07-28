import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello
    }, {
        path: '/category',
        name: 'Category',
        component:resolve => require(['@/components/product/category'],resolve)
    }, {
        path: '/products',
        name: 'Products',
        component:resolve => require(['@/components/product/products'],resolve)
    }, {
        path: '/detail/:productId',
        name: 'Detail',
        component:resolve => require(['@/components/product/detail'],resolve)
    }]
})
