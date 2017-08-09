import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        productToSubmit:{},
        skuToSubmit:[],
        addressToEdit:{},
        successUrl:'',
        cityPartner:{},
        data:''//存放临时参数
    },
    mutations: {
        submitOrder(state,val) {
            state.productToSubmit = val;
        },
        selectSku(state,val) {
            state.skuToSubmit = val;
        },
        emptyProductToSubmit(state,val){
            //加载商品详情页面时清空state中的数据
            state.productToSubmit = {};
            state.skuToSubmit = [];
        },
        editAddress(state,val) {
            state.addressToEdit = val;
        },
        emptyAddressToEdit(state,val){
            state.addressToEdit = {}
        },
        resetSuccessUrl(state,val){
            state.successUrl = '';
        },
        setSuccessUrl(state,val){
            state.successUrl = val;
        },
        setCityPartner(state,val){
            state.cityPartner = val;
        },
        setData(state,val){
            state.data = val;
        }
    }
})
