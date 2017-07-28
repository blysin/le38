define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        init: function () {
            var mod = $('.J_Module[data-module-name=auxiliary-announcement]');
            mod.each(function () {
                var module = $(this).find(".module");
                if(!module[0] || module.data("init")==true) return;

                var step = 0.8,
                    marqueeItem = module.find(".m-text span"),
                    marqueeWrap = $("<div>").appendTo(module.find(".m-text")),
                    direction = module.attr("data-direction"),
                    minWidth = marqueeItem.parent().width(),
                    itemWidth = marqueeItem.width(),
                    initPos = 0,
                    pos = 0;

                if(itemWidth < minWidth) itemWidth = minWidth;
                marqueeItem.css("min-width",minWidth);
                marqueeWrap.append(marqueeItem).append(marqueeItem.clone());

                if(direction == "right"){
                    initPos = minWidth - itemWidth*2;
                    marqueeWrap.css("-webkit-transform","translateX("+initPos+"px)");
                }

                var move = function() {
                    if(direction == "right"){
                        pos += step;
                        if(pos >= minWidth - itemWidth ) pos = initPos;
                    }else{
                        pos -= step;
                        if(pos <= -itemWidth ) pos = initPos;
                    }
                    marqueeWrap.css("-webkit-transform","translateX("+ pos+"px)");

                    requestAnimationFrame(move);
                }
                setTimeout(move,2000);

                module.data("init",true);
            });
        },
        data:{
            "content" : "公告内容",
            "type": "0",
            "direction": "left"
        }
    }
});