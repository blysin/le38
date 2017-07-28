define(["jquery","./productDialog"],function ($,productDialog) {
    var list_html = '<div class="product-select-list"><input type="hidden"></div>',
        group_html = '<div class="product-select-group">' +
            '<div class="prd-group-content">' +
            '<div class="prd-select-btn"><a href="javascript:void(0)"><span>+ 选择商品</span></a></div>' +
            '<div class="product-list"></div>' +
            '<div class="editbar group-editbar">' +
            '<a class="edit-up" href="javascript:void(0)"></a>' +
            '<a class="edit-down" href="javascript:void(0)"></a>' +
            '<a class="edit-delete" href="javascript:void(0)"></a>' +
            '</div>' +
            '</div>' +
            '</div>',
        group_no_html = '<div class="prd-select-btn"><a href="javascript:void(0)"><span>+ 选择商品</span></a></div><div class="product-list"></div>',
        prdGroupClass = ".product-select-group",
        prdItemClass = ".prd-item";

    function productList(render,callback){
        $(render).each(function (i,v) {
            var wrap = $(this),
                rowTemplate = wrap.html(),
                name = wrap.attr("data-name"),
                tag = wrap.attr("data-tag"),
                value = wrap.attr("data-value"),
                multiple = wrap.attr("data-multiple") == "1" ? true : false;

            if(wrap.data("init") == true) return;

            wrap.html(list_html);

            var dataStore = wrap.find("input[type=hidden]"),
                list = wrap.find(".product-select-list");
            if(name) dataStore.attr("name",name);
            if(tag) dataStore.attr("data-tag",tag);

            if(!rowTemplate) list.addClass("notmpl");
            if(multiple){
                var btnAddGroup = $('<div class="list-add"><a href="javascript:void(0)">+再加一组</a></div>');
                btnAddGroup.on("click", function () {
                    addGroup();
                });
                wrap.append(btnAddGroup);
            }

            if(!multiple)
                list.append(group_no_html);
            if(value){
                var v;
                try{
                    v = $.parseJSON(value);
                }catch (e){}
                if(multiple){
                    for(var i = 0; i < v.length; i++){
                        addGroup(v[i]);
                    }
                }else{
                    renderGroup(v,list);
                }
                dataStore.val(value);
            }

            wrap.on("click",".prd-select-btn", function () {
                var btn = $(this),
                    prdGroup = btn.closest(prdGroupClass);
                if(!prdGroup[0]) prdGroup = btn.closest(".product-select-list");
                var items = prdGroup.find(prdItemClass),
                    prdList = prdGroup.find('.product-list'),
                    dialogOpt = {
                        callback : function (data) {
                            if(!rowTemplate) prdList.html("");
                            $.each(data,function(i,v){
                                var item;
                                if(!rowTemplate){
                                    item = $('<div class="prd-cell"><div class="prd-item"></div></div>')
                                        .appendTo(prdList).find(prdItemClass);
                                }else{
                                    item = items.eq(i);
                                }
                                if(v){
                                    setItem(v,item);
                                }
                            });
                            setData();
                        }
                    };

                if(rowTemplate) dialogOpt.maxCount = items.length;
                var promotionId = $(this).parents("form").find(".activity-set-url").val();
                if(promotionId=="-1"){
                    alert("请选择活动!");
                    return false;
                }
                productDialog(dialogOpt,promotionId);
            });

            wrap.on("click",".editbar a", function () {
                var group = $(this).closest(prdGroupClass),
                    type = $(this).attr("class"),
                    target;

                if(type == "edit-up"){
                    target = group.prev(prdGroupClass);
                    target.before(group);
                }else if(type == "edit-down"){
                    target = group.next(prdGroupClass);
                    target.after(group);
                }else if(type == "edit-delete"){
                    group.remove();
                }
                fixOrder();
                setData();
            });

            wrap.data("init",true);

            function setItem(data,item){
                var imgPath = data.img,
                    dat = {
                        id : data.id,
                        img : imgPath,
                        link : "/product/"+data.id+".html",
                        name : data.name,
                        priceReal : data.priceReal,
                        priceOrigin : data.priceOrigin,
                        stock : data.stock,
                        saleCount : data.saleCount
                    };
                $(item).data("data",dat)
                    .removeClass("prd-item-nopic")
                    .html('<img src="'+imgPath+'">');
            }
            function renderGroup(data,group){
                group.find(".product-list").append(rowTemplate);
                if(data && data[0] && data[0].img){
                    var items = group.find(prdItemClass);
                    $.each(items, function (i, v) {
                        if(data[i]){
                            setItem(data[i],this);
                        }
                    });
                }
            }
            function addGroup(data){
                var groupCount = wrap.find(prdGroupClass).length + 1,
                    group = $(group_html);
                group.prepend('<div class="group-title">第'+ groupCount +'组</div>');

                renderGroup(data,group);
                list.append(group);
            }

            function fixOrder(){
                wrap.find(prdGroupClass).each(function (i) {
                    $(this).find(".group-title").html("第"+(i+1)+"组");
                });
            }

            function setData(){
                var data = [];
                if(multiple){
                    wrap.find(prdGroupClass).each(function (i) {
                        var d = getGroupData(this);
                        data.push(d);
                    });
                }else{
                    data = getGroupData(list);
                }

                dataStore.val(JSON.stringify(data));

                if(callback && wrap.data("init") == true)
                    callback.call(dataStore[0],data);

                function getGroupData(group){
                    var d = [];
                    $(group).find(prdItemClass).each(function () {
                        var prd = $(this),
                            prddata = {};
                        if(!prd.hasClass("prd-item-nopic")){
                            prddata = prd.data("data");
                        }
                        d.push(prddata);
                    });
                    return d;
                }
            }
        });
    }

    return productList;
});
