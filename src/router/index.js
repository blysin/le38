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
        component: resolve => require(['@/components/product/category'], resolve)
    }, {
        path: '/products',
        name: 'Products',
        component: resolve => require(['@/components/product/products'], resolve)
    }, {
        path: '/detail/:productId',
        name: 'Detail',
        component: resolve => require(['@/components/product/detail'], resolve)
    }, {
        path: '/reviewlist/:productId',
        name: 'Reviews',
        component: resolve => require(['@/components/product/reviewlist'], resolve)
    }, {
        path: '/submit',
        name: 'Submit',
        component: resolve => require(['@/components/product/submit_order'], resolve)
    }, {
        path: '/address',
        name: 'Address',
        component: resolve => require(['@/components/express/my_address'], resolve)
    }, {
        path: '/address/edit',
        name: 'EditAddress',
        component: resolve => require(['@/components/express/edit_address'], resolve)
    }, {
        path: '/cartitem',
        name: 'CartItem',
        component: resolve => require(['@/components/product/cartitem'], resolve)
    }, {
        path: '/cartitem/submit',
        name: 'SubmitCart',
        component: resolve => require(['@/components/product/submit_cart'], resolve)
    }, {
        path: '/partner/login',
        name: 'Login',
        component: resolve => require(['@/components/partner/login'], resolve)
    }, {
        path: '/partner',
        name: 'PartnerIndex',
        component: resolve => require(['@/components/partner/index'], resolve),
        children:[{
            path: '',
            name: 'PartnerCenter',
            component: resolve => require(['@/components/partner/partner_center'], resolve)
        },{
            path: 'wallet',
            name: 'PartnerWallet',
            component: resolve => require(['@/components/partner/wallet/wallet'], resolve)
        },{
            path: 'shop',
            name: 'PartnerShop',
            component: resolve => require(['@/components/partner/shop/shop'], resolve)
        },{
            path: 'partner',
            name: 'PartnerList',
            component: resolve => require(['@/components/partner/partners/partner'], resolve)
        },{
            path: 'safe',
            name: 'PartnerSafe',
            component: resolve => require(['@/components/partner/safety/safe'], resolve)
        },{
            path: 'safe/checkPhone',
            name: 'PartnerCheckPhone',
            component: resolve => require(['@/components/partner/safety/check_phone'], resolve)
        },{
            path: 'safe/modify',
            name: 'PartnerModifyPwd',
            component: resolve => require(['@/components/partner/safety/modify_pwd'], resolve)
        },{
            path: 'inbox',
            name: 'PartnerInbox',
            component: resolve => require(['@/components/partner/inbox/inbox'], resolve)
        },{
            path: 'inbox/:siteMsgId',
            name: 'PartnerInboxDetail',
            component: resolve => require(['@/components/partner/inbox/detail'], resolve)
        }]
    }, {
        path: '/partner/data',
        name: 'PartnerData',
        component: resolve => require(['@/components/partner/partner_data'], resolve),
        children: [{
            path: '',
            name: 'CityPartnerDetail',
            component: resolve => require(['@/components/partner/data/detail'], resolve)
        },{
            path: 'editName',
            name: 'EditName',
            component: resolve => require(['@/components/partner/data/modify_name'], resolve)
        },{
            path: 'editPhone',
            name: 'EditPhone',
            component: resolve => require(['@/components/partner/data/modify_phone'], resolve)
        }]
    }]
})
