import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        productToSubmit:{

        },
        skuToSubmit:[],
        addressToEdit:{}
    },
    mutations: {
        submitOrder(state,val) {
            state.productToSubmit = val;
        },
        selectSku(state,val) {
            state.skuToSubmit = val;
        },
        editAddress(state,val) {
            state.addressToEdit = val;
        },
        emptyAddressToEdit(state,val){
            state.addressToEdit = {}
        }
    }
})
