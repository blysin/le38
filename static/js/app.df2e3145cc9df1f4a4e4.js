webpackJsonp([9],[,function(t,e,n){"use strict";var s=n(0),a=n(16),i=n(13),o=n.n(i);s.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"Hello",component:o.a},{path:"/category",name:"Category",component:function(t){return n.e(6).then(function(){var e=[n(26)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/products",name:"Products",component:function(t){return n.e(4).then(function(){var e=[n(28)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/detail/:productId",name:"Detail",component:function(t){return n.e(0).then(function(){var e=[n(27)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/reviewlist/:productId",name:"Reviews",component:function(t){return n.e(3).then(function(){var e=[n(29)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/submit",name:"Submit",component:function(t){return n.e(1).then(function(){var e=[n(31)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/address",name:"Address",component:function(t){return n.e(7).then(function(){var e=[n(24)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/address/edit",name:"EditAddress",component:function(t){return n.e(8).then(function(){var e=[n(23)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/cartitem",name:"CartItem",component:function(t){return n.e(2).then(function(){var e=[n(25)];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/cartitem/submit",name:"SubmitCart",component:function(t){return n.e(5).then(function(){var e=[n(30)];t.apply(null,e)}.bind(this)).catch(n.oe)}}]})},,function(t,e,n){"use strict";function s(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var s in n)if(new RegExp("("+s+")").test(e)){var i=n[s]+"";e=e.replace(RegExp.$1,1===RegExp.$1.length?i:a(i))}return e}function a(t){return("00"+t).substr(t.length)}e.a=s},function(t,e,n){"use strict";var s=n(0),a=n(18);s.a.use(a.a),e.a=new a.a.Store({state:{productToSubmit:{},skuToSubmit:[],addressToEdit:{},successUrl:""},mutations:{submitOrder:function(t,e){t.productToSubmit=e},selectSku:function(t,e){t.skuToSubmit=e},emptyProductToSubmit:function(t,e){t.productToSubmit={},t.skuToSubmit=[]},editAddress:function(t,e){t.addressToEdit=e},emptyAddressToEdit:function(t,e){t.addressToEdit={}},resetSuccessUrl:function(t,e){t.successUrl=""},setSuccessUrl:function(t,e){t.successUrl=e}}})},function(t,e,n){function s(t){n(11)}var a=n(2)(n(8),n(14),s,null,null);t.exports=a.exports},,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(1),a=n(7),i=n.n(a);e.default={name:"hello",data:function(){return{msg:"这是首页，稍候再进行修改",show:!1,size:"300px"}},methods:{toCategory:function(){s.a.push({name:"Category"})},test:function(){console.log(i()(".nav").html())},showaaa:function(){this.show=!this.show,i()(".actionsheet-spec").show(),this.show?this.coverDiv():this.hideMask()},hideMask:function(){i()("div[class='xucun_content']").hide();document.getElementsByTagName("body");i()("#mask").hide(),this.show=!1,i()(document).unbind("touchmove")},coverDiv:function(){var t=i()("#mask")[0];t.style.background="#000000",t.style.width="100%",t.style.height="100%",t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.zIndex="500",t.style.opacity="0.6",t.style.filter="Alpha(opacity=70)",i()("#mask").show(),i()(document).bind("touchmove",function(t){t.preventDefault()})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),a=n(5),i=n.n(a),o=n(1),c=n(4),r=n(6),u=n(3);s.a.config.productionTip=!1,s.a.use(r.a),s.a.filter("dateformat",function(t){var e=new Date(t);return n.i(u.a)(e,"yyyy-MM-dd hh:mm:ss")}),s.a.filter("money",function(t){t=t.toString().replace(/\$|\,/g,""),isNaN(t)&&(t="0");var e=t==(t=Math.abs(t));t=Math.floor(100*t+.50000000001);var n=t%100;t=Math.floor(t/100).toString(),n<10&&(n="0"+n);for(var s=0;s<Math.floor((t.length-(1+s))/3);s++)t=t.substring(0,t.length-(4*s+3))+","+t.substring(t.length-(4*s+3));return(e?"":"-")+t+"."+n});window.apiUrlPrefix="/",s.a.http.options.emulateJSON=!0,s.a.http.options.root=window.apiUrlPrefix,new s.a({el:"#app",router:o.a,store:c.a,render:function(t){return t(i.a)}})},function(t,e){},function(t,e){},function(t,e,n){function s(t){n(12)}var a=n(2)(n(9),n(15),s,"data-v-db83bcb8",null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"page"}},[n("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("div",{staticClass:"mask",staticStyle:{display:"none"},attrs:{id:"mask"},on:{click:t.hideMask}}),t._v(" "),n("div",{staticClass:"nav"},[n("h1",{on:{click:t.test}},[t._v(t._s(t.msg))])]),t._v(" "),n("div",{staticClass:"nav"},[n("button",{on:{click:t.toCategory}},[t._v("category")])]),t._v(" "),n("button",{on:{click:function(e){t.showaaa()}}},[t._v("\n        Toggle render\n    ")]),t._v(" "),n("transition",{attrs:{name:"slide-fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"actionsheet-spec",staticStyle:{display:"block"},attrs:{id:"J_ASSpec"}},[n("div",{staticClass:"close",on:{click:function(e){t.showaaa()}}}),t._v(" "),n("div",{staticClass:"prod-info"},[n("div",{staticClass:"pic"},[n("img",{attrs:{src:"images/goodspic.jpg",alt:""}})]),t._v(" "),n("div",{staticClass:"name"},[t._v("产品名称产品名称产品名称产品产品名称产品名称产品名称产品产品名称产品名称产品名称产品")]),t._v(" "),n("div",{staticClass:"price"},[n("span",{staticClass:"price-real"},[t._v("￥"),n("em",[t._v("399.00")])])])]),t._v(" "),n("div",{staticClass:"spec-list"},[n("div",{staticClass:"spec-item"},[n("h3",[t._v("容量")]),t._v(" "),n("div",{staticClass:"prop-list"},[n("ul",[n("li",{staticClass:"active"},[t._v("30ML")]),t._v(" "),n("li",{},[t._v("50ML")]),t._v(" "),n("li",{staticClass:"disabled"},[t._v("70ML")]),t._v(" "),n("li",{staticClass:"disabled"},[t._v("100ML")])])])]),t._v(" "),n("div",{staticClass:"spec-item"},[n("h3",[t._v("数量")]),t._v(" "),n("div",{staticClass:"number-widget"},[n("div",{staticClass:"number-minus disabled"}),t._v(" "),n("input",{staticClass:"number-text",attrs:{type:"number",value:"1",readonly:"readonly"}}),t._v(" "),n("div",{staticClass:"number-plus disabled"})])])]),t._v(" "),n("div",{staticClass:"fbbwrap nofixed"},[n("div",{staticClass:"ftbtnbar"},[n("div",{staticClass:"button-wrap button-wrap-expand"},[n("a",{staticClass:"button btn-buy",attrs:{href:"javascript:void(0)"}},[t._v("确定")])])])])])])],1)},staticRenderFns:[]}},,,,,function(t,e){}],[10]);
//# sourceMappingURL=app.df2e3145cc9df1f4a4e4.js.map