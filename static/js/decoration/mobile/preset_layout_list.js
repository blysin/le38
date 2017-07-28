define(['jquery','handlebars','json!mobileDecoration/config/presetLayouts.json'],function ($,handlebars,layoutData) {
    var htmlwrap = '<div class="preset-layout-select">' +
            '<div class="preset-layout-category"><div class="wrap">' +
                '<label>试下行业推荐：</label>' +
                '<ul>' +
                    '<li><a class="current">全部</a></li>' +
                    '<li><a data-category-id="A">服装鞋包</a></li>' +
                    '<li><a data-category-id="C">医疗保健</a></li>' +
                    '<li><a data-category-id="D">家电数码</a></li>' +
                    '<li><a data-category-id="E">美妆洗护</a></li>' +
                    '<li><a data-category-id="F">家居家装</a></li>' +
                    '<li><a data-category-id="G">食品酒饮</a></li>' +
                    '<li><a data-category-id="H">珠宝钟表</a></li>' +
                    '<li><a data-category-id="I">图书音像</a></li>' +
                    '<li><a data-category-id="J">金融保险</a></li>' +
                    '<li><a data-category-id="K">生活服务</a></li>' +
                    '<li><a data-category-id="L">工业原料</a></li>' +
                    '<li><a data-category-id="M">母婴</a></li>' +
                    '<li><a data-category-id="Z">综合</a></li>' +
                '</ul>' +
            '</div></div>' +
            '<div class="preset-layout-list"><div class="wrap">' +
                '<ul></ul>' +
            '</div></div>' +
        '</div>',
        item_html = '<li data-category="{{category}}" data-layout-id="{{layoutId}}">' +
                '<div class="box">' +
                    '<div class="boxin">' +
                        '<div class="thumb"><img src="{{thumb}}" alt=""/></div>' +
                        '<div class="preview">' +
                            '<div class="t">扫一扫 手机访问</div>' +
                            '<div class="q"><img src="/qrCode/generate?content={{mobileLink}}&w=110&h=110"/></div>' +
                            '<div class="b"><a href="{{link}}" target="_blank">立即预览</a></div>' +
                        '</div>' +
                    '</div>' +
                '</div><div class="name">{{title}}</div>' +
            '</li>',
        item_tmpl = handlebars.compile(item_html);

    function presetLayouts(render,callback){
        $(render).each(function() {
            var wrap = $(this);
            wrap.html(htmlwrap);

            var category_list = wrap.find(".preset-layout-category ul"),
                layout_list = wrap.find(".preset-layout-list ul"),
                currentCategory = category_list.find("a").eq(0),
                currentItem;

            category_list.on("click","a", function () {
                var $this = $(this),
                    cat = $this.attr("data-category-id");
                if(currentCategory && currentCategory[0]){
                    if(currentCategory[0] == this) return;
                    currentCategory.removeClass("current");
                }
                $this.addClass("current");
                showCategory(cat);
                currentCategory = $this;
            });

            layout_list.on("click","li", function () {
                var $this = $(this),
                    layoutId = $this.attr("data-layout-id");
                if(currentItem && currentItem[0]){
                    currentItem.removeClass("selected");
                }
                $this.addClass("selected");
                currentItem = $this;

                if(callback) callback.call(this,layoutId);
            }).on("click","a", function (e) {
                e.stopPropagation();
            });

            renderList(layoutData);

            function renderList(data){
                var list_html = "";
                $.each(layoutData, function (i,v) {
                    var layoutId = v.id,
                        mobileLink = "http://" + location.host + "/static/decoration/mobile/layoutPreview_page.html?type=preset&layoutId="+layoutId,
                        data = {
                            category : v.category,
                            title : v.title,
                            layoutId : layoutId,
                            thumb : "/static/decoration/mobile/layouts/" + layoutId + "/thumb.jpg",
                            mobileLink : encodeURIComponent(mobileLink),
                            link : "http://" + location.host + "/static/decoration/mobile/layoutPreview.html?type=preset&layoutId="+layoutId
                        };
                    list_html += item_tmpl(data);
                });
                layout_list.html(list_html);
            }

            function showCategory(cat){
                var items = layout_list.find("li"),
                    targets = items.filter("li[data-category="+cat+"]");
                if(!cat){
                    items.show();
                }else{
                    items.hide();
                    targets.show();
                }
            }
        });
    }

    return presetLayouts;
});