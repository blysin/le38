(function($) {
    $(function(){
        /**
         * @param ids 订单id集合
         */
        var printOrder = function(ids) {
            var _order_numbers = ids;
            var BUI = top.BUI;
            var Overlay = BUI.Overlay;
            var dialog = new Overlay.Dialog({
                title:'任务列表',
                width: 1000,
                height: 550,
                closeAction: 'destroy',
                loader : {
                    url : "/admin/orderCurier/print/list",
                    autoLoad : false, //不自动加载
                    lazyLoad : false //不延迟加载
                },
                buttons:[{
                    text:'批量打印',
                    elCls : 'button button-primary',
                    handler : function(){
                        var select = top.$("#templateId");
                        var id = select.val();
                        if (!id) {
                            return BUI.Message.Alert("请先选择打印模板，如果没有打印模板的话请先到设置快递单模板中设置！");
                        }
                        if (select.find(":selected").attr("secondType") == "sys_inner") {
                            return window.open(id + _order_numbers);
                        }
                        var print = new self.PRINT().init();
                        var selects = top.getSelectedRecords();
                        var orderNumbers = "";
                        selects.forEach(function(obj){
                            if (!obj.deliveryNumber) orderNumbers += (obj.orderNumber + ",");
                        });
                        var ids = selects.map(function(obj){
                            return obj.orderNumber;
                        }).join(",");
                        if (select.find(":selected").attr("secondType") == "thermal") {
                            var msg = "由于您选择顺丰热敏模板打印,并且订单中存在没有运单的纪录。" +
                                "请确认是否由系统自动向顺丰公司获取运单号,自行获取请按“取消”";
                            for (var i = 0; i < selects.length; i++) {
                                if (!selects[i].deliveryNumber) {
                                    BUI.Message.Confirm(msg, function(){
                                        $.post("/admin/orderCurier/print/sfOrder", {"orderNumbers" : orderNumbers}, function(data){
                                            if (!data || data["error"]) return BUI.Message.Alert("获取运单信息出错:" + (data["message"] || ""));
                                            ids = ids.replace(/,-\d+$/, '');
                                            ids += (",-" + parseInt(Math.random() * 100));
                                            var templateId = select.find("option:selected").val();
                                            dialog.get("loader").load({numbers : ids, layoutType : templateId});
                                        });
                                    });
                                    return;
                                }
                            }
                        }
                        $.post("/admin/orderCurier/thermal/batchPrint", { "id" : id, "orderNumbers" : ids}, function(data){
                            if (!data) BUI.Message.Alert("获取模板数据失败！");
                            var code = data.data || "", codes = "";
                            // 寄件人信息注入
                            var reshipData = data.reshipAddress || {};
                            var reshipMap = {
                                reshipConsignee : reshipData["consignee"] || "",
                                reshipAddress : new Region().getRegionTextById(reshipData["regionId"] || "") + " " +  (reshipData["street"] || ""),
                                reshipPhone : reshipData["phone"] || "",
                                reshipMail : reshipData["postalCode"] || "",
                                type : data.type || "",
                                account4Month : data.account4Month || ""
                            };
                            codes = PRINT.printFormat(code, selects, {
                                detailAddress : "收址",
                                telephone : "收方手机",
                                consignee: "收件人",
                                reshipConsignee : "寄件人",
                                reshipAddress : "寄址",
                                reshipPhone : "寄方电话",
                                reshipMail : "寄方邮码",
                                type : "快递类型",
                                deliveryOrderId : "订单号",
                                deliveryDAddressCode : "DC",
                                account4Month : "月结卡号",
                                deliveryNumber : "运单号",
                                totalAmount : "代收金额",
                                orderNumber : "系统订单号",
                                username : "会员",
                                remark : "备注",
                                customerRemark : "买家留言",
                                submitDateStr : "下单时间",
                                totalWeight : "商品重量",
                                deliveryType : "配送方式",
                                payMode : "付款类型",
                                itemCount : "商品件数",
                                deliverTime : "最佳收货时间",
                                subTotal : "商品总价",
                                adjustmentInfo : "优惠信息",
                                currentPoint : "剩余积分",
                                customerBalance : "账户余额"

                            }, reshipMap, function(result, data) {
                                var itemInfos = data.itemInfos;
                                if (itemInfos) {
                                    for (var i = 0; i < itemInfos.length; i++) {
                                        var info = itemInfos[i];
                                        result = result.replace(new RegExp("{商品" + i + "}", "g"), PRINT._trim_(info.name));
                                        result = result.replace(new RegExp("{规格" + i + "}", "g"), PRINT._trim_(info.sku));
                                        result = result.replace(new RegExp("{数量" + i + "}", "g"), PRINT._trim_(info.quantity));
                                        result = result.replace(new RegExp("{单价" + i + "}", "g"), info.price && info.price.amount || "");
                                        result = result.replace(new RegExp("{小计" + i + "}", "g"), info.totalPrice && info.totalPrice.amount || 0);
                                        result = result.replace(new RegExp("{货号" + i + "}", "g"), info.productNumber || "");
                                    }
                                    result = result.replace(/123456789/g, data.deliveryNumber);
                                    result = result.replace(new RegExp("\{快递费用\}", "g"), data.totalShipping && data.totalShipping.amount || 0);
                                    result = result.replace(new RegExp("\{金额\}", "g"), data.total && data.total.amount || "");
                                    if (data.payMode == "货到付款") {
                                        result = result.replace(/\{lab1}/g, "代收货款金额：");
                                        result = result.replace(/\{lab2}/g, "卡号：");
                                    }
                                    result = result.replace(/\{(代收金额|代收卡号)\d}/g, "");
                                }
                                var offerInfos = data.offerInfo;
                                if (offerInfos) {
                                    result = result.replace(/\{订单优惠}/g, offerInfos.orderOfferInfo || "");
                                    result = result.replace(/\{优惠类型}/g, offerInfos.orderOfferType || "");
                                    result = result.replace(/\{优惠抵扣}/g, offerInfos.orderOfferVal || "");
                                    result = result.replace(/\{优惠码}/g, offerInfos.orderOfferCode || "");
                                    result = result.replace(/\{积分类型}/g, offerInfos.pointType || "");
                                    result = result.replace(/\{积分金额}/g, offerInfos.orderPointMoney || "");
                                    result = result.replace(/\{积分数}/g, offerInfos.orderPointVal || "");
                                }
                                result = result.replace(/\{(商品|规格|数量|单价|小计|货号)\d+}/g, "");
                                return result;
                            });
                            PRINT.eval(print, codes).preview();
                        });
                        // this.close();
                    }
                },
                    {
                        text: '取消',
                        elCls: 'button button-primary',
                        handler: function () {
                            this.close();
                        }
                    }],
                mask:true
            });
            dialog.show();
            dialog.get("loader").load({numbers : ids});
        };
        window.PRINT && (window.PRINT.printOrder = printOrder);
    });
}(jQuery));