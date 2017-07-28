(function(w) {
    var $ = function(id) {
        return window.document.getElementById(id);
    };
    var _extend = function(a, b) {
        for (var key in b) {
            if (!b.hasOwnProperty(key) || a.hasOwnProperty(key)) continue;
            a[key] = b[key];
        }
        return a;
    };
    function PRINT(obId, emId) {
        obId = obId || "LODOP_OB";
        emId = emId || "LODOP_EM";
        this.options = {
            obId: obId,
            emId: emId
        };
        this.LODOP = getLodop($(obId), $(emId));
    }

    PRINT.eval = function (obj, code) {
        var obId = obj.options.obId,
            emId = obj.options.emId;
        window.LODOP = getLodop($(obId), $(emId));
        eval(code);
        return window.LODOP;
    };

    var _trim_ = function(str) {
        if (!str && isNaN(str)) return "";
        return str.toString().replace(/(\n)+|(\r\n)+/g, "");
    }
    PRINT._trim_ = _trim_;
    PRINT.printFormat = function (code, arr, map, commonMap, definedFill) {
        code = "LODOP.NewPage();" + code.replace(/(LODOP.PRINT_INITA)[^;]*/, "").substring(1);
        var codes = arr.map(function(obj){
            var result = code
            obj = _extend(obj, commonMap);
            for (var key in map) {
                result = result.replace(new RegExp("{" + map[key] + "}", "g"), _trim_((obj[key] == null || obj[key] == undefined) ? "" : obj[key]));
            }
            if (definedFill || typeof  definedFill === "function") {
                result = definedFill(result, obj);
            }
            return result;
        });
        return codes.join("") + "LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 0, '');";
    };

    PRINT.prototype = {
        init: function (params) {
            var options = {
                xPoint: [0, 0],
                yPoint: [800, 540],
                target: "print target",
                inBrowse: true,
                hideClose: true,
                hideLock: false,
                pageSize: [1000, 1500]
            };
            options = _extend(this.options || {}, options);
            options = _extend(options, params);
            this.options = options;
            this.LODOP.PRINT_INITA(options.xPoint[0], options.xPoint[1], options.yPoint[0], options.yPoint[1], options.target);
            //this.LODOP.SET_PRINT_PAGESIZE(0, options.pageSize[0], options.pageSize[1], "A4");
            this.LODOP.SET_SHOW_MODE("DESIGN_IN_BROWSE", options.inBrowse ? 1 : 0);
            if (options.hideClose) this.LODOP.SET_SHOW_MODE("SETUP_ENABLESS", "11111111000000");
            this.LODOP.SET_SHOW_MODE("HIDE_GROUND_LOCK", options.hideLock ? 1 : 0);
            return this;
        },
        preview: function () {
            this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", true);
            this.LODOP.PREVIEW();
            return this;
        },
        print: function () {
            this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", true);
            this.LODOP.SET_SHOW_MODE("BKIMG_PRINT", true);
            this.LODOP.PRINT();
            return this;
        },
        design: function () {
            this.LODOP.SET_SHOW_MODE("DESIGN_IN_BROWSE", 1);
            this.LODOP.PRINT_DESIGN();
            return this;
        },
        getCode: function () {
            return this.LODOP.GET_VALUE("ProgramCodes", 0)
        },
        clear: function() {
            this.LODOP.SET_PRINT_STYLEA("All", "Deleted", true);
        },
        setBackImage: function(path) {
            this.LODOP.ADD_PRINT_SETUP_BKIMG("<img src='" + path + "'>");
        }
    };
    window.PRINT = PRINT;
}(window));