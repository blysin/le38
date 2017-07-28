define(["jquery","handlebars"],function ($,handlebars) {
    function tabber(render){
        $(render).each(function (i,v) {
            var wrap = $(this);

            if(wrap.data("init") == true) return;

            var tabTitles = wrap.find(".tab-title"),
                tabItems = wrap.find(".tab-item"),
                currentTab;

            tabItems.hide();

            tabTitles.on("click", function () {
                setCurrentTab(this);
            });

            function setCurrentTab(tab){
                if(currentTab && currentTab == tab) return;
                tabItems.hide();
                tabItems.filter("[data-id="+ tab.getAttribute("data-child") +"]").show();
                currentTab = tab;
            }

            // 如果当前已经选中，则显示
            var curtab = tabTitles.find(":checked").closest(".tab-title")[0];
            setCurrentTab(curtab);
            //tabItems.filter("[data-id=" + $tab.attr("data-child") + "]").show();

            wrap.data("init",true);
        });
    }

    return tabber;
});
