define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        init: function () {
            var mod = $('.J_Module[data-module-name=auxiliary-search]');
            mod.each(function () {
                var module = $(this).find(".module");
                if(!module[0] || module.data("init")==true) return;

                var searchInput = module.find(".input-search"),
                    searchLabel = module.find("label");
                searchLabel.on("click", function () {
                    searchInput.trigger("focus");
                });
                searchInput.on("focus", function () {
                    module.addClass("focus");
                }).on("blur", function () {
                    if($.trim(this.value) == "")
                        module.removeClass("focus");
                });

                module.data("init",true);
            });
        },
        data:{
            "type" : "1"
        }
    }
});