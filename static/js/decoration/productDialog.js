define(["jquery","common","ztree","jsgrid"],function ($,common) {
    function productSelector(options,promotionId){
        var config = {
            maxCount : null,
            callback : function (){}
        };
        $.extend(config,options);

        var dialog_html = '<div class="product-dialog-content"><div class="dialog-tab">' +
            '<ul>' +
            '<li data-tab="0">全部</li>' +
            '<li data-tab="1">已选</li>' +
            '</ul>' +
            '</div>' +
            '<div class="dialog-tabcon">' +
            '<div class="searching-box"><ul>' +
            '<li><label>商品ID：</label><input id="Product_dialog_search_id" class="control-text" type="text" placeholder="输入商品ID"></li>' +
            '<li><label>商品名称：</label><input id="Product_dialog_search_name" class="control-text" type="text" placeholder="输入商品名称"><button id="Product_dialog_search_button" class="button button-primary">搜索</button></li>' +
            '</ul></div>' +
            '<div class="product-dialog-category"><span class="art-dialog-loading">Loading..</span></div>' +
            '<div class="product-dialog-list"><div class="prdDiag-list"></div></div>' +
            '</div>' +
            '<div class="dialog-tabcon">' +
            '<div class="product-dialog-selected"><div class="prdDiag-list"></div></div>' +
            '</div>' +
            '</div>';

        var content = $(dialog_html);
        var tabItems = content.find(".dialog-tab li"),
            tabCons = content.find(".dialog-tabcon"),
            catSide = content.find(".product-dialog-category"),
            productList = content.find(".product-dialog-list .prdDiag-list"),
            selectedProductList = content.find(".product-dialog-selected .prdDiag-list"),
            inputId = content.find("#Product_dialog_search_id"),
            inputName = content.find("#Product_dialog_search_name"),
            searchBtn = content.find("#Product_dialog_search_button"),
            currentTabcon,
            currentCategory,
            selectedArr = [];
        arr = [];

        tabItems.on("click", function () {
            var tab = $(this),
                targetCon = tabCons.eq(tab.index());
            tabItems.removeClass("current");
            tab.addClass("current");
            if(currentTabcon && currentTabcon[0]) currentTabcon.hide();
            targetCon.show();
            currentTabcon = targetCon;

            if(tab.index() == 1){
                listSelectedProduct();
            }
        });
        tabItems.eq(0).trigger("click");

        var prodDialog = common.dialog({
            id : "productDialog",
            fixed : true,
            width : 875,
            height : 474,
            title : "选择商品",
            content : content,
            okValue: '确定',
            ok: function (){
                if(selectedArr.length == 0){
                    alert("您还未选择商品");
                    return false;
                }
                if(config.callback) config.callback.call(this,selectedArr);
            },
            cancelValue: '取消',
            cancel: function (){},
            onremove: function () {
                content.remove();
            }
        });
        prodDialog.showModal();

        searchBtn.on("click", function () {
            listProducts({
                categoryID : currentCategory,
                id : inputId.val(),
                name : inputName.val(),
                promotionId : promotionId
            });
        });

        /*category*/
        $.ajax(window.goodsCategoryDataUrl,{
            dataType : "json",
            success : function (data) {
                catSide.html('<ul class="ztree"></ul>')
                var nodes = $.map(data, function (v,i) {
                    if(v.parentID) v.pId = v.parentID;
                    return v;
                });
                $.fn.zTree.init(catSide.find(".ztree"),{
                    treeId : "categoryList",
                    view: {
                        showIcon: false,
                        selectedMulti : false
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: function(event, treeId, treeNode, clickFlag) {
                            listProducts({categoryID : treeNode.id});
                            currentCategory = treeNode.id;
                        }
                    }
                }, nodes);
            }
        });

        /*list*/
        function addItem(item){
            var index = getItemIndex(item);
            if(index < 0){
                selectedArr.push(item);
            }
        }
        function delectItem(item){
            var index = getItemIndex(item);
            if(index > -1){
                selectedArr.splice(index,1);
            }
        }
        function getItemIndex(item){
            var idx = -1;
            $.each(selectedArr, function (i,v) {
                if(v.id == item.id){
                    idx = i;
                    return false;
                }
            });
            return idx;
        }

        jsGrid.setDefaults({
            height: "100%",
            width: "100%",
            noDataContent : "还没有商品哦",
            updateOnResize : false,
            paging: true,
            selecting : false,
            pageSize: 10,
            pageButtonCount: 5,
            pageIndex :1,
            loadMessage : "数据加载中...",
            // pagerContainer: "#externalPager",
            pagerFormat: "{first} {prev} {pages} {next} {last}",
            pagePrevText: "&lt;",
            pageNextText: "&gt;",
            pageFirstText: "&lt;&lt;",
            pageLastText: "&gt;&gt;",
            pageNavigatorNextText: "&#8230;",
            pageNavigatorPrevText: "&#8230;"
        });

        /*var listCheckboxAll = $('<input type="checkbox">');
         listCheckboxAll.on("click", function () {

         });*/

        listProducts();
        function listProducts(opt){
            var data = {};
            if(promotionId!=null){
                data.promotionId = promotionId;
            }
            if(opt){
                if(opt.categoryID)  data.categoryID = opt.categoryID;
                if(opt.id)  data.id = opt.id;
                if(opt.name)  data.name = opt.name;
                if(opt.promotionId) data.promotionId = opt.promotionId;
            }
            productList.jsGrid({
                autoload: true,
                pageLoading : true,
                controller: {
                    loadData : function (filter) {
                        var d = $.Deferred(),
                            dat = data;
                        // dat.currentPage = filter.pageIndex;
                        // dat.pageItemCount = filter.pageSize;
                        dat.pageNo = filter.pageIndex;
                        dat.pageSize = filter.pageSize;
                        $.ajax({
                            type : "post",
                            url: window.goodsListDataUrl,
                            data : data,
                            dataType: "json"
                        }).done(function(response) {
                            console.log(response);
                            d.resolve({
                                data : response.data,
                                itemsCount : response.totalItemCount
                            });
                        });
                        return d.promise();
                    }/*,
                     loadData: function(filter) {
                     var startIndex = (filter.pageIndex - 1) * filter.pageSize;
                     return {
                     data: db.clients.slice(startIndex, startIndex + filter.pageSize),
                     itemsCount: db.clients.length
                     };
                     }*/
                },
                fields: [
                    { width:15, align:"center",itemTemplate: function (value,item) {
                        var index = getItemIndex(item);
                        return '<input type="checkbox"'+ (index > -1 ? ' checked':'') +'>';
                    }},
                    { name: "id", title:"商品ID", align:"left",width:30},
                    { title:"商品",itemTemplate: function (value,item) {
                        var imgPath = item.img,
                            result = '<div class="prodCell"><div class="img"><img src="'+imgPath+'"/></div><div class="name">'+item.name+'</div></div>';
                        return result;
                    }},
                    { name: "priceReal", type: "number",title:"销售价格",width:30,align:"left"},
                    { name: "priceOrigin", type: "number",title:"吊牌价格",width:30,align:"left"}
                    /*
                     { name: "stock", type: "number",title:"库存",width:30,align:"right"},
                     { name: "saleCount", type: "number",title:"销量",width:30,align:"right"}
                     */
                ],
                rowClick : function (data) {
                    var checkbox = $(data.event.target).closest("tr").find("input[type=checkbox]"),
                        checked = checkbox.is(":checked"),
                        isCheckbox;
                    if(data.event.target == checkbox[0]){
                        isCheckbox = true;
                    }
                    if((isCheckbox && !checked) || (!isCheckbox && checked)){
                        if(!isCheckbox) checkbox.attr("checked",false);
                        delectItem(data.item);
                    }else{
                        if(config.maxCount && selectedArr.length >= config.maxCount){
                            alert("最多选择"+ config.maxCount +"项");
                            return;
                        }
                        if(!isCheckbox) checkbox.attr("checked",true);
                        addItem(data.item);
                    }
                }
            });
        }

        function listSelectedProduct(){
            selectedProductList.jsGrid({
                data : selectedArr,
                fields: [
                    /*{ width:15, align:"center",itemTemplate: function (value,item) {
                     var index = getItemIndex(item);
                     return '<input type="checkbox"'+ (index > -1 ? ' checked':'') +'>';
                     }},*/
                    { name: "id", title:"商品ID", align:"left",width:30 },
                    { title:"商品",itemTemplate: function (value,item) {
                        var imgPath = item.img,
                            result = '<div class="prodCell"><div class="img"><img src="'+imgPath+'"/></div><div class="name">'+item.name+'</div></div>';
                        return result;
                    }},
                    { name: "priceReal", type: "number",title:"销售价格",width:30,align:"right"},
                    { name: "priceOrigin", type: "number",title:"吊牌价格",width:30,align:"right"}
                    /*
                     { name: "stock", type: "number",title:"库存",width:30,align:"right"},
                     { name: "saleCount", type: "number",title:"销量",width:30,align:"right"}
                     */
                ]
            });
        }
    }

    return productSelector;
});
