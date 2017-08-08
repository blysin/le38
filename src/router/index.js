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
    }, {
        path: '/reviewlist/:productId',
        name: 'Reviews',
        component:resolve => require(['@/components/product/reviewlist'],resolve)
    }, {
        path: '/submit',
        name: 'Submit',
        component:resolve => require(['@/components/product/submit_order'],resolve)
    }, {
        path: '/address',
        name: 'Address',
        component:resolve => require(['@/components/express/my_address'],resolve)
    }, {
        path: '/address/edit',
        name: 'EditAddress',
        component:resolve => require(['@/components/express/edit_address'],resolve)
    }, {
        path: '/cartitem',
        name: 'CartItem',
        component:resolve => require(['@/components/product/cartitem'],resolve)
    }, {
        path: '/cartitem/submit',
        name: 'SubmitCart',
        component:resolve => require(['@/components/product/submit_cart'],resolve)
    }, {
        path: '/partner/login',
        name: 'Login',
        component:resolve => require(['@/components/partner/login'],resolve)
    }, {
        path: '/partner/center',
        name: 'PartnerCenter',
        component:resolve => require(['@/components/partner/partner_center'],resolve)
    }, {
        path: '/partner/data',
        name: 'PartnerData',
        component:resolve => require(['@/components/partner/partner_data'],resolve)
    }]
})
